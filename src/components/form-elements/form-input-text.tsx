import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group"
import { ComponentProps } from "react"

interface FormInputText<T extends FieldValues> extends Omit<
  ComponentProps<"input">,
  "name" | "control" | "readOnly"
> {
  control: Control<T>
  name: Path<T>
  label: string
  textAddon?: string
  placeholder?: string
  description?: string
  hideField?: boolean
  readOnly?: boolean
  onChangeExtra?: (value: string | number) => void
}

export function FormInputText<T extends FieldValues>({
  control,
  name,
  label,
  textAddon,
  placeholder,
  description,
  hideField,
  readOnly,
  onChangeExtra,
  ...props
}: FormInputText<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={hideField ? "hidden" : ""}
        >
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <InputGroup>
            {textAddon && (
              <InputGroupAddon>
                <InputGroupText>{textAddon}</InputGroupText>
              </InputGroupAddon>
            )}
            <InputGroupInput
              {...props}
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
              className={readOnly ? "opacity-50" : ""}
            />
          </InputGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
