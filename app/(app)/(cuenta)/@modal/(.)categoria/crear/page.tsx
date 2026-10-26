import { CreateCategoriaForm } from "@/components/forms/categoria/create"
import { ResponsiveDrawer } from "@/components/responsive-drawer"

const title = "Crear categoría"

export const metadata = { title }

export default async function Page() {
  return (
    <ResponsiveDrawer title={title}>
      <CreateCategoriaForm />
    </ResponsiveDrawer>
  )
}
