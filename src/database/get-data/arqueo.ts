import { ArqueoById, ArqueoPage, SearchParamsProps } from "@/types"
import { db } from ".."
import { arqueo, cuenta } from "../schema/schema"
import { asc, eq, getColumns, sql, and } from "drizzle-orm"
import { getAccountTotals } from "./ctes"
import { getSearchParams } from "./get-search-params"
import { buildSearchFilter } from "./build-search-filter"

export async function getArqueos(searchParams: SearchParamsProps): Promise<{
  data: ArqueoPage[]
}> {
  const { start, end } = getSearchParams(searchParams)
  const { movimientosCTE, totalesCTE } = getAccountTotals({ start, end })

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
