import { getArqueos } from "@/database/get-data/arqueo"
import { getConfiguracionCambioDolar } from "@/database/get-data/configuracion"
import { PageWrapperType } from "@/types"
import EmptyList from "../table/empty-list"
import { Contador } from "../forms/contador/contador"

export async function ArqueoWrapper({ searchParams }: PageWrapperType) {
  const { data } = await getArqueos(searchParams)
  const { cambio_dolar } = await getConfiguracionCambioDolar()

  return (
    <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
      {data.length <= 0 ? (
        <EmptyList />
      ) : (
        data.map((item) => (
          <Contador key={item.id} arqueo={item} cambio_dolar={cambio_dolar} />
        ))
      )}
    </div>
  )
}
