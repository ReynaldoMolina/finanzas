import { CreateCategoriaForm } from "@/components/forms/categoria/create"
import { PageProps } from "@/types"

export const metadata = {
  title: "Crear categoría",
}

export default async function Page({ searchParams }: PageProps) {
  const { tipo } = await searchParams

  return <CreateCategoriaForm tipo={tipo} />
}
