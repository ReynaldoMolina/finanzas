"use client"

import {
  getCurrentMonth,
  lastMonth,
  thisMonth,
  thisWeek,
  thisYear,
  today,
} from "@/lib/get-date"
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
  const { from, to } = getSearchParams(searchParams)

  const rangeOptions = [
    { value: "1", label: "Mes", range: { from: undefined, to: undefined } },
    { value: "2", label: "Semana", range: thisWeek() },
    { value: "3", label: "Hoy", range: today() },
    { value: "4", label: "Mes pasado", range: lastMonth() },
    { value: "5", label: "Año", range: thisYear() },
  ]

  function isActive(from?: string, to?: string, a?: string, b?: string) {
    return from === a && to === b
  }

  const currentOption = rangeOptions.find(({ range }) =>
    isActive(from, to, range.from, range.to)
  )
  const groupValue = currentOption ? [currentOption.value] : ["6"]

  return (
    <ToggleGroup variant="outline" className="overflow-auto" value={groupValue}>
      {rangeOptions.map(({ value, label, range }) => {
        return (
          <ToggleGroupItem
            key={value}
            value={value}
            onClick={() =>
              updateParams({ from: range.from, to: range.to, page: null })
            }
          >
            {label}
          </ToggleGroupItem>
        )
      })}

      <DateSelector searchParams={searchParams} />
    </ToggleGroup>
  )
}
