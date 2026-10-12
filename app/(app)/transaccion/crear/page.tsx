import { CreateTransaccionForm } from "@/components/forms/transaccion/create"
import { getCategoriasByTipoTransaccion } from "@/database/get-data/cuenta"
import { TransaccionTipo } from "@/lib/tipos"
import { PageProps } from "@/types"

export const metadata = {
  title: "Crear transacción",
}

export default async function Page({ searchParams }: PageProps) {
  const { tipo } = await searchParams
  const { cuentasOrigen, cuentasDestino } =
    await getCategoriasByTipoTransaccion({
      searchParams: await searchParams,
      initialTipo: tipo,
    })

  return (
    <CreateTransaccionForm
      tipo={tipo ?? ("" as unknown as TransaccionTipo)}
      cuentasOrigen={cuentasOrigen}
      cuentasDestino={cuentasDestino}
    />
  )
}
