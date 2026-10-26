import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { SearchInput } from "@/components/search-input"
import { PageProps } from "@/types"
import { DateRangeButtons } from "@/components/date-range-buttons"
import { Suspense } from "react"
import TransaccionWrapper from "@/components/wrappers/transaccion"
import { PlantillasMenuWrapper } from "@/components/wrappers/transaccion-nueva"
import { TransaccionFilter } from "@/components/transaccion-filter"
import { Loading } from "@/components/loading"

const title = "Transacciones"

export const metadata = { title }

export default async function Page({ searchParams }: PageProps) {
  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <div className="flex flex-wrap gap-2">
          <SearchInput>
            <TransaccionFilter />
            <PlantillasMenuWrapper />
          </SearchInput>
          <DateRangeButtons searchParams={await searchParams} />
        </div>

        <Suspense fallback={<Loading />}>
          <TransaccionWrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
