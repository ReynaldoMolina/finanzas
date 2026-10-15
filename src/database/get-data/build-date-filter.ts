import { SearchParamsProps } from "@/types"
import { between, SQL, SQLWrapper } from "drizzle-orm"
import { getSearchParams } from "./get-search-params"

export function buildDateFilter(
  searchParams: SearchParamsProps,
  dateField: SQLWrapper
): SQL | undefined {
  const { start, end } = getSearchParams(searchParams)

  if (!start || !end) return undefined

  return between(dateField, start, end)
}
