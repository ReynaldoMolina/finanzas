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

const title = "Arqueos"

export const metadata = {
  title: title,
}

export default async function Page({ searchParams }: PageProps) {
  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <div className="flex gap-2">
          <SearchInput />
          <Link href="/arqueo/crear">
            <Button>
              <PlusIcon />
              <span className="hidden xs:block">Nuevo</span>
            </Button>
          </Link>
        </div>
        <Suspense fallback={<Loading />}>
          <ArqueoWrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
