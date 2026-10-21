export const dynamic = "force-dynamic"

import { CreateCuentaForm } from "@/components/forms/cuentas/create"
import { getCategoriasByTipo } from "@/database/get-data/categoria"
import { PageProps } from "@/types"

export const metadata = {
  title: "Crear cuenta",
}

export default async function Page({ searchParams }: PageProps) {
  const { data } = await getCategoriasByTipo({
    searchParams: await searchParams,
  })

  return <CreateCuentaForm categorias={data} />
}
