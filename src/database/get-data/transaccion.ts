import {
  SearchParamsProps,
  TransaccionById,
  TransaccionTablaType,
} from "@/types"
import { db } from ".."
import { cuentaCategoria, cuenta, transaccion } from "../schema/schema"
import { aliasedTable, desc, eq, and, sql } from "drizzle-orm"
import { buildSearchFilter } from "./build-search-filter"
import { buildDateFilter } from "./build-date-filter"
import { getSearchParams } from "./get-search-params"

export async function getTransacciones(
  searchParams: SearchParamsProps
): Promise<{
  data: TransaccionTablaType[]
  totalPages: number
}> {
  const filterByDate = buildDateFilter(searchParams, transaccion.fecha)

  const { limit, offset } = getSearchParams(searchParams)

  try {
    const cuentaOrigen = aliasedTable(cuenta, "cuenta_origen")
    const cuentaDestino = aliasedTable(cuenta, "cuenta_destino")
    const categoriaOrigen = aliasedTable(cuentaCategoria, "categoria_origen")
    const categoriaDestino = aliasedTable(cuentaCategoria, "categoria_destino")

    const selectedFields = {
      id: transaccion.id,
      tipo: transaccion.tipo,
      fecha: transaccion.fecha,
      monto: transaccion.monto,
      categoria_origen: categoriaOrigen.nombre,
      cuenta_origen: cuentaOrigen.nombre,
      categoria_destino: categoriaDestino.nombre,
      cuenta_destino: cuentaDestino.nombre,
      descripcion: transaccion.descripcion,
    }

    const filterBySearch = buildSearchFilter(searchParams, [
      sql<string>`CAST(${transaccion.tipo} AS TEXT)`,
      categoriaOrigen.nombre,
      cuentaOrigen.nombre,
      categoriaDestino.nombre,
      cuentaDestino.nombre,
      transaccion.descripcion,
    ])

    const data = await db
      .select(selectedFields)
      .from(transaccion)
      .innerJoin(
        cuentaOrigen,
        eq(transaccion.id_cuenta_origen, cuentaOrigen.id)
      )
      .innerJoin(
        cuentaDestino,
        eq(transaccion.id_cuenta_destino, cuentaDestino.id)
      )
      .innerJoin(
        categoriaOrigen,
        eq(cuentaOrigen.id_categoria, categoriaOrigen.id)
      )
      .innerJoin(
        categoriaDestino,
        eq(cuentaDestino.id_categoria, categoriaDestino.id)
      )
      .where(and(filterBySearch, filterByDate))
      .orderBy(desc(transaccion.fecha), desc(transaccion.id))
      .limit(limit)
      .offset(offset)

    const [{ count }] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(transaccion)
      .innerJoin(
        cuentaOrigen,
        eq(transaccion.id_cuenta_origen, cuentaOrigen.id)
      )
      .innerJoin(
        cuentaDestino,
        eq(transaccion.id_cuenta_destino, cuentaDestino.id)
      )
      .innerJoin(
        categoriaOrigen,
        eq(cuentaOrigen.id_categoria, categoriaOrigen.id)
      )
      .innerJoin(
        categoriaDestino,
        eq(cuentaDestino.id_categoria, categoriaDestino.id)
      )
      .where(and(filterBySearch, filterByDate))

    const totalPages = Math.ceil(count / limit) || 1

    return { data, totalPages }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener las transacciones.")
  }
}

export async function getTransaccionById(
  id: string
): Promise<{ data: TransaccionById }> {
  try {
    const [data] = await db
      .select()
      .from(transaccion)
      .where(eq(transaccion.id, Number(id)))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudo obtener la transacción.")
  }
}
