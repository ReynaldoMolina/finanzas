"use client"

import { useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { SelectItemType } from "@/types"
import { useUpdateParams } from "@/hooks/use-update-params"
import { Field, FieldLabel } from "../ui/field"

interface SelectUpdateParamProps {
  label: string
  items: SelectItemType[]
  initialTipo?: string
  paramKey: string
  disabled?: boolean
  onChangeExtra?: (value: string | number | null) => void
}

export function SelectUpdateParam({
  label,
  items,
  initialTipo,
  paramKey,
  disabled,
  onChangeExtra,
}: SelectUpdateParamProps) {
  const searchParams = useSearchParams()
  const { updateParam } = useUpdateParams()
  const currentValue = searchParams.get(paramKey) ?? initialTipo ?? ""

  function handleSelectChange(newValue: string | null) {
    updateParam({ newValue, paramKey: paramKey })
    onChangeExtra?.(newValue)
  }

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>

      <Select
        value={currentValue}
        onValueChange={handleSelectChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Selecciona una opción" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}
