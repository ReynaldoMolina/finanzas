import { CuentaTipo, TransaccionTipo } from "./lib/tipos"

export interface ServerStatus {
  success: boolean | undefined
  title: string
  description?: string
}

export type SortOrder = "asc" | "desc"

export interface SearchParamsProps {
  id?: string
  search?: string
  orderBy?: string
  direction?: SortOrder
  id_categoria?: string
  tipo?: TransaccionTipo
  cuenta_tipo?: CuentaTipo
  monto?: string
  origen?: string
  destino?: string
  descripcion?: string
}

export interface PageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<SearchParamsProps>
}

export interface SelectItemType {
  value: string
  label: string
}

export type GroupedSelectResult = {
  cuentasOrigen: SelectItemType[]
  cuentasDestino: SelectItemType[]
}

export type FormAction = "edit" | "create"

export type Cuenta = {
  id: number
  nombre: string
  saldo: number
}

export type CuentaCategoria = {
  id: number
  nombre: string
  subtotal: number
  cuentas: Cuenta[]
}

export type CuentaTipos = {
  nombre: string
  subtotal: number
  categorias: CuentaCategoria[]
}

export type CuentaTipoSelect = {
  id: number
  nombre: string
}

export interface CuentaById {
  id: number
  id_categoria: number
  nombre: string
  tipo?: CuentaTipo
}

export interface CategoriaById {
  id: number
  tipo: CuentaTipo
  nombre: string
}

export interface TransaccionById {
  id: number
  tipo: TransaccionTipo
  fecha: string
  monto: string
  id_cuenta_origen: number
  id_cuenta_destino: number
  descripcion: string
}

export interface TransaccionTablaType {
  id: number
  tipo: TransaccionTipo
  fecha: string
  monto: string
  categoria_origen: string
  cuenta_origen: string
  categoria_destino: string
  cuenta_destino: string
  descripcion: string
}

export interface TransaccionFrecuenteTable {
  id: number
  tipo: TransaccionTipo
  nombre: string
  monto: string
  categoria_origen: string
  cuenta_origen: string
  categoria_destino: string
  cuenta_destino: string
  descripcion: string
}

interface TransaccionFrecuentePage {
  tipo: TransaccionTipo
  items: {
    nombre: string
    monto: string
    id_cuenta_origen: number
    id_cuenta_destino: number
    descripcion: string
  }[]
}

interface TransaccionFrecuenteById {
  id: number
  tipo: TransaccionTipo
  nombre: string
  monto: string
  id_cuenta_origen: number | undefined
  id_cuenta_destino: number | undefined
  descripcion: string
}
