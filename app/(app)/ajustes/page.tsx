import { SkeletonForm } from "@/components/forms/skeleton"
import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { AjustesWrapper } from "@/components/wrappers/ajustes"
import { Suspense } from "react"

const title = "Ajustes"

export const metadata = { title }

export default async function Page() {
  return (
    <>
      <AppHeader title={title} showBackButton />
      <PageWrapper className="gap-4 sm:max-w-md">
        <Suspense fallback={<SkeletonForm />}>
          <AjustesWrapper />
        </Suspense>
      </PageWrapper>
    </>
  )
}
