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
      evaluar_texto_sql(${arqueo.dolar_100}) * 100 +
      evaluar_texto_sql(${arqueo.dolar_50}) * 50 +
      evaluar_texto_sql(${arqueo.dolar_20}) * 20 +
      evaluar_texto_sql(${arqueo.dolar_10}) * 10 +
      evaluar_texto_sql(${arqueo.dolar_5}) * 5 +
      evaluar_texto_sql(${arqueo.dolar_2}) * 2 +
      evaluar_texto_sql(${arqueo.dolar_1}) * 1
    ) * ${cambio_dolar} +
    (
      evaluar_texto_sql(${arqueo.nio_1000}) * 1000 +
      evaluar_texto_sql(${arqueo.nio_500}) * 500 +
      evaluar_texto_sql(${arqueo.nio_200}) * 200 +
      evaluar_texto_sql(${arqueo.nio_100}) * 100 +
      evaluar_texto_sql(${arqueo.nio_50}) * 50 +
      evaluar_texto_sql(${arqueo.nio_20}) * 20 +
      evaluar_texto_sql(${arqueo.nio_10}) * 10 +
      evaluar_texto_sql(${arqueo.nio_5}) * 5 +
      evaluar_texto_sql(${arqueo.nio_1}) * 1 +
      evaluar_texto_sql(${arqueo.nio_050}) * 0.5 +
      evaluar_texto_sql(${arqueo.nio_025}) * 0.25 +
      evaluar_texto_sql(${arqueo.nio_010}) * 0.1
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
