"use server"

import { eq } from "drizzle-orm"
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
} from "./state-message"
import { GroupById, ServerStatus } from "@/src/types"
import { db } from ".."
import { cuentaGrupo } from "../schema"

interface CreateGroup {
  values: GroupById
}

export async function createGroup(prevState: ServerStatus, data: CreateGroup) {
  try {
    await db.insert(cuentaGrupo).values(data.values)

    return {
      success: true,
      title: "Se creó el grupo correctamente.",
    }
  } catch (error) {
    console.error(error)
    return stateCreateError
  }
}

interface UpdateGroup {
  id: number | string
  values: GroupById
}

export async function updateGroup(prevState: ServerStatus, data: UpdateGroup) {
  try {
    await db
      .update(cuentaGrupo)
      .set(data.values)
      .where(eq(cuentaGrupo.id, Number(data.id)))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}
