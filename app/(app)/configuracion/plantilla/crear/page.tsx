import { CreatePlantillaForm } from "@/components/forms/plantilla/create"
import { getCategoriasByTipoTransaccion } from "@/database/get-data/cuenta"
import { TransaccionTipo } from "@/lib/tipos"
import { PageProps } from "@/types"

export const metadata = {
  title: "Crear transacción frecuente",
}

export default async function Page({ searchParams }: PageProps) {
  const { tipo } = await searchParams
  const { cuentasOrigen, cuentasDestino } =
    await getCategoriasByTipoTransaccion({
      searchParams: await searchParams,
      initialTipo: tipo,
    })

  return (
    <CreatePlantillaForm
      tipo={tipo ?? ("" as unknown as TransaccionTipo)}
      cuentasOrigen={cuentasOrigen}
      cuentasDestino={cuentasDestino}
    />
  )
}
