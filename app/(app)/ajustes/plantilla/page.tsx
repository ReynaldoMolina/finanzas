import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { SearchInput } from "@/components/search-input"
import { PageProps } from "@/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Loading } from "@/components/loading"
import { Suspense } from "react"
import PlantillaWrapper from "@/components/wrappers/plantilla"
import { LinkButton } from "@/components/link-button"

const title = "Plantillas"

export const metadata = {
  title: title,
}

export default async function Page({ searchParams }: PageProps) {
  return (
    <>
      <AppHeader title={title} showBackButton />
      <PageWrapper>
        <SearchInput>
          <LinkButton href="/ajustes/plantilla/crear">
            <PlusIcon />
            Nuevo
          </LinkButton>
        </SearchInput>
        <Suspense fallback={<Loading />}>
          <PlantillaWrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
