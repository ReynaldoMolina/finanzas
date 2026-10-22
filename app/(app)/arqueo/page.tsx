import { SearchInput } from "@/components/search-input"
import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { PageProps } from "@/types"
import { ArqueoWrapper } from "@/components/wrappers/arqueo"
import { Loading } from "@/components/loading"
import { Suspense } from "react"
import { LinkButton } from "@/components/link-button"

const title = "Arqueos"

export const metadata = {
  title: title,
}

export default async function Page({ searchParams }: PageProps) {
  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <SearchInput>
          <LinkButton href="/arqueo/crear">
            <PlusIcon />
            Nuevo
          </LinkButton>
        </SearchInput>
        <Suspense fallback={<Loading />}>
          <ArqueoWrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
