"use server"

import { eq } from "drizzle-orm"
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
  stateCreateSuccess,
} from "./state-message"
import { CategoriaById, ServerStatus } from "@/types"
import { db } from ".."
import { cuentaCategoria } from "../schema/schema"

interface CreateCategoria {
  values: CategoriaById
}

export async function createCuentaCategoria(
  prevState: ServerStatus,
  data: CreateCategoria
) {
  try {
    await db.insert(cuentaCategoria).values(data.values)

    return stateCreateSuccess
  } catch (error) {
    console.error(error)
    return stateCreateError
  }
}

interface UpdateCategoria {
  id: number | string
  values: CategoriaById
}

export async function updateCuentaCategoria(
  prevState: ServerStatus,
  data: UpdateCategoria
) {
  try {
    await db
      .update(cuentaCategoria)
      .set(data.values)
      .where(eq(cuentaCategoria.id, Number(data.id)))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}
