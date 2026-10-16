import { SearchParamsProps } from "@/types"
import { between, SQL, SQLWrapper } from "drizzle-orm"
import { getSearchParams } from "./get-search-params"
import { getCurrentMonth } from "@/lib/get-date"

export function buildDateFilter(
  searchParams: SearchParamsProps,
  dateField: SQLWrapper
): SQL | undefined {
  const { start, end } = getSearchParams(searchParams)

  if (!start || !end) {
    const { firstDay, lastDay } = getCurrentMonth()
    return between(dateField, firstDay, lastDay)
  }

  return between(dateField, start, end)
}
