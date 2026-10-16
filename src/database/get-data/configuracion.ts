import { Configuracion } from "@/types"
import { db } from ".."
import { configuracion } from "../schema/schema"
import { eq } from "drizzle-orm"

export async function getConfiguracion(): Promise<{
  data: Configuracion
}> {
  try {
    const [data] = await db
      .select()
      .from(configuracion)
      .where(eq(configuracion.id, 1))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudo obtener la configuración.")
  }
}

export async function getConfiguracionCambioDolar(): Promise<{
  cambio_dolar: number
}> {
  try {
    const [data] = await db
      .select({
        cambio_dolar: configuracion.cambio_dolar,
      })
      .from(configuracion)
      .where(eq(configuracion.id, 1))

    return { cambio_dolar: Number(data.cambio_dolar) }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudo obtener el cambio de dólar.")
  }
}
