export const dynamic = "force-dynamic"

import { EditCuentaForm } from "@/components/forms/cuenta/edit"
import { getCategoriasByTipo } from "@/database/get-data/categoria"
import { getCuentaById } from "@/database/get-data/cuenta"
import { PageProps } from "@/types"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Editar cuenta",
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const { data } = await getCuentaById(id)

  if (!data) return notFound()

  const { data: categorias } = await getCategoriasByTipo({
    searchParams: await searchParams,
    initialTipo: data.tipo,
  })

  return <EditCuentaForm cuenta={data} categorias={categorias} />
}
