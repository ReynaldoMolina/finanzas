"use server"

import { eq } from "drizzle-orm"
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
} from "./state-message"
import { CuentaById, ServerStatus } from "@/types"
import { db } from ".."
import { cuenta } from "../schema/schema"

interface CreateCuenta {
  values: CuentaById
}

export async function createCuenta(
  prevState: ServerStatus,
  data: CreateCuenta
) {
  try {
    await db.insert(cuenta).values(data.values)

    return {
      success: true,
      title: "Se creó la cuenta correctamente.",
    }
  } catch (error) {
    console.error(error)
    return stateCreateError
  }
}

interface UpdateCuenta {
  id: number | string
  values: CuentaById
}

export async function updateCuenta(
  prevState: ServerStatus,
  data: UpdateCuenta
) {
  try {
    await db
      .update(cuenta)
      .set(data.values)
      .where(eq(cuenta.id, Number(data.id)))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}
