import { getArqueos } from "@/database/get-data/arqueo"
import { PageWrapperType } from "@/types"
import { EmptyList } from "../table/empty-list"
import { ArqueoTable } from "../table/arqueo-table"

export async function ArqueoWrapper({ searchParams }: PageWrapperType) {
  const { data } = await getArqueos(searchParams)

  if (data.length <= 0) return <EmptyList />

  return <ArqueoTable data={data} />
}
