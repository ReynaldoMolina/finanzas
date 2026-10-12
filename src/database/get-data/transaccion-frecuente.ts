import {
  SearchParamsProps,
  TransaccionFrecuenteById,
  TransaccionFrecuentePage,
  TransaccionFrecuenteTable,
} from "@/types"
import { db } from ".."
import { cuentaCategoria, cuenta, transaccionFrecuente } from "../schema"
import { aliasedTable, eq, sql, and, asc } from "drizzle-orm"
import { buildSearchFilter } from "./build-search-filter"
import { TransaccionTipo } from "@/lib/tipos"

export async function getTransaccionesFrecuentes(
  searchParams: SearchParamsProps
): Promise<{
  data: TransaccionFrecuenteTable[]
}> {
  try {
    const cuentaOrigen = aliasedTable(cuenta, "cuenta_origen")
    const cuentaDestino = aliasedTable(cuenta, "cuenta_destino")
    const categoriaOrigen = aliasedTable(cuentaCategoria, "categoria_origen")
    const categoriaDestino = aliasedTable(cuentaCategoria, "categoria_destino")

    const selectedFields = {
      id: transaccionFrecuente.id,
      tipo: transaccionFrecuente.tipo,
      nombre: transaccionFrecuente.nombre,
      monto: transaccionFrecuente.monto,
      categoria_origen: categoriaOrigen.nombre,
      cuenta_origen: cuentaOrigen.nombre,
      categoria_destino: categoriaDestino.nombre,
      cuenta_destino: cuentaDestino.nombre,
      descripcion: transaccionFrecuente.descripcion,
    }

    const filterBySearch = buildSearchFilter(searchParams, [
      sql<string>`CAST(${transaccionFrecuente.tipo} AS TEXT)`,
      transaccionFrecuente.nombre,
      categoriaOrigen.nombre,
      cuentaOrigen.nombre,
      categoriaDestino.nombre,
      cuentaDestino.nombre,
      transaccionFrecuente.descripcion,
    ])

    const data = await db
      .select(selectedFields)
      .from(transaccionFrecuente)
      .innerJoin(
        cuentaOrigen,
        eq(transaccionFrecuente.id_cuenta_origen, cuentaOrigen.id)
      )
      .innerJoin(
        cuentaDestino,
        eq(transaccionFrecuente.id_cuenta_destino, cuentaDestino.id)
      )
      .innerJoin(
        categoriaOrigen,
        eq(cuentaOrigen.id_categoria, categoriaOrigen.id)
      )
      .innerJoin(
        categoriaDestino,
        eq(cuentaDestino.id_categoria, categoriaDestino.id)
      )
      .where(and(filterBySearch))
      .orderBy(asc(transaccionFrecuente.tipo), asc(transaccionFrecuente.nombre))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener las transacciones frecuentes.")
  }
}

export async function getTransaccionFrecuenteById(
  id: string
): Promise<{ data: TransaccionFrecuenteById }> {
  try {
    const [data] = await db
      .select()
      .from(transaccionFrecuente)
      .where(eq(transaccionFrecuente.id, Number(id)))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudo obtener la transacción.")
  }
}

export async function getTransaccionesFrecuentesPage(): Promise<{
  data: TransaccionFrecuentePage[]
}> {
  try {
    const rawData = await db
      .select()
      .from(transaccionFrecuente)
      .orderBy(asc(transaccionFrecuente.tipo), asc(transaccionFrecuente.nombre))

    // Agrupar los resultados planos por tipo
    const groupedMap = new Map<
      TransaccionTipo,
      TransaccionFrecuentePage["items"]
    >()

    for (const row of rawData) {
      if (!groupedMap.has(row.tipo)) {
        groupedMap.set(row.tipo, [])
      }

      groupedMap.get(row.tipo)!.push({
        nombre: row.nombre,
        monto: row.monto,
        id_cuenta_origen: row.id_cuenta_origen,
        id_cuenta_destino: row.id_cuenta_destino,
        descripcion: row.descripcion,
      })
    }

    // Convertir el mapa al formato de salida esperado
    const data: TransaccionFrecuentePage[] = Array.from(
      groupedMap.entries()
    ).map(([tipo, items]) => ({
      tipo,
      items,
    }))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener las transacciones frecuentes.")
  }
}
