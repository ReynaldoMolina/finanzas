import { ServerStatus } from "@/types"

export const stateDefault: ServerStatus = {
  success: undefined,
  title: "",
}

export const stateCreateSuccess: ServerStatus = {
  success: true,
  title: "Se creó correctamente.",
}

export const stateCreateError: ServerStatus = {
  success: false,
  title: "Error al crear.",
}

export const stateUpdateSuccess: ServerStatus = {
  success: true,
  title: "Cambios guardados.",
}

export const stateUpdateError: ServerStatus = {
  success: false,
  title: "Error al guardar cambios.",
}

export const stateDeleteSuccess: ServerStatus = {
  success: true,
  title: "Se eliminó correctamente.",
}

export const stateDeleteError: ServerStatus = {
  success: false,
  title: "Error al eliminar.",
}
