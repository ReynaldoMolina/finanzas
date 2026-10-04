import * as z from "zod"

export const groupSchema = z.object({
  id_tipo: z.number(),
  nombre: z.string().min(1, "El nombre no puede estar vacío."),
})

export const accountSchema = z.object({
  id_grupo: z.number(),
  nombre: z.string().min(1, "El nombre no puede estar vacío."),
})
