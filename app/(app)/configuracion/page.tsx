import LogoutForm from "@/components/forms/login/logout-form"
import { AppHeader } from "@/components/header"
import { Loading } from "@/components/loading"
import { PageWrapper } from "@/components/page-wrapper"
import { ConfiguracionWrapper } from "@/components/wrappers/configuracion"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Suspense } from "react"

const title = "Configuración"

export const metadata = {
  title: title,
}

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <>
      <AppHeader title={title} />
      <PageWrapper className="gap-8 sm:max-w-md">
        <Suspense fallback={<Loading />}>
          <ConfiguracionWrapper />
        </Suspense>
        <LogoutForm user={session?.user} />
      </PageWrapper>
    </>
  )
}
