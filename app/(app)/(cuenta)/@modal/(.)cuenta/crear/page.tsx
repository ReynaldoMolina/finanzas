export const dynamic = "force-dynamic"

import { CreateCuentaForm } from "@/components/forms/cuentas/create"
import { getCategoriasByTipo } from "@/database/get-data/categoria"
import { PageProps } from "@/types"

export const metadata = {
  title: "Crear cuenta",
}

export default async function Page({ searchParams }: PageProps) {
  const { id_categoria, cuenta_tipo } = await searchParams

  const { data } = await getCategoriasByTipo({
    searchParams: await searchParams,
  })

  return (
    <CreateCuentaForm
      tipo={cuenta_tipo}
      id_categoria={id_categoria}
      categorias={data}
    />
  )
}
