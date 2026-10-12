import { SearchParamsProps } from "@/types"
import { asc, desc, SQL, AnyColumn } from "drizzle-orm"

type ColumnLike = AnyColumn | SQL

export function buildOrderByFragment<T extends Record<string, ColumnLike>>(
  params: SearchParamsProps,
  validFields: T
) {
  const orderBy = (params?.orderBy as keyof T) || "id"
  const direction = params?.direction || "asc"
  const field = validFields[orderBy]

  if (!field) return asc(validFields.id)

  return direction === "desc" ? desc(field) : asc(field)
}
