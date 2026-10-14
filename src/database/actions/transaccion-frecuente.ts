"use server"

import { eq } from "drizzle-orm"
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
  stateDeleteSuccess,
  stateDeleteError,
} from "./state-message"
import { ServerStatus, TransaccionFrecuenteById } from "@/types"
import { db } from ".."
import { transaccionFrecuente } from "../schema"

interface CreateTransaccionFrecuente {
  values: TransaccionFrecuenteById
}

export async function createTransaccionFrecuente(
  prevState: ServerStatus,
  data: CreateTransaccionFrecuente
) {
  try {
    await db.insert(transaccionFrecuente).values(data.values)

    return {
      success: true,
      title: "Se creó el registro correctamente.",
    }
  } catch (error) {
    console.error(error)
    return stateCreateError
  }
}

interface UpdateTransaccionFrecuente {
  id: number | string
  values: TransaccionFrecuenteById
}

export async function updateTransaccionFrecuente(
  prevState: ServerStatus,
  data: UpdateTransaccionFrecuente
) {
  try {
    await db
      .update(transaccionFrecuente)
      .set(data.values)
      .where(eq(transaccionFrecuente.id, Number(data.id)))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}

interface DeleteTransaccionFrecuente {
  id: number | string
}

export async function deleteTransaccionFrecuente(
  prevState: ServerStatus,
  data: DeleteTransaccionFrecuente
) {
  try {
    await db
      .delete(transaccionFrecuente)
      .where(eq(transaccionFrecuente.id, Number(data.id)))
    return {
      ...stateDeleteSuccess,
      title: "Se eliminó la transacción frecuente.",
    }
  } catch (error) {
    console.error(error)
    return stateDeleteError
  }
}
