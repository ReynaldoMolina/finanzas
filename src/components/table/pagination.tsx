"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Button } from "../ui/button"
import { FilterLimit } from "./filter-limit"
import { LinkButton } from "../link-button"
import { ButtonGroup } from "../ui/button-group"

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 0) return

  const currentPage = Number(searchParams.get("page")) || 1

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="flex min-h-8 flex-wrap items-center justify-center gap-1 overflow-auto">
      <span className="text-sm text-muted-foreground">{`${currentPage} de ${totalPages}`}</span>
      <div className="inline-flex gap-1">
        <PaginationArrow
          direction="left last"
          href={createPageURL(1)}
          disabled={currentPage <= 1}
        />
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          disabled={currentPage <= 1}
        />

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          disabled={currentPage >= totalPages}
        />
        <PaginationArrow
          direction="right last"
          href={createPageURL(totalPages)}
          disabled={currentPage >= totalPages}
        />
      </div>
      <FilterLimit searchParams={searchParams} totalPages={totalPages} />
    </div>
  )
}

interface PaginationArrow {
  href: string
  direction: "left" | "right" | "left last" | "right last"
  disabled?: boolean
}

function PaginationArrow({ href, direction, disabled }: PaginationArrow) {
  const directionMap = {
    left: <ChevronLeft />,
    "left last": <ChevronsLeft />,
    right: <ChevronRight />,
    "right last": <ChevronsRight />,
  }

  if (disabled)
    return (
      <Button type="button" variant="outline" size="icon" disabled>
        {directionMap[direction]}
      </Button>
    )

  return (
    <LinkButton href={href} variant="outline" size="icon">
      {directionMap[direction]}
    </LinkButton>
  )
}
