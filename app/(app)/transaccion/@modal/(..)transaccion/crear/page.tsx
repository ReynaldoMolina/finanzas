export const dynamic = "force-dynamic"

import { CreateTransaccionForm } from "@/components/forms/transaccion/create"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { getCategoriasByTipoTransaccion } from "@/database/get-data/cuenta"
import { TransaccionTipo } from "@/lib/tipos"
import { PageProps } from "@/types"

const title = "Crear transacción"

export const metadata = { title }

export default async function Page({ searchParams }: PageProps) {
  const { tipo } = await searchParams
  const { cuentasOrigen, cuentasDestino } =
    await getCategoriasByTipoTransaccion({
      searchParams: await searchParams,
      initialTipo: tipo,
    })

  return (
    <ResponsiveDrawer title={title}>
      <CreateTransaccionForm
        tipo={tipo ?? ("" as unknown as TransaccionTipo)}
        cuentasOrigen={cuentasOrigen}
        cuentasDestino={cuentasDestino}
      />
    </ResponsiveDrawer>
  )
}
