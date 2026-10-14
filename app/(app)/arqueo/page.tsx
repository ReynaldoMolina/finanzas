import { SearchInput } from "@/components/data-actions/search-input"
import { Contador } from "@/components/forms/contador/contador"
import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import { getArqueos } from "@/database/get-data/arqueo"
import { getConfiguracionCambioDolar } from "@/database/get-data/configuracion"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

const title = "Arqueos"

export const metadata = {
  title: title,
}

export default async function Page() {
  const { data } = await getArqueos()
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
              <span className="hidden sm:block">Nuevo</span>
            </Button>
          </Link>
        </div>
        <div className="flex flex-col flex-wrap gap-12 sm:flex-row sm:gap-4">
          {data.map((item) => (
            <Contador key={item.id} arqueo={item} cambio_dolar={cambio_dolar} />
          ))}
        </div>
      </PageWrapper>
    </>
  )
}
