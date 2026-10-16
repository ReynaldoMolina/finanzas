import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useState } from "react"
import { Button } from "../ui/button"
import { dateIsoToDate, dateToIso, formatDate } from "@/lib/formatters"
import { ChevronDown } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { es } from "date-fns/locale"

interface FormDatePicker<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  description?: string
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: FormDatePicker<T>) {
  const [open, setOpen] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  id={field.name}
                  className="w-full justify-between font-normal"
                >
                  {field.value ? formatDate(field.value) : "Seleccionar fecha"}
                  <ChevronDown className="text-muted-foreground" />
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateIsoToDate(field.value)}
                onSelect={(date) => {
                  field.onChange(date ? dateToIso(date) : undefined)
                  setOpen(false)
                }}
                captionLayout="dropdown"
                locale={es}
              />
            </PopoverContent>
          </Popover>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
