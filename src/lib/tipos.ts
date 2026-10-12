import { SelectItemType } from "@/types"

export const CUENTA_TIPOS = ["Activo", "Ingreso", "Gasto", "Pasivo"] as const

export type CuentaTipos = (typeof CUENTA_TIPOS)[number]

export const cuentaTipos: SelectItemType[] = CUENTA_TIPOS.map((tipo) => ({
  value: tipo,
  label: tipo,
}))

export const TRANSACCION_TIPOS = ["Ingreso", "Gasto", "Transferencia"] as const

export type TransaccionTipo = (typeof TRANSACCION_TIPOS)[number]

export const transaccionTipos: SelectItemType[] = TRANSACCION_TIPOS.map(
  (tipo) => ({
    value: tipo,
    label: tipo,
  })
)
