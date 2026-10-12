import { SelectItemType } from "@/types"

export const CUENTA_TIPO = ["Activo", "Ingreso", "Gasto"] as const

export type CuentaTipo = (typeof CUENTA_TIPO)[number]

export const cuentaTipo: SelectItemType[] = CUENTA_TIPO.map((tipo) => ({
  value: tipo,
  label: tipo,
}))

export const TRANSACCION_TIPO = ["Ingreso", "Gasto", "Transferencia"] as const

export type TransaccionTipo = (typeof TRANSACCION_TIPO)[number]

export const transaccionTipos: SelectItemType[] = TRANSACCION_TIPO.map(
  (tipo) => ({
    value: tipo,
    label: tipo,
  })
)
