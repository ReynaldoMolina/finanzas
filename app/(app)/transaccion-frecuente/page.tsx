import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { SearchInput } from "@/components/search-input"
import { PageProps } from "@/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { getTransaccionesFrecuentes } from "@/database/get-data/transaccion-frecuente"
import { TransaccionFrecuenteTabla } from "@/components/table/transaccion-frecuente-table"

const title = "Transacciones frecuentes"

export const metadata = {
  title: title,
}

export default async function Page({ searchParams }: PageProps) {
  const { data } = await getTransaccionesFrecuentes(await searchParams)

  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <div className="flex gap-2">
          <SearchInput />

          <Link href="/transaccion-frecuente/crear">
            <Button>
              <PlusIcon />
              <span className="hidden xs:block">Nuevo</span>
            </Button>
          </Link>
        </div>
        <TransaccionFrecuenteTabla data={data} />
      </PageWrapper>
    </>
  )
}
