import { SearchInput } from "@/components/search-input"
import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { PageProps } from "@/types"
import { DateRangeButtons } from "@/components/date-range-buttons"
import { Suspense } from "react"
import CuentaWrapper from "@/components/wrappers/cuenta"
import { Loading } from "@/components/loading"

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
          <SearchInput />
          <DateRangeButtons searchParams={await searchParams} />
        </div>

        <Suspense fallback={<Loading />}>
          <CuentaWrapper searchParams={await searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
