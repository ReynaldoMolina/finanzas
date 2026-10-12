import { EditTransaccionFrecuenteForm } from "@/components/forms/transaccion-frecuente/edit"
import { getCategoriasByTipoTransaccion } from "@/database/get-data/cuenta"
import { getTransaccionFrecuenteById } from "@/database/get-data/transaccion-frecuente"
import { PageProps } from "@/types"

export const metadata = {
  title: "Editar transacción frecuente",
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const { data: transaccion } = await getTransaccionFrecuenteById(id)
  const { cuentasOrigen, cuentasDestino } =
    await getCategoriasByTipoTransaccion({
      searchParams: await searchParams,
      initialTipo: transaccion.tipo,
    })

  return (
    <EditTransaccionFrecuenteForm
      transaccion={transaccion}
      cuentasOrigen={cuentasOrigen}
      cuentasDestino={cuentasDestino}
    />
  )
}
