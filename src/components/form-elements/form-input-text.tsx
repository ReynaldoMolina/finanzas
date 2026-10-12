import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group"

interface FormInputText<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  textAddon?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  hidden?: boolean
  className?: string
  readOnly?: boolean
  required?: boolean
  onChangeExtra?: (value: string | number) => void
}

export function FormInputText<T extends FieldValues>({
  control,
  name,
  label,
  textAddon,
  placeholder,
  description,
  disabled,
  hidden,
  className,
  readOnly,
  required,
  onChangeExtra,
}: FormInputText<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={hidden ? "hidden" : ""}
        >
          <FieldLabel htmlFor={field.name}>
            {label}
            {required && <span className="text-destructive">*</span>}
          </FieldLabel>
          <InputGroup className={className}>
            {textAddon && (
              <InputGroupAddon>
                <InputGroupText>{textAddon}</InputGroupText>
              </InputGroupAddon>
            )}
            <InputGroupInput
              {...field}
              onChange={(e) => {
                const value = e.target.value
                field.onChange(value)
                onChangeExtra?.(value)
              }}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder ? placeholder : label}
              autoComplete="off"
              readOnly={readOnly}
              className={readOnly ? "opacity-50" : ""}
              disabled={disabled}
            />
          </InputGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
