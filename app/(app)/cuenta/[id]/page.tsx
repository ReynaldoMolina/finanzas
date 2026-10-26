export const dynamic = "force-dynamic"

import { SkeletonForm } from "@/components/forms/skeleton"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { CuentaEditWrapper } from "@/components/wrappers/cuenta-edit"
import { PageProps } from "@/types"
import { Suspense } from "react"

const title = "Editar cuenta"

export const metadata = { title }

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params

  return (
    <ResponsiveDrawer title={title}>
      <Suspense fallback={<SkeletonForm />}>
        <CuentaEditWrapper id={id} searchParams={await searchParams} />
      </Suspense>
    </ResponsiveDrawer>
  )
}
