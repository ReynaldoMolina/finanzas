import { EditCuentaForm } from "@/components/forms/cuentas/edit"
import { getCategoriasByTipo } from "@/database/get-data/categoria"
import { getCuentaById } from "@/database/get-data/cuenta"
import { PageProps } from "@/types"

export const metadata = {
  title: "Editar cuenta",
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const { data } = await getCuentaById(id)
  const { data: categorias } = await getCategoriasByTipo({
    searchParams: await searchParams,
    initialTipo: data.tipo,
  })

  return <EditCuentaForm cuenta={data} categorias={categorias} />
}
