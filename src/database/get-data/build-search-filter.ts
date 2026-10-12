import { SearchParamsProps } from "@/types"
import { ilike, or, sql, SQL, SQLWrapper } from "drizzle-orm"

export function buildSearchFilter(
  searchParams: SearchParamsProps,
  searchFields: SQLWrapper[]
): SQL | undefined {
  const search: string = searchParams?.search?.trim() || ""

  if (!search) return undefined

  return or(
    ...searchFields.map((field) =>
      ilike(sql`unaccent(${field})`, sql`unaccent(${`%${search}%`})`)
    )
  )
}
