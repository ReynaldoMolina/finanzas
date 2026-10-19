import LogoutForm from "@/components/forms/login/logout-form"
import { AppHeader } from "@/components/header"
import { Loading } from "@/components/loading"
import { PageWrapper } from "@/components/page-wrapper"
import { ThemePicker } from "@/components/theme-picker"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { ConfiguracionWrapper } from "@/components/wrappers/configuracion"
import { auth } from "@/lib/auth"
import { ZapIcon, ChevronRightIcon } from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
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
      <PageWrapper className="gap-4 sm:max-w-md">
        <Suspense fallback={<Loading />}>
          <ConfiguracionWrapper />
        </Suspense>
        <Item
          variant="outline"
          render={<Link href="/configuracion/plantilla" />}
        >
          <ItemMedia variant="icon">
            <ZapIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Editar plantillas</ItemTitle>
            <ItemDescription>Usadas en transacciones.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon size="16" />
          </ItemActions>
        </Item>
        <ThemePicker />
        <LogoutForm user={session?.user} />
      </PageWrapper>
    </>
  )
}
