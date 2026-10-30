import { getArqueos } from "@/database/get-data/arqueo"
import { getAjustesCambioDolar } from "@/database/get-data/ajustes"
import { PageWrapperType } from "@/types"
import { EmptyList } from "../table/empty-list"
import { Contador } from "../forms/contador/contador"

export async function ArqueoWrapper({ searchParams }: PageWrapperType) {
  const { data } = await getArqueos(searchParams)
  const { cambio_dolar } = await getAjustesCambioDolar()

  if (data.length <= 0) return <EmptyList />

  return (
    <div className="flex flex-col flex-wrap gap-2 sm:flex-row">
      {data.map((item) => (
        <Contador key={item.id} arqueo={item} cambio_dolar={cambio_dolar} />
      ))}
    </div>
  )
}
