"use server"

import { eq } from "drizzle-orm"
import {
  stateUpdateSuccess,
  stateUpdateError,
  stateCreateError,
} from "./state-message"
import { AccountById, ServerStatus } from "@/src/types"
import { db } from ".."
import { cuenta } from "../schema"

interface CreateAccount {
  values: AccountById
}

export async function createAccount(
  prevState: ServerStatus,
  data: CreateAccount
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

interface UpdateAccount {
  id: number | string
  values: AccountById
}

export async function updateAccount(
  prevState: ServerStatus,
  data: UpdateAccount
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
