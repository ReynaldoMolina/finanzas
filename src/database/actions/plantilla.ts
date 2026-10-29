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
import { ServerStatus, PlantillaById } from "@/types"
import { db } from ".."
import { plantilla } from "../schema/schema"

interface CreatePlantilla {
  values: PlantillaById
}

export async function createPlantilla(
  prevState: ServerStatus,
  data: CreatePlantilla
) {
  try {
    await db.insert(plantilla).values(data.values)

    return stateCreateSuccess
  } catch (error) {
    console.error(error)
    return stateCreateError
  }
}

interface UpdatePlantilla {
  id: number | string
  values: PlantillaById
}

export async function updatePlantilla(
  prevState: ServerStatus,
  data: UpdatePlantilla
) {
  try {
    await db
      .update(plantilla)
      .set(data.values)
      .where(eq(plantilla.id, Number(data.id)))
    return stateUpdateSuccess
  } catch (error) {
    console.error(error)
    return stateUpdateError
  }
}

interface DeletePlantilla {
  id: number | string
}

export async function deletePlantilla(
  prevState: ServerStatus,
  data: DeletePlantilla
) {
  try {
    await db.delete(plantilla).where(eq(plantilla.id, Number(data.id)))
    return stateDeleteSuccess
  } catch (error) {
    console.error(error)
    return stateDeleteError
  }
}
