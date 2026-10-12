import { SelectItemType } from "@/types"
import { FieldValues, Control, Path, Controller } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type FormSelectType<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  items: SelectItemType[]
  description?: string
  disabled?: boolean
  hidden?: boolean
  onChangeExtra?: (value: string | number | null) => void
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  items,
  description,
  disabled = false,
  hidden = false,
  onChangeExtra,
}: FormSelectType<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} hidden={hidden}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value)
              onChangeExtra?.(value)
            }}
            value={field.value != null ? String(field.value) : ""}
          >
            <SelectTrigger disabled={disabled}>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {items.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      )}
    />
  )
}
