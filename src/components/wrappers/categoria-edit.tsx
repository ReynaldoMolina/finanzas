import { getCategoriaById } from "@/database/get-data/categoria"
import { notFound } from "next/navigation"
import { EditCategoriaForm } from "../forms/categoria/edit"

interface Props {
  id: string
}

export async function CategoriaEditWrapper({ id }: Props) {
  const { data } = await getCategoriaById(id)

  if (!data) return notFound()

  return <EditCategoriaForm categoria={data} />
}
