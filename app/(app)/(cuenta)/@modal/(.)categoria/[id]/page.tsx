import { SkeletonForm } from "@/components/forms/skeleton"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { CategoriaEditWrapper } from "@/components/wrappers/categoria-edit"
import { PageProps } from "@/types"
import { Suspense } from "react"

const title = "Editar categoría"

export const metadata = { title }

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return (
    <ResponsiveDrawer title={title}>
      <Suspense fallback={<SkeletonForm />}>
        <CategoriaEditWrapper id={id} />
      </Suspense>
    </ResponsiveDrawer>
  )
}
