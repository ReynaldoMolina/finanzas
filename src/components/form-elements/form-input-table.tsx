import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldError } from "../ui/field"
import { Input } from "../ui/input"
import { ContadorInput, ContadorOutput } from "@/validation/schema"

interface FormInputText {
  control: Control<ContadorInput, unknown, ContadorOutput>
  name: Path<ContadorInput>
  className?: string
}

export function FormInputTable({ control, name, className }: FormInputText) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Input
            type="text"
            inputMode="numeric"
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
            id={field.name}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            className={className}
          />
          {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
        </Field>
      )}
    />
  )
}
