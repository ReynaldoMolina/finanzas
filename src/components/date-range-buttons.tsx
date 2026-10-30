"use client"

import {
  lastMonth,
  lastWeek,
  thisWeek,
  thisYear,
  today,
  yesterday,
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
    { label: "Mes", range: { from: undefined, to: undefined } },
    { label: "Semana", range: thisWeek() },
    { label: "Hoy", range: today() },
    { label: "Mes pasado", range: lastMonth() },
    { label: "Sem. pasada", range: lastWeek() },
    { label: "Ayer", range: yesterday() },
    { label: "Año", range: thisYear() },
  ]

  function isActive(from?: string, to?: string, a?: string, b?: string) {
    return from === a && to === b
  }

  const currentOption = rangeOptions.find(({ range }) =>
    isActive(from, to, range.from, range.to)
  )
  const groupValue = currentOption ? [currentOption.label] : ["Rango"]

  return (
    <ToggleGroup variant="outline" className="overflow-auto" value={groupValue}>
      <DateSelector
        searchParams={searchParams}
        isActive={groupValue[0] === "Rango"}
      />
      {rangeOptions.map(({ label, range }) => {
        return (
          <ToggleGroupItem
            key={label}
            value={label}
            onClick={() =>
              updateParams({ from: range.from, to: range.to, page: null })
            }
            className="text-xs"
          >
            {label}
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}
