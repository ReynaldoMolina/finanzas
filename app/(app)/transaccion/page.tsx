import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { getTransacciones } from "@/database/get-data/transaccion"
import { TransaccionTable } from "@/components/table/transaccion-table"
import { SearchInput } from "@/components/data-actions/search-input"
import { PageProps } from "@/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, PlusIcon } from "lucide-react"
import { ButtonGroup } from "@/components/ui/button-group"

const title = "Transacciones"

export const metadata = {
  title: title,
}

export default async function Page({ searchParams }: PageProps) {
  const { data } = await getTransacciones(await searchParams)

  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <div className="flex gap-2">
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
        <TransaccionTable data={data} />
      </PageWrapper>
    </>
  )
}
