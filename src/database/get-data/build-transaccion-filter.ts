import { SearchParamsProps } from "@/types"
import { ilike, or, sql, SQL, SQLWrapper, eq } from "drizzle-orm"
import { transaccion } from "../schema/schema"
import { SearchFields } from "@/lib/tipos"

export function buildTipoFilter(
  searchParams: SearchParamsProps
): SQL | undefined {
  const tipo = searchParams?.tipo

  if (!tipo) return undefined
  return eq(transaccion.tipo, tipo)
}

export function buildTransaccionFilter(
  searchParams: SearchParamsProps,
  fieldsMap: {
    categoria: SQLWrapper[]
    cuenta: SQLWrapper[]
    descripcion: SQLWrapper[]
    todo: SQLWrapper[]
  }
): SQL | undefined {
  const search = searchParams?.search?.trim() || ""
  const search_field = searchParams?.search_field?.trim() as SearchFields

  if (!search) return undefined

  let targetFields = fieldsMap.todo

  switch (search_field) {
    case "Categoría":
      targetFields = fieldsMap.categoria
      break
    case "Cuenta":
      targetFields = fieldsMap.cuenta
      break
    case "Descripción":
      targetFields = fieldsMap.descripcion
      break
    default:
      targetFields = fieldsMap.todo
      break
  }

  return or(
    ...targetFields.map((field) =>
      ilike(sql`unaccent(${field})`, sql`unaccent(${`%${search}%`})`)
    )
  )
}
