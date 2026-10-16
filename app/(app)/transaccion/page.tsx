import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { SearchInput } from "@/components/search-input"
import { PageProps } from "@/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, PlusIcon } from "lucide-react"
import { ButtonGroup } from "@/components/ui/button-group"
import { DateRangeButtons } from "@/components/date-range-buttons"
import { Suspense } from "react"
import { Loading } from "@/components/loading"
import TransaccionWrapper from "@/components/wrappers/transaccion"

const title = "Transacciones"

export const metadata = {
  title: title,
}

export default async function Page({ searchParams }: PageProps) {
  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <div className="flex flex-wrap gap-2">
          <div className="flex w-full gap-2 sm:w-fit">
            <SearchInput />
            <ButtonGroup>
              <Link href="/transaccion/crear">
                <Button>
                  <PlusIcon />
                  <span className="hidden xs:block">Nuevo</span>
                </Button>
              </Link>
              <Link href="/transaccion/frecuentes">
                <Button size="icon">
                  <ChevronDown />
                </Button>
              </Link>
            </ButtonGroup>
          </div>
          <DateRangeButtons searchParams={await searchParams} />
        </div>

        <Suspense fallback={<Loading />}>
          <TransaccionWrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
