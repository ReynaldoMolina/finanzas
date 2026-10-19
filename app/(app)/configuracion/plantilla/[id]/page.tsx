import { EditPlantillaForm } from "@/components/forms/plantilla/edit"
import { getCategoriasByTipoTransaccion } from "@/database/get-data/cuenta"
import { getPlantillaById } from "@/database/get-data/plantilla"
import { PageProps } from "@/types"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Editar plantilla",
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const { data: transaccion } = await getPlantillaById(id)

  if (!transaccion) return notFound()

  const { cuentasOrigen, cuentasDestino } =
    await getCategoriasByTipoTransaccion({
      searchParams: await searchParams,
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
