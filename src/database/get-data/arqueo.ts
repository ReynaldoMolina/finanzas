import { ArqueoById, ArqueoPage } from "@/types"
import { db } from ".."
import { arqueo, cuenta, transaccion } from "../schema"
import { asc, eq, getColumns, sql, isNotNull } from "drizzle-orm"
import { movimientosCTE, totalesCTE } from "./ctes"

export async function getArqueos(): Promise<{
  data: ArqueoPage[]
}> {
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
      .orderBy(asc(arqueo.id))

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
