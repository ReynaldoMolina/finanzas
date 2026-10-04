import { AppHeader } from "@/src/components/header"
import { PageWrapper } from "@/src/components/page-wrapper"

const title = "Por cobrar"

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
