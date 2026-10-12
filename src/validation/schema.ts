import * as z from "zod"
import { moneyAmountString, zTextToNumber } from "./zod-helper"
import { CUENTA_TIPO, TRANSACCION_TIPO } from "@/lib/tipos"

export const cuentaCategoriaSchema = z.object({
  tipo: z.enum(CUENTA_TIPO, { message: "Selecciona un tipo." }),
  nombre: z.string().min(1, "Escribe un nombre."),
})

export const cuentaSchema = z.object({
  id_categoria: zTextToNumber("Selecciona una opción."),
  nombre: z.string().min(1, "Escribe un nombre."),
})

export const transaccionSchema = z.object({
  tipo: z.enum(TRANSACCION_TIPO, { message: "Selecciona un tipo." }),
  fecha: z.string().min(1, "Requerido"),
  monto: moneyAmountString(),
  id_cuenta_origen: zTextToNumber(),
  id_cuenta_destino: zTextToNumber(),
  descripcion: z.string().min(1, "Escribe una descripción."),
})

export const transaccionFrecuenteSchema = z.object({
  tipo: z.enum(TRANSACCION_TIPO, { message: "Selecciona un tipo." }),
  nombre: z.string().min(1, "Requerido"),
  monto: moneyAmountString(),
  id_cuenta_origen: zTextToNumber(),
  id_cuenta_destino: zTextToNumber(),
  descripcion: z.string().min(1, "Escribe una descripción."),
})
