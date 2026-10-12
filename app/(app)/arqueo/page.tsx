import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"

const title = "Arqueo"

export const metadata = {
  title: title,
}

export default function Page() {
  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <p>Hola</p>
      </PageWrapper>
    </>
  )
}
