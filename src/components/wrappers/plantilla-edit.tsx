import { getCategoriasByTipoTransaccion } from "@/database/get-data/cuenta"
import { getPlantillaById } from "@/database/get-data/plantilla"
import { notFound } from "next/navigation"
import { EditPlantillaForm } from "../forms/plantilla/edit"
import { SearchParamsProps } from "@/types"

interface Props {
  id: string
  searchParams: SearchParamsProps
}

export async function PlantillaEditWrapper({ id, searchParams }: Props) {
  const { data: transaccion } = await getPlantillaById(id)

  if (!transaccion) return notFound()

  const { cuentasOrigen, cuentasDestino } =
    await getCategoriasByTipoTransaccion({
      searchParams,
      initialTipo: transaccion.tipo,
    })

  return (
    <EditPlantillaForm
      transaccion={transaccion}
      cuentasOrigen={cuentasOrigen}
      cuentasDestino={cuentasDestino}
    />
  )
}
