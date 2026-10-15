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
  return z
    .string()
    .regex(/^(0|[1-9]\d*)(\.\d{1,2})?$/, {
      message: "Debe ser un número con 2 decimales.",
    })
    .refine((val) => Number.parseFloat(val) > 0, {
      message: "Debe ser mayor que cero.",
    })
}

// export function zNumberNullable() {
//   return z.string().transform((value, ctx) => {
//     if (value === "") return null

//     const number = Number(value)
//     if (!Number.isInteger(number) || number < 0) {
//       ctx.issues.push({
//         code: "custom",
//         message: "Enter a nonnegative integer",
//         input: value,
//       })
//       return z.NEVER
//     }

//     return number
//   })
// }

export function zNumberNullable() {
  return z
    .string()
    .regex(/^\d+(\+\d+)*$/, "Formato inválido (ej: 100+20)")
    .optional()
    .nullable()
    .or(z.literal(""))
}
