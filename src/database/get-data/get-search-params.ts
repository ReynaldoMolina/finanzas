import { SearchParamsProps } from "@/types"
import { ITEMS_PER_PAGE } from "./items-per-page"

export function getSearchParams(searchParams: SearchParamsProps) {
  const { from, to, page: pageParam, limit: limitParam } = searchParams

  //limit
  const page = pageParam ? Number(pageParam) : 1
  const limit = limitParam ? Number(limitParam) : ITEMS_PER_PAGE

  const offset = (page - 1) * limit

  return { from, to, limit, offset }
}
