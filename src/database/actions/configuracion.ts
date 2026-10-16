"use server"

import { eq } from "drizzle-orm"
import { stateUpdateSuccess, stateUpdateError } from "./state-message"
import { Configuracion, ServerStatus } from "@/types"
import { db } from ".."
import { configuracion } from "../schema/schema"

interface UpdateConfiguracion {
  values: Configuracion
}

export async function updateConfiguracion(
  prevState: ServerStatus,
  data: UpdateConfiguracion
) {
  try {
    await db
      .update(configuracion)
      .set(data.values)
      .where(eq(configuracion.id, 1))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}
