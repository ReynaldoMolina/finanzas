"use client"

import { lastMonth, thisMonth, thisWeek, today } from "@/lib/get-date"
import { cn } from "@/lib/utils"
import { SearchParamsProps } from "@/types"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { getSearchParams } from "@/database/get-data/get-search-params"
import { useUpdateParams } from "@/hooks/use-update-params"
import { DateSelector } from "./date-selector"

export function DateRangeButtons({
  searchParams,
}: {
  searchParams: SearchParamsProps
}) {
  const { updateParams } = useUpdateParams()
  const { start, end } = getSearchParams(searchParams)

  function applyRange(start: string, end: string) {
    updateParams({ start, end })
  }

  const rangeOptions = [
    { value: "1", label: "Mes", range: thisMonth() },
    { value: "2", label: "Semana", range: thisWeek() },
    { value: "3", label: "Hoy", range: today() },
    { value: "4", label: "Mes pasado", range: lastMonth() },
  ]

  function isActive(start?: string, end?: string, a?: string, b?: string) {
    return start === a && end === b
  }

  return (
    <ToggleGroup variant="outline" className="overflow-auto">
      {rangeOptions.map(({ value, label, range }) => {
        const active = isActive(start, end, range.start, range.end)

        return (
          <ToggleGroupItem
            key={value}
            value={value}
            className={cn(active && "bg-muted dark:bg-muted")}
            onClick={() => applyRange(range.start, range.end)}
          >
            {label}
          </ToggleGroupItem>
        )
      })}

      <DateSelector searchParams={searchParams} />
    </ToggleGroup>
  )
}
