import {
  ArqueoById,
  ArqueoPage,
  SearchParamsProps,
  SelectItemType,
} from "@/types"
import { db } from ".."
import { arqueo, cuenta, cuentaCategoria } from "../schema/schema"
import { asc, eq, sql, and, notExists, or, getColumns } from "drizzle-orm"
import { getAccountTotals } from "./ctes"
import { getSearchParams } from "./get-search-params"
import { buildSearchFilter } from "./build-search-filter"
import { getAjustesCambioDolar } from "./ajustes"

export async function getArqueos(searchParams: SearchParamsProps): Promise<{
  data: ArqueoPage[]
}> {
  const { from, to } = getSearchParams(searchParams)
  const { movimientosCTE, totalesCTE } = getAccountTotals({ from, to })
  const { cambio_dolar } = await getAjustesCambioDolar()

  const filterBySearch = buildSearchFilter(searchParams, [cuenta.nombre])

  const total = sql<number>`
    (
      COALESCE(NULLIF(${arqueo.dolar_100}, '')::numeric, 0) * 100 +
      COALESCE(NULLIF(${arqueo.dolar_50}, '')::numeric, 0) * 50 +
      COALESCE(NULLIF(${arqueo.dolar_20}, '')::numeric, 0) * 20 +
      COALESCE(NULLIF(${arqueo.dolar_10}, '')::numeric, 0) * 10 +
      COALESCE(NULLIF(${arqueo.dolar_5}, '')::numeric, 0) * 5 +
      COALESCE(NULLIF(${arqueo.dolar_2}, '')::numeric, 0) * 2 +
      COALESCE(NULLIF(${arqueo.dolar_1}, '')::numeric, 0) * 1
    ) * ${cambio_dolar} +
    (
      COALESCE(NULLIF(${arqueo.nio_1000}, '')::numeric, 0) * 1000 +
      COALESCE(NULLIF(${arqueo.nio_500}, '')::numeric, 0) * 500 +
      COALESCE(NULLIF(${arqueo.nio_200}, '')::numeric, 0) * 200 +
      COALESCE(NULLIF(${arqueo.nio_100}, '')::numeric, 0) * 100 +
      COALESCE(NULLIF(${arqueo.nio_50}, '')::numeric, 0) * 50 +
      COALESCE(NULLIF(${arqueo.nio_20}, '')::numeric, 0) * 20 +
      COALESCE(NULLIF(${arqueo.nio_10}, '')::numeric, 0) * 10 +
      COALESCE(NULLIF(${arqueo.nio_5}, '')::numeric, 0) * 5 +
      COALESCE(NULLIF(${arqueo.nio_1}, '')::numeric, 0) * 1 +
      COALESCE(NULLIF(${arqueo.nio_050}, '')::numeric, 0) * 0.5 +
      COALESCE(NULLIF(${arqueo.nio_025}, '')::numeric, 0) * 0.25 +
      COALESCE(NULLIF(${arqueo.nio_010}, '')::numeric, 0) * 0.1
    )
  `

  try {
    const data = await db
      .with(movimientosCTE, totalesCTE)
      .select({
        id: arqueo.id,
        cuenta: cuenta.nombre,
        saldo: sql<number>`COALESCE(${totalesCTE.totalCuenta}, 0)`,
        total,
      })
      .from(arqueo)
      .innerJoin(cuenta, eq(arqueo.id_cuenta, cuenta.id))
      .leftJoin(totalesCTE, eq(cuenta.id, totalesCTE.cuentaId))
      .where(and(filterBySearch))
      .orderBy(asc(cuenta.nombre))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener los arqueos.")
  }
}

// export async function getArqueos(searchParams: SearchParamsProps): Promise<{
//   data: ArqueoPage[]
// }> {
//   const { from, to } = getSearchParams(searchParams)
//   const { movimientosCTE, totalesCTE } = getAccountTotals({ from, to })

//   const filterBySearch = buildSearchFilter(searchParams, [cuenta.nombre])

//   try {
//     const data = await db
//       .with(movimientosCTE, totalesCTE)
//       .select({
//         ...getColumns(arqueo),
//         cuenta: cuenta.nombre,
//         saldo: sql<number>`COALESCE(${totalesCTE.totalCuenta}, 0)`,
//       })
//       .from(arqueo)
//       .innerJoin(cuenta, eq(arqueo.id_cuenta, cuenta.id))
//       .leftJoin(totalesCTE, eq(cuenta.id, totalesCTE.cuentaId))
//       .where(and(filterBySearch))
//       .orderBy(asc(cuenta.nombre))

//     return { data }
//   } catch (error) {
//     console.error(error)
//     throw new Error("No se pudieron obtener los arqueos.")
//   }
// }

export async function getArqueoById(id: string): Promise<{ data: ArqueoById }> {
  try {
    const { movimientosCTE, totalesCTE } = getAccountTotals({
      from: undefined,
      to: undefined,
    })

    const [data] = await db
      .with(movimientosCTE, totalesCTE)
      .select({
        ...getColumns(arqueo),
        saldo: sql<number>`COALESCE(${totalesCTE.totalCuenta}, 0)`,
      })
      .from(arqueo)
      .leftJoin(totalesCTE, eq(arqueo.id_cuenta, totalesCTE.cuentaId))
      .where(eq(arqueo.id, Number(id)))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudo obtener el arqueo.")
  }
}

export async function getCuentasActivosArqueo(
  includeCuentaId?: number | string
): Promise<{
  data: SelectItemType[]
}> {
  try {
    const parsedId = includeCuentaId ? Number(includeCuentaId) : -1

    const data = await db
      .select({
        value: sql<string>`CAST(${cuenta.id} AS TEXT)`,
        label: sql<string>`${cuentaCategoria.nombre} || ' · ' || ${cuenta.nombre}`,
      })
      .from(cuenta)
      .innerJoin(cuentaCategoria, eq(cuenta.id_categoria, cuentaCategoria.id))
      .where(
        and(
          eq(cuentaCategoria.tipo, "Activo"),
          or(
            notExists(
              db.select().from(arqueo).where(eq(arqueo.id_cuenta, cuenta.id))
            ),
            eq(cuenta.id, parsedId)
          )
        )
      )
      .orderBy(asc(cuentaCategoria.nombre), asc(cuenta.nombre))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener las cuentas de activos.")
  }
}
