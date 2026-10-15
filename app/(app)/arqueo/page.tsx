import { SearchInput } from "@/components/search-input"
import { Contador } from "@/components/forms/contador/contador"
import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import EmptyList from "@/components/table/empty-list"
import { Button } from "@/components/ui/button"
import { getArqueos } from "@/database/get-data/arqueo"
import { getConfiguracionCambioDolar } from "@/database/get-data/configuracion"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { PageProps } from "@/types"

const title = "Arqueos"

export const metadata = {
  title: title,
}

export default async function Page({ searchParams }: PageProps) {
  const { data } = await getArqueos(await searchParams)
  const { cambio_dolar } = await getConfiguracionCambioDolar()

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
        <div className="flex flex-col flex-wrap gap-12 sm:flex-row sm:gap-4">
          {data.length <= 0 ? (
            <EmptyList />
          ) : (
            data.map((item) => (
              <Contador
                key={item.id}
                arqueo={item}
                cambio_dolar={cambio_dolar}
              />
            ))
          )}
        </div>
      </PageWrapper>
    </>
  )
}
