import { getTransacciones } from "@/database/get-data/transaccion"
import { PageWrapperType } from "@/types"
import { TransaccionTable } from "../table/transaccion-table"

export default async function TransaccionWrapper({
  searchParams,
}: PageWrapperType) {
  const { data, totalPages } = await getTransacciones(searchParams)

  return <TransaccionTable data={data} totalPages={totalPages} />
}
