export const dynamic = "force-dynamic"

import { SkeletonForm } from "@/components/forms/skeleton"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { ArqueoEditWrapper } from "@/components/wrappers/arqueo-edit"
import { PageProps } from "@/types"
import { Suspense } from "react"

const title = "Editar arqueo"

export const metadata = { title }

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return (
    <ResponsiveDrawer title={title}>
      <Suspense fallback={<SkeletonForm />}>
        <ArqueoEditWrapper id={id} />
      </Suspense>
    </ResponsiveDrawer>
  )
}
