import {
  CuentaById,
  CuentaCategoria,
  CuentaTipo,
  GroupedSelectResult,
  SearchParamsProps,
  SelectItemType,
} from "@/types"
import { db } from ".."
import { cuentaCategoria, cuenta, transaccion } from "../schema"
import { eq, and, asc, sql } from "drizzle-orm"
import { buildSearchFilter } from "./build-search-filter"
import { CUENTA_TIPOS, TransaccionTipo } from "@/lib/tipos"

export async function getCuentas(
  searchParams: SearchParamsProps
): Promise<{ data: CuentaTipo[] }> {
  // 1. Definimos el CTE para unificar todos los movimientos (Debe y Haber) por cuenta
  const movimientosCTE = db.$with("movimientos").as(
    db
      .select({
        cuentaId: transaccion.id_cuenta_origen,
        debe: sql<number>`CASE WHEN ${transaccion.tipo} = 'Gasto' THEN ${transaccion.monto} ELSE 0 END`.as(
          "debe"
        ),
        haber:
          sql<number>`CASE WHEN ${transaccion.tipo} IN ('Ingreso', 'Transferencia') THEN ${transaccion.monto} ELSE 0 END`.as(
            "haber"
          ),
      })
      .from(transaccion)
      .unionAll(
        db
          .select({
            cuentaId: transaccion.id_cuenta_destino,
            debe: sql<number>`CASE WHEN ${transaccion.tipo} IN ('Ingreso', 'Transferencia') THEN ${transaccion.monto} ELSE 0 END`.as(
              "debe"
            ),
            haber:
              sql<number>`CASE WHEN ${transaccion.tipo} = 'Gasto' THEN ${transaccion.monto} ELSE 0 END`.as(
                "haber"
              ),
          })
          .from(transaccion)
      )
  )

  // 2. CTE para sumarizar los totales de Debe y Haber por cada cuenta
  const totalesCTE = db.$with("totales_cuenta").as(
    db
      .select({
        cuentaId: movimientosCTE.cuentaId,
        totalDebe: sql<number>`COALESCE(SUM(${movimientosCTE.debe}), 0)`.as(
          "total_debe"
        ),
        totalHaber: sql<number>`COALESCE(SUM(${movimientosCTE.haber}), 0)`.as(
          "total_haber"
        ),
      })
      .from(movimientosCTE)
      .groupBy(movimientosCTE.cuentaId)
  )

  const selectFields = {
    tipo: cuentaCategoria.tipo,
    categoriaId: cuentaCategoria.id,
    categoriaNombre: cuentaCategoria.nombre,
    cuentaId: cuenta.id,
    cuentaNombre: cuenta.nombre,
    debe: sql<number>`COALESCE(${totalesCTE.totalDebe}, 0)`,
    haber: sql<number>`COALESCE(${totalesCTE.totalHaber}, 0)`,
  }

  const filterBySearch = buildSearchFilter(searchParams, [
    cuentaCategoria.tipo,
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

    // 1. Inicializamos el Map con los 4 tipos obligatorios garantizados
    const dataMap = new Map<
      string,
      {
        nombre: string
        categorias: Map<number, CuentaCategoria>
      }
    >()

    for (const tipoNombre of CUENTA_TIPOS) {
      dataMap.set(tipoNombre, {
        nombre: tipoNombre,
        categorias: new Map<number, CuentaCategoria>(),
      })
    }

    // 2. Poblamos el mapa con las filas devueltas por la consulta
    for (const row of rows) {
      // Por si acaso viene un tipo que no estuviera contemplado de forma estática
      if (!dataMap.has(row.tipo)) {
        dataMap.set(row.tipo, {
          nombre: row.tipo,
          categorias: new Map<number, CuentaCategoria>(),
        })
      }

      const tipoEntry = dataMap.get(row.tipo)!

      if (row.categoriaId !== null) {
        if (!tipoEntry.categorias.has(row.categoriaId)) {
          tipoEntry.categorias.set(row.categoriaId, {
            id: row.categoriaId,
            nombre: row.categoriaNombre,
            cuentas: [],
          })
        }

        const categoriaEntry = tipoEntry.categorias.get(row.categoriaId)!

        if (row.cuentaId !== null) {
          categoriaEntry.cuentas.push({
            id: row.cuentaId,
            nombre: row.cuentaNombre!,
            total: Number(row.debe) > 0 ? Number(row.debe) : Number(row.haber),
          })
        }
      }
    }

    const data: CuentaTipo[] = Array.from(dataMap.values()).map((tipoItem) => ({
      nombre: tipoItem.nombre,
      categorias: Array.from(tipoItem.categorias.values()),
    }))

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
    // 1. Obtener el 'tipo' de la categoría asociada a la cuenta recibida
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
