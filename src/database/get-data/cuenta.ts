import {
  CuentaById,
  CuentaTipos,
  GroupedSelectResult,
  SearchParamsProps,
  SelectItemType,
} from "@/types"
import { db } from ".."
import { cuentaCategoria, cuenta } from "../schema/schema"
import { eq, and, asc, sql } from "drizzle-orm"
import { buildSearchFilter } from "./build-search-filter"
import { CUENTA_TIPO, TransaccionTipo } from "@/lib/tipos"
import { getAccountTotals } from "./ctes"

export async function getCuentas(
  searchParams: SearchParamsProps
): Promise<{ data: CuentaTipos[] }> {
  const { movimientosCTE, totalesCTE } = getAccountTotals(searchParams)

  const selectFields = {
    tipo: cuentaCategoria.tipo,
    categoriaId: cuentaCategoria.id,
    categoriaNombre: cuentaCategoria.nombre,
    cuentaId: cuenta.id,
    cuentaNombre: cuenta.nombre,
    total: sql<number>`COALESCE(${totalesCTE.totalCuenta}, 0)`,
    is_dollar: cuenta.is_dollar,
  }

  const filterBySearch = buildSearchFilter(searchParams, [
    cuentaCategoria.nombre,
    cuenta.nombre,
  ])

  try {
    const rows = await db
      .with(movimientosCTE, totalesCTE)
      .select(selectFields)
      .from(cuentaCategoria)
      .leftJoin(cuenta, eq(cuentaCategoria.id, cuenta.id_categoria))
      .leftJoin(totalesCTE, eq(cuenta.id, totalesCTE.cuentaId))
      .where(and(filterBySearch))
      .orderBy(asc(cuentaCategoria.nombre), asc(cuenta.nombre))

    const dataMap = new Map<
      string,
      {
        nombre: string
        subtotal: number
        categorias: Map<
          number,
          {
            id: number
            nombre: string
            subtotal: number
            cuentas: {
              id: number
              nombre: string
              saldo: number
              is_dollar: boolean
            }[]
          }
        >
      }
    >()

    for (const tipoNombre of CUENTA_TIPO) {
      dataMap.set(tipoNombre, {
        nombre: tipoNombre,
        subtotal: 0,
        categorias: new Map(),
      })
    }

    for (const row of rows) {
      if (!dataMap.has(row.tipo)) {
        dataMap.set(row.tipo, {
          nombre: row.tipo,
          subtotal: 0,
          categorias: new Map(),
        })
      }

      const tipoEntry = dataMap.get(row.tipo)!

      if (row.categoriaId !== null) {
        if (!tipoEntry.categorias.has(row.categoriaId)) {
          tipoEntry.categorias.set(row.categoriaId, {
            id: row.categoriaId,
            nombre: row.categoriaNombre,
            subtotal: 0,
            cuentas: [],
          })
        }

        const categoriaEntry = tipoEntry.categorias.get(row.categoriaId)!

        if (row.cuentaId !== null) {
          const cuentaTotal = Number(row.total)

          categoriaEntry.cuentas.push({
            id: row.cuentaId,
            nombre: row.cuentaNombre!,
            saldo: cuentaTotal,
            is_dollar: row.is_dollar,
          })

          // Acumulamos en la categoría y en el tipo
          categoriaEntry.subtotal += cuentaTotal
          tipoEntry.subtotal += cuentaTotal
        }
      }
    }

    const data: CuentaTipos[] = Array.from(dataMap.values()).map(
      (tipoItem) => ({
        nombre: tipoItem.nombre,
        subtotal: tipoItem.subtotal,
        categorias: Array.from(tipoItem.categorias.values()),
      })
    )

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener las cuentas con sus saldos.")
  }
}

export async function getCuentaById(id: string): Promise<{ data: CuentaById }> {
  try {
    const [data] = await db
      .select({
        id: cuenta.id,
        id_categoria: cuenta.id_categoria,
        nombre: cuenta.nombre,
        tipo: cuentaCategoria.tipo,
        is_dollar: cuenta.is_dollar,
      })
      .from(cuenta)
      .innerJoin(cuentaCategoria, eq(cuenta.id_categoria, cuentaCategoria.id))
      .where(eq(cuenta.id, Number(id)))

    return { data }
  } catch (error) {
    throw new Error("No se pudo obtener la cuenta.")
  }
}

export async function getTipoCuentaById(
  id: string
): Promise<{ initialTipo: string }> {
  try {
    const [accountCategory] = await db
      .select({ tipo: cuentaCategoria.tipo })
      .from(cuenta)
      .innerJoin(cuentaCategoria, eq(cuenta.id_categoria, cuentaCategoria.id))
      .where(eq(cuenta.id, Number(id)))

    return { initialTipo: accountCategory.tipo }
  } catch (error) {
    throw new Error("No se pudo obtener el tipo asociada a la cuenta.")
  }
}

export async function getCuentasActivos(): Promise<{
  data: SelectItemType[]
}> {
  try {
    const data = await db
      .select({
        value: sql<string>`CAST(${cuenta.id} AS TEXT)`,
        label: sql<string>`${cuentaCategoria.nombre} || ' · ' || ${cuenta.nombre}`,
      })
      .from(cuenta)
      .innerJoin(cuentaCategoria, eq(cuenta.id_categoria, cuentaCategoria.id))
      .where(eq(cuentaCategoria.tipo, "Activo"))
      .orderBy(asc(cuentaCategoria.nombre), asc(cuenta.nombre))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener las cuentas de activos.")
  }
}

interface GetCategoriasByTipoTransaccionParams {
  searchParams: SearchParamsProps
  initialTipo?: TransaccionTipo
}

export async function getCategoriasByTipoTransaccion({
  searchParams,
  initialTipo,
}: GetCategoriasByTipoTransaccionParams): Promise<GroupedSelectResult> {
  const tipo = searchParams?.tipo ?? initialTipo ?? ""

  if (!tipo) {
    return {
      cuentasOrigen: [],
      cuentasDestino: [],
    }
  }

  try {
    const { data: cuentasDestino } = await getCuentasActivos()

    if (tipo === "Transferencia") {
      return {
        cuentasOrigen: cuentasDestino,
        cuentasDestino,
      }
    }

    const cuentasOrigen = await db
      .select({
        value: sql<string>`CAST(${cuenta.id} AS TEXT)`,
        label: sql<string>`${cuentaCategoria.nombre} || ' · ' || ${cuenta.nombre}`,
      })
      .from(cuenta)
      .innerJoin(cuentaCategoria, eq(cuenta.id_categoria, cuentaCategoria.id))
      .where(eq(cuentaCategoria.tipo, tipo))
      .orderBy(asc(cuentaCategoria.nombre), asc(cuenta.nombre))

    return {
      cuentasOrigen,
      cuentasDestino,
    }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener las categorías.")
  }
}
