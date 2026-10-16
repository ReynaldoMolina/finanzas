export const dynamic = "force-dynamic"

import { EditTransaccionForm } from "@/components/forms/transaccion/edit"
import { getCategoriasByTipoTransaccion } from "@/database/get-data/cuenta"
import { getTransaccionById } from "@/database/get-data/transaccion"
import { PageProps } from "@/types"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Editar transacción",
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const { data: transaccion } = await getTransaccionById(id)

  if (!transaccion) return notFound()

  const { cuentasOrigen, cuentasDestino } =
    await getCategoriasByTipoTransaccion({
      searchParams: await searchParams,
      initialTipo: transaccion.tipo,
    })

  return (
    <EditTransaccionForm
      transaccion={transaccion}
      cuentasOrigen={cuentasOrigen}
      cuentasDestino={cuentasDestino}
    />
  )
}
