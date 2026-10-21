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

  const currentOption = rangeOptions.find(({ range }) =>
    isActive(start, end, range.start, range.end)
  )
  const groupValue = currentOption ? [currentOption.value] : ["6"]

  return (
    <ToggleGroup variant="outline" className="overflow-auto" value={groupValue}>
      {rangeOptions.map(({ value, label, range }) => {
        const active = isActive(start, end, range.start, range.end)

        return (
          <ToggleGroupItem
            key={value}
            value={value}
            onClick={() => updateParams({ start: range.start, end: range.end })}
          >
            {label}
          </ToggleGroupItem>
        )
      })}

      <DateSelector searchParams={searchParams} />
    </ToggleGroup>
  )
}
