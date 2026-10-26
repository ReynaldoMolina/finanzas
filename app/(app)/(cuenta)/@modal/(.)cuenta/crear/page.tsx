export const dynamic = "force-dynamic"

import { CreateCuentaForm } from "@/components/forms/cuenta/create"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { getCategoriasByTipo } from "@/database/get-data/categoria"
import { PageProps } from "@/types"

const title = "Crear cuenta"

export const metadata = {
  title,
}

export default async function Page({ searchParams }: PageProps) {
  const { cuenta_tipo } = await searchParams
  const { data } = await getCategoriasByTipo({
    searchParams: await searchParams,
  })

  return (
    <ResponsiveDrawer title={title}>
      <CreateCuentaForm categorias={data} cuenta_tipo={cuenta_tipo} />
    </ResponsiveDrawer>
  )
}
