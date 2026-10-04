export interface ServerStatus {
  success: boolean | undefined
  title: string
  description?: string
  returningId?: string | number
}

export type Cuenta = {
  id: number
  nombre: string
}

export type Grupo = {
  id: number
  nombre: string
  cuentas: Cuenta[]
}

export type Tipo = {
  id: number
  nombre: string
  grupos: Grupo[]
}

export interface GroupById {
  id?: number
  id_tipo: number
  nombre: string
}

export interface AccountById {
  id?: number
  id_grupo: number
  nombre: string
}
