import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { SearchInput } from "@/components/search-input"
import { PageProps } from "@/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Loading } from "@/components/loading"
import { Suspense } from "react"
import TransaccionFrecuenteWrapper from "@/components/wrappers/transaccion-frecuente"

const title = "Transacciones frecuentes"

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

          <Link href="/transaccion-frecuente/crear">
            <Button>
              <PlusIcon />
              <span className="hidden xs:block">Nuevo</span>
            </Button>
          </Link>
        </div>
        <Suspense fallback={<Loading />}>
          <TransaccionFrecuenteWrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
