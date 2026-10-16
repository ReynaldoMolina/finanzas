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
  page?: string
  limit?: string
  start?: string
  end?: string
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
  descripcion: string | null
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
  descripcion: string | null
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
  id_cuenta_origen: number
  id_cuenta_destino: number
  descripcion: string | null
}

export interface ArqueoType {
  dolar_100: string | null
  dolar_50: string | null
  dolar_20: string | null
  dolar_10: string | null
  dolar_5: string | null
  dolar_2: string | null
  dolar_1: string | null
  nio_1000: string | null
  nio_500: string | null
  nio_200: string | null
  nio_100: string | null
  nio_50: string | null
  nio_20: string | null
  nio_10: string | null
  nio_5: string | null
  nio_1: string | null
  nio_050: string | null
  nio_025: string | null
  nio_010: string | null
}

export interface ArqueoById {
  id: number
  id_cuenta: number
}

export interface ArqueoPage extends ArqueoType {
  id: number
  cuenta: string
  saldo: number
}

export interface Configuracion {
  id: number
  cambio_dolar: string
  id_categoria_efectivo: number
}

export interface PageWrapperType {
  id?: string
  searchParams: SearchParamsProps
}
