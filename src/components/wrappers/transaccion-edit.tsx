import { getCategoriasByTipoTransaccion } from "@/database/get-data/cuenta"
import { getTransaccionById } from "@/database/get-data/transaccion"
import { SearchParamsProps } from "@/types"
import { notFound } from "next/navigation"
import { EditTransaccionForm } from "../forms/transaccion/edit"

interface TransaccionEditWrapper {
  id: string
  searchParams: SearchParamsProps
}

export async function TransaccionEditWrapper({
  id,
  searchParams,
}: TransaccionEditWrapper) {
  const { data: transaccion } = await getTransaccionById(id)

  if (!transaccion) return notFound()

  const { cuentasOrigen, cuentasDestino } =
    await getCategoriasByTipoTransaccion({
      searchParams,
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
