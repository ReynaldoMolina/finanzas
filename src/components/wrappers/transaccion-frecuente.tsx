import { PageWrapperType } from "@/types"
import { getTransaccionesFrecuentes } from "@/database/get-data/transaccion-frecuente"
import { TransaccionFrecuenteTabla } from "../table/transaccion-frecuente-table"

export default async function TransaccionFrecuenteWrapper({
  searchParams,
}: PageWrapperType) {
  const { data } = await getTransaccionesFrecuentes(searchParams)

  return <TransaccionFrecuenteTabla data={data} />
}
