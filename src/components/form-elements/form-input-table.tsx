import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldError } from "../ui/field"
import { Input } from "../ui/input"

interface FormInputText<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  className?: string
}

export function FormInputTable<T extends FieldValues>({
  control,
  name,
  className,
}: FormInputText<T>) {
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
