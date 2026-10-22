import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { SelectItemType } from "@/types"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"

interface FormComboBoxProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  items: SelectItemType[]
  label: string
  description?: string
  disabled?: boolean
  placeholder?: string
}

export function FormComboBox<T extends FieldValues>({
  control,
  name,
  items,
  label,
  description,
  disabled = false,
  placeholder,
}: FormComboBoxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected =
          items.find((item) => item.value === String(field.value)) ?? null

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Combobox
              items={items}
              value={selected}
              onValueChange={field.onChange}
              autoHighlight
            >
              <ComboboxInput
                aria-invalid={fieldState.invalid}
                placeholder={placeholder ? placeholder : label}
                disabled={disabled}
                showClear
              />
              <ComboboxContent>
                <ComboboxEmpty>No hay resultados.</ComboboxEmpty>
                <ComboboxList>
                  {(item: SelectItemType) => (
                    <ComboboxItem
                      key={String(item.value)}
                      value={String(item.value)}
                    >
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
