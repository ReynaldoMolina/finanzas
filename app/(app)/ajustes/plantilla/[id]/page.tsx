import { SkeletonForm } from "@/components/forms/skeleton"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { PlantillaEditWrapper } from "@/components/wrappers/plantilla-edit"
import { PageProps } from "@/types"
import { Suspense } from "react"

const title = "Editar plantilla"

export const metadata = { title }

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params

  return (
    <ResponsiveDrawer title={title}>
      <Suspense fallback={<SkeletonForm />}>
        <PlantillaEditWrapper id={id} searchParams={await searchParams} />
      </Suspense>
    </ResponsiveDrawer>
  )
}
