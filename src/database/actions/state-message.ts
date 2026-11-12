import { ServerStatus } from "@/types"

export const stateDefault: ServerStatus = {
  success: undefined,
  title: "",
}

export const stateCreateSuccess: ServerStatus = {
  success: true,
  title: "Creado correctamente.",
}

export const stateCreateError: ServerStatus = {
  success: false,
  title: "Error al crear.",
}

export const stateUpdateSuccess: ServerStatus = {
  success: true,
  title: "Guardado.",
}

export const stateUpdateError: ServerStatus = {
  success: false,
  title: "Error al guardar.",
}

export const stateDeleteSuccess: ServerStatus = {
  success: true,
  title: "Eliminado correctamente.",
}

export const stateDeleteError: ServerStatus = {
  success: false,
  title: "Error al eliminar.",
}
