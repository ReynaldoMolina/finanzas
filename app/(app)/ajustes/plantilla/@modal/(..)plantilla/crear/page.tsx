import { CreatePlantillaForm } from "@/components/forms/plantilla/create"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { getCategoriasByTipoTransaccion } from "@/database/get-data/cuenta"
import { TransaccionTipo } from "@/lib/tipos"
import { PageProps } from "@/types"

const title = "Crear plantilla"

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
      <CreatePlantillaForm
        tipo={tipo ?? ("" as unknown as TransaccionTipo)}
        cuentasOrigen={cuentasOrigen}
        cuentasDestino={cuentasDestino}
      />
    </ResponsiveDrawer>
  )
}
