export const dynamic = "force-dynamic"

import { CreateCuentaForm } from "@/components/forms/cuenta/create"
import { getCategoriasByTipo } from "@/database/get-data/categoria"
import { PageProps } from "@/types"

export const metadata = {
  title: "Crear cuenta",
}

export default async function Page({ searchParams }: PageProps) {
  const { cuenta_tipo } = await searchParams
  const { data } = await getCategoriasByTipo({
    searchParams: await searchParams,
  })

  return <CreateCuentaForm categorias={data} cuenta_tipo={cuenta_tipo} />
}
