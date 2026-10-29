import * as z from "zod"
import { moneyAmountString, zTextToNumber, zNumberNullable } from "./zod-helper"
import { CUENTA_TIPO, TRANSACCION_TIPO } from "@/lib/tipos"

export const cuentaCategoriaSchema = z.object({
  tipo: z.enum(CUENTA_TIPO, { message: "Selecciona un tipo." }),
  nombre: z.string().trim().min(1, "Escribe un nombre."),
})

export const cuentaSchema = z.object({
  id_categoria: zTextToNumber("Selecciona una opción."),
  nombre: z.string().trim().min(1, "Escribe un nombre."),
  is_dollar: z.boolean(),
})

export const transaccionSchema = z.object({
  tipo: z.enum(TRANSACCION_TIPO, { message: "Selecciona un tipo." }),
  fecha: z.string().min(1, "Requerido"),
  monto: moneyAmountString(),
  id_cuenta_origen: zTextToNumber(),
  id_cuenta_destino: zTextToNumber(),
  descripcion: z.string().trim().nullable(),
})

export const plantillaSchema = z.object({
  tipo: z.enum(TRANSACCION_TIPO, { message: "Selecciona un tipo." }),
  nombre: z.string().trim().min(1, "Requerido"),
  monto: moneyAmountString(),
  id_cuenta_origen: zTextToNumber(),
  id_cuenta_destino: zTextToNumber(),
  descripcion: z.string().trim().nullable(),
})

export const arqueoSchema = z.object({
  id_cuenta: zTextToNumber("Selecciona una opción."),
})

export const ajustesSchema = z.object({
  cambio_dolar: moneyAmountString(),
  id_categoria_efectivo: zTextToNumber("Selecciona una opción."),
})

export const contadorSchema = z.object({
  dolar_100: zNumberNullable(),
  dolar_50: zNumberNullable(),
  dolar_20: zNumberNullable(),
  dolar_10: zNumberNullable(),
  dolar_5: zNumberNullable(),
  dolar_2: zNumberNullable(),
  dolar_1: zNumberNullable(),
  nio_1000: zNumberNullable(),
  nio_500: zNumberNullable(),
  nio_200: zNumberNullable(),
  nio_100: zNumberNullable(),
  nio_50: zNumberNullable(),
  nio_20: zNumberNullable(),
  nio_10: zNumberNullable(),
  nio_5: zNumberNullable(),
  nio_1: zNumberNullable(),
  nio_050: zNumberNullable(),
  nio_025: zNumberNullable(),
  nio_010: zNumberNullable(),
})
