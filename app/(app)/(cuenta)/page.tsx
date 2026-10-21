import { SearchInput } from "@/components/search-input"
import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { PageProps } from "@/types"
import { DateRangeButtons } from "@/components/date-range-buttons"
import { Suspense } from "react"
import CuentaWrapper from "@/components/wrappers/cuenta"
import { Loading } from "@/components/loading"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const title = "Cuentas"

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

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button>
                    <PlusIcon />
                    Nuevo
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="py-3"
                    render={<Link href="/cuenta/crear">Cuenta</Link>}
                  />
                  <DropdownMenuItem
                    className="py-3"
                    render={<Link href="/categoria/crear">Categoría</Link>}
                  />
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DateRangeButtons searchParams={await searchParams} />
        </div>

        <Suspense fallback={<Loading />}>
          <CuentaWrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
