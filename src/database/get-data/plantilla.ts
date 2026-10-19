import {
  SearchParamsProps,
  PlantillaById,
  PlantillaPage,
  PlantillaTable,
} from "@/types"
import { db } from ".."
import { cuentaCategoria, cuenta, plantilla } from "../schema/schema"
import { aliasedTable, eq, sql, and, asc } from "drizzle-orm"
import { buildSearchFilter } from "./build-search-filter"
import { TransaccionTipo } from "@/lib/tipos"

export async function getPlantillas(searchParams: SearchParamsProps): Promise<{
  data: PlantillaTable[]
}> {
  try {
    const cuentaOrigen = aliasedTable(cuenta, "cuenta_origen")
    const cuentaDestino = aliasedTable(cuenta, "cuenta_destino")
    const categoriaOrigen = aliasedTable(cuentaCategoria, "categoria_origen")
    const categoriaDestino = aliasedTable(cuentaCategoria, "categoria_destino")

    const selectedFields = {
      id: plantilla.id,
      tipo: plantilla.tipo,
      nombre: plantilla.nombre,
      monto: plantilla.monto,
      categoria_origen: categoriaOrigen.nombre,
      cuenta_origen: cuentaOrigen.nombre,
      categoria_destino: categoriaDestino.nombre,
      cuenta_destino: cuentaDestino.nombre,
      descripcion: plantilla.descripcion,
    }

    const filterBySearch = buildSearchFilter(searchParams, [
      sql<string>`CAST(${plantilla.tipo} AS TEXT)`,
      plantilla.nombre,
      categoriaOrigen.nombre,
      cuentaOrigen.nombre,
      categoriaDestino.nombre,
      cuentaDestino.nombre,
      plantilla.descripcion,
    ])

    const data = await db
      .select(selectedFields)
      .from(plantilla)
      .innerJoin(cuentaOrigen, eq(plantilla.id_cuenta_origen, cuentaOrigen.id))
      .innerJoin(
        cuentaDestino,
        eq(plantilla.id_cuenta_destino, cuentaDestino.id)
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
      .orderBy(asc(plantilla.tipo), asc(plantilla.nombre))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener las plantillas.")
  }
}

export async function getPlantillaById(
  id: string
): Promise<{ data: PlantillaById }> {
  try {
    const [data] = await db
      .select()
      .from(plantilla)
      .where(eq(plantilla.id, Number(id)))

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudo obtener la plantilla.")
  }
}

export async function getPlantillasPage(): Promise<{
  data: PlantillaPage[]
}> {
  try {
    const rawData = await db
      .select()
      .from(plantilla)
      .orderBy(asc(plantilla.tipo), asc(plantilla.nombre))

    // Agrupar los resultados planos por tipo
    const groupedMap = new Map<TransaccionTipo, PlantillaPage["items"]>()

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
    const data: PlantillaPage[] = Array.from(groupedMap.entries()).map(
      ([tipo, items]) => ({
        tipo,
        items,
      })
    )

    return { data }
  } catch (error) {
    console.error(error)
    throw new Error("No se pudieron obtener las plantillas.")
  }
}
