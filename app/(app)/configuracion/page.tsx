import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import Link from "next/link"

const title = "Configuración"

export const metadata = {
  title: title,
}

export default function Page() {
  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <Link href="/configuracion/frecuentes">Frecuentes</Link>
      </PageWrapper>
    </>
  )
}
