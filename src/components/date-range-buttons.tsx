"use client"

import {
  getCurrentMonth,
  lastMonth,
  thisMonth,
  thisWeek,
  thisYear,
  today,
} from "@/lib/get-date"
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
  const { start: startParam, end: endParam } = getSearchParams(searchParams)
  const { firstDay, lastDay } = getCurrentMonth()

  let start = startParam ?? firstDay
  let end = endParam ?? lastDay

  const rangeOptions = [
    { value: "1", label: "Mes", range: thisMonth() },
    { value: "2", label: "Semana", range: thisWeek() },
    { value: "3", label: "Hoy", range: today() },
    { value: "4", label: "Mes pasado", range: lastMonth() },
    { value: "5", label: "Año", range: thisYear() },
  ]

  function isActive(start?: string, end?: string, a?: string, b?: string) {
    return start === a && end === b
  }

  // Check if none of the predefined options match the current dates
  const isCustomActive = !rangeOptions.some(({ range }) =>
    isActive(start, end, range.start, range.end)
  )

  return (
    <ToggleGroup variant="outline" className="overflow-auto">
      {rangeOptions.map(({ value, label, range }) => {
        const active = isActive(start, end, range.start, range.end)

        return (
          <ToggleGroupItem
            key={value}
            value={value}
            className={cn(active && "bg-muted dark:bg-muted")}
            onClick={() => updateParams({ start: range.start, end: range.end })}
          >
            {label}
          </ToggleGroupItem>
        )
      })}

      <DateSelector searchParams={searchParams} active={isCustomActive} />
    </ToggleGroup>
  )
}
