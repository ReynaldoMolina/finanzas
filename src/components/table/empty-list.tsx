"use client"

import { useSearchParams } from "next/navigation"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { SearchIcon } from "lucide-react"

export function EmptyList() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search") ?? ""

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle className="text-sm">Sin resultados</EmptyTitle>
        <EmptyDescription>
          {search
            ? `No hay coincidencias para "${search}".`
            : "No hay resultados."}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
