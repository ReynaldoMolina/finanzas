import { CategoriaById, SearchParamsProps, SelectItemType } from "@/types"
import { cuentaCategoria } from "../schema"
import { db } from ".."
import { eq, sql } from "drizzle-orm"
import { CuentaTipo } from "@/lib/tipos"

interface GetCategoriasByTipoParams {
  searchParams?: SearchParamsProps
  initialTipo?: CuentaTipo
}

export async function getCategoriasByTipo({
  searchParams,
  initialTipo,
}: GetCategoriasByTipoParams = {}): Promise<{ data: SelectItemType[] }> {
  const tipo = searchParams?.cuenta_tipo ?? initialTipo ?? ""

  console.log(tipo)

  if (!tipo) {
    return Promise.resolve({ data: [] })
  }

  const selectFields = {
    value: sql<string>`CAST(${cuentaCategoria.id} AS TEXT)`,
    label: cuentaCategoria.nombre,
  }

  try {
    const data = await db
      .select(selectFields)
      .from(cuentaCategoria)
      .where(eq(cuentaCategoria.tipo, tipo))

    return { data }
  } catch (error) {
    throw new Error("No se pudieron obtener las categorías.")
  }
}

export async function getCategoriaById(
  id: string
): Promise<{ data: CategoriaById }> {
  try {
    const [data] = await db
      .select()
      .from(cuentaCategoria)
      .where(eq(cuentaCategoria.id, Number(id)))

    return { data }
  } catch (error) {
    throw new Error("No se pudo obtener la categoría.")
  }
}
