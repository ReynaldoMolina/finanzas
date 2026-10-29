import { Ajustes } from "@/types"
import { db } from ".."
import { ajustes } from "../schema/schema"
import { eq } from "drizzle-orm"

export async function getAjustes(): Promise<{
  data: Ajustes
}> {
  try {
    const [data] = await db.select().from(ajustes).where(eq(ajustes.id, 1))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener los ajustes.")
  }
}

export async function getAjustesCambioDolar(): Promise<{
  cambio_dolar: number
}> {
  try {
    const [data] = await db
      .select({
        cambio_dolar: ajustes.cambio_dolar,
      })
      .from(ajustes)
      .where(eq(ajustes.id, 1))

    return { cambio_dolar: Number(data.cambio_dolar) }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudo obtener el cambio de dólar.")
  }
}
