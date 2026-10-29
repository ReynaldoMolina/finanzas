"use server"

import { eq } from "drizzle-orm"
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
  stateDeleteSuccess,
  stateDeleteError,
  stateCreateSuccess,
} from "./state-message"
import { ArqueoById, ArqueoType, ServerStatus } from "@/types"
import { db } from ".."
import { arqueo } from "../schema/schema"

interface CreateArqueo {
  values: ArqueoById
}

export async function createArqueo(
  prevState: ServerStatus,
  data: CreateArqueo
) {
  try {
    await db.insert(arqueo).values(data.values)

    return stateCreateSuccess
  } catch (error) {
    console.error(error)
    return stateCreateError
  }
}

interface UpdateArqueo {
  id: number | string
  values: ArqueoById
}

export async function updateArqueo(
  prevState: ServerStatus,
  data: UpdateArqueo
) {
  try {
    await db
      .update(arqueo)
      .set(data.values)
      .where(eq(arqueo.id, Number(data.id)))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}

interface UpdateArqueoConteo {
  id: number | string
  values: ArqueoType
}

export async function updateArqueoConteo(
  prevState: ServerStatus,
  data: UpdateArqueoConteo
) {
  try {
    await db
      .update(arqueo)
      .set(data.values)
      .where(eq(arqueo.id, Number(data.id)))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}

interface DeleteArqueo {
  id: number | string
}

export async function deleteArqueo(
  prevState: ServerStatus,
  data: DeleteArqueo
) {
  try {
    await db.delete(arqueo).where(eq(arqueo.id, Number(data.id)))
    return stateDeleteSuccess
  } catch (error) {
    console.error(error)
    return stateDeleteError
  }
}
