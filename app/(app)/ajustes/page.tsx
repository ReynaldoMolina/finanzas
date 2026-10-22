import { AppHeader } from "@/components/header"
import { Loading } from "@/components/loading"
import { PageWrapper } from "@/components/page-wrapper"
import { ConfiguracionWrapper } from "@/components/wrappers/configuracion"
import { Suspense } from "react"

const title = "Ajustes"

export const metadata = {
  title: title,
}

export default async function Page() {
  return (
    <>
      <AppHeader title={title} showBackButton />
      <PageWrapper className="gap-4 sm:max-w-md">
        <Suspense fallback={<Loading />}>
          <ConfiguracionWrapper />
        </Suspense>
      </PageWrapper>
    </>
  )
}
