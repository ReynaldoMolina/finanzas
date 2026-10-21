import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { SearchInput } from "@/components/search-input"
import { PageProps } from "@/types"
import { DateRangeButtons } from "@/components/date-range-buttons"
import { Suspense } from "react"
import { Loading } from "@/components/loading"
import TransaccionWrapper from "@/components/wrappers/transaccion"
import { PlantillasMenuWrapper } from "@/components/wrappers/transaccion-nueva"

const title = "Transacciones"

export const metadata = {
  title: title,
}

export default async function Page({ searchParams }: PageProps) {
  return (
    <>
      <AppHeader title={title}>
        <PlantillasMenuWrapper />
      </AppHeader>
      <PageWrapper>
        <div className="flex flex-wrap gap-2">
          <div className="flex w-full gap-2 sm:w-fit">
            <SearchInput />
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
