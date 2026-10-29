"use server"

import { eq } from "drizzle-orm"
import { stateUpdateSuccess, stateUpdateError } from "./state-message"
import { Ajustes, ServerStatus } from "@/types"
import { db } from ".."
import { ajustes } from "../schema/schema"

interface UpdateAjustes {
  values: Ajustes
}

export async function updateAjustes(
  prevState: ServerStatus,
  data: UpdateAjustes
) {
  try {
    await db.update(ajustes).set(data.values).where(eq(ajustes.id, 1))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}
