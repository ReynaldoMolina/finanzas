"use client"

import { useUpdateParams } from "@/hooks/use-update-params"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { ITEMS_PER_PAGE } from "@/database/get-data/items-per-page"
import { ReadonlyURLSearchParams } from "next/navigation"

interface FilterLimitProps {
  searchParams: ReadonlyURLSearchParams
  totalPages: number
}

export function FilterLimit({ searchParams, totalPages }: FilterLimitProps) {
  const limitParam = searchParams.get("limit")

  const { updateParams } = useUpdateParams()
  const options = [20, 50, 100]

  function handleChange(newLimit: string | null) {
    if (newLimit === null) return
    updateParams({
      limit: Number(newLimit) === ITEMS_PER_PAGE ? null : newLimit,
    })
  }

  return (
    <Select
      value={limitParam}
      onValueChange={handleChange}
      defaultValue="20"
      disabled={totalPages <= 1}
    >
      <SelectTrigger size="sm" className="text-xs">
        <SelectValue placeholder="Seleccionar" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Por página</SelectLabel>
          {options.map((value) => (
            <SelectItem key={value} value={String(value)} className="text-xs">
              {value === 1 ? "Todo" : value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
