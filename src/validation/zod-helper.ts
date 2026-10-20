import { z } from "zod"

export function zTextToNumber(message = "No debe estar vacío.") {
  return z.preprocess(
    (value) =>
      value === "" || value === null || value === undefined
        ? undefined
        : Number(value),
    z.number({ message }).positive()
  ) as unknown as z.ZodNumber
}

export function moneyAmountString() {
  return z.string().regex(/^(0|[1-9]\d*)(\.\d{1,2})?$/, {
    message: "Debe ser un número.",
  })
}

export function zNumberNullable() {
  return z
    .string()
    .regex(/^\d+(\+\d+)*$/, "Formato inválido (ej: 100+20)")
    .optional()
    .nullable()
    .or(z.literal(""))
}
