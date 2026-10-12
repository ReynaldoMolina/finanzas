import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

interface FormInput<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  description?: string
  disabled?: boolean
}

export function FormTextArea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  disabled,
}: FormInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Textarea
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder ? placeholder : label}
            autoComplete="off"
            className="field-sizing-content"
            disabled={disabled}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
