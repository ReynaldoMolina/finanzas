import { EditCategoriaForm } from "@/components/forms/categoria/edit"
import { getCategoriaById } from "@/database/get-data/categoria"
import { PageProps } from "@/types"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Editar categoría",
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const { data } = await getCategoriaById(id)

  if (!data) return notFound()

  return <EditCategoriaForm categoria={data} />
}
