"use server"

import { eq } from "drizzle-orm"
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
} from "./state-message"
import { ServerStatus, TransaccionById } from "@/types"
import { db } from ".."
import { transaccion } from "../schema"

interface CreateTransaccion {
  values: TransaccionById
}

export async function createTransaccion(
  prevState: ServerStatus,
  data: CreateTransaccion
) {
  try {
    await db.insert(transaccion).values(data.values)

    return {
      success: true,
      title: "Se creó el registro correctamente.",
    }
  } catch (error) {
    console.error(error)
    return stateCreateError
  }
}

interface UpdateTransaccion {
  id: number | string
  values: TransaccionById
}

export async function updateTransaccion(
  prevState: ServerStatus,
  data: UpdateTransaccion
) {
  try {
    await db
      .update(transaccion)
      .set(data.values)
      .where(eq(transaccion.id, Number(data.id)))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}
