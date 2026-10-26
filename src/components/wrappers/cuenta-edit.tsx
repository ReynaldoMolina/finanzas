import { getCategoriasByTipo } from "@/database/get-data/categoria"
import { getCuentaById } from "@/database/get-data/cuenta"
import { SearchParamsProps } from "@/types"
import { notFound } from "next/navigation"
import { EditCuentaForm } from "../forms/cuenta/edit"

interface Props {
  id: string
  searchParams: SearchParamsProps
}

export async function CuentaEditWrapper({ id, searchParams }: Props) {
  const { data } = await getCuentaById(id)

  if (!data) return notFound()

  const { data: categorias } = await getCategoriasByTipo({
    searchParams,
    initialTipo: data.tipo,
  })

  return <EditCuentaForm cuenta={data} categorias={categorias} />
}
