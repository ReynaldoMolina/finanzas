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

export const metadata = { title }

export default async function Page({ searchParams }: PageProps) {
  const createLinks = [
    { label: "Cuenta", url: "/cuenta/crear" },
    { label: "Categoría", url: "/categoria/crear" },
  ]

  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <div className="flex flex-wrap gap-2">
          <SearchInput>
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
                  {createLinks.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      render={<Link href={item.url}>{item.label}</Link>}
                    />
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SearchInput>
          <DateRangeButtons searchParams={await searchParams} />
        </div>

        <Suspense fallback={<Loading />}>
          <CuentaWrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
