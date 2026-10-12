import { z } from "zod"

export const zTextToNumber = (message = "No debe estar vacío.") =>
  z.preprocess(
    (value) =>
      value === "" || value === null || value === undefined
        ? undefined
        : Number(value),
    z.number({ message })
  ) as unknown as z.ZodNumber

export function moneyAmountString() {
  return z
    .string()
    .regex(/^(0|[1-9]\d*)(\.\d{1,2})?$/, {
      message: "Debe ser un número con 2 decimales.",
    })
    .refine((val) => Number.parseFloat(val) > 0, {
      message: "Debe ser mayor que cero.",
    })
}
