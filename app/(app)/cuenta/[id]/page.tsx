import { EditCuentaForm } from "@/components/forms/cuentas/edit"
import { getCategoriasByTipo } from "@/database/get-data/categoria"
import { getCuentaById, getTipoCuentaById } from "@/database/get-data/cuenta"
import { PageProps } from "@/types"

export const metadata = {
  title: "Editar cuenta",
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const { data } = await getCuentaById(id)
  const { initialTipo } = await getTipoCuentaById(id)
  const { data: categorias } = await getCategoriasByTipo({
    searchParams: await params,
    initialTipo,
  })

  return <EditCuentaForm cuenta={data} categorias={categorias} />
}
