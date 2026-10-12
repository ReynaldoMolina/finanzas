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

  const { id_categoria, tipo } = await searchParams

  return (
    <CreateCuentaForm
      categorias={data}
      id_categoria={id_categoria}
      tipo={tipo}
    />
  )
}
