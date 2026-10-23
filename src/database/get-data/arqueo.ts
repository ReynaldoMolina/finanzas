import {
  ArqueoById,
  ArqueoPage,
  SearchParamsProps,
  SelectItemType,
} from "@/types"
import { db } from ".."
import { arqueo, cuenta, cuentaCategoria } from "../schema/schema"
import { asc, eq, getColumns, sql, and, notExists, or } from "drizzle-orm"
import { getAccountTotals } from "./ctes"
import { getSearchParams } from "./get-search-params"
import { buildSearchFilter } from "./build-search-filter"

export async function getArqueos(searchParams: SearchParamsProps): Promise<{
  data: ArqueoPage[]
}> {
  const { from, to } = getSearchParams(searchParams)
  const { movimientosCTE, totalesCTE } = getAccountTotals({ from, to })

  const filterBySearch = buildSearchFilter(searchParams, [cuenta.nombre])

  try {
    const data = await db
      .with(movimientosCTE, totalesCTE)
      .select({
        ...getColumns(arqueo),
        cuenta: cuenta.nombre,
        saldo: sql<number>`COALESCE(${totalesCTE.totalCuenta}, 0)`,
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
    const [data] = await db
      .select({
        id: arqueo.id,
        id_cuenta: arqueo.id_cuenta,
      })
      .from(arqueo)
      .where(eq(arqueo.id, Number(id)))

    return { data }
  } catch (error) {
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
