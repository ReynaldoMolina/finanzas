import { Control, Controller, FieldValues, Path } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { Switch } from "../ui/switch"

interface FormSwitch<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  description?: string
  hideField?: boolean
}

export function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
  hideField,
}: FormSwitch<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FieldLabel htmlFor={field.name} className={hideField ? "hidden" : ""}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{label}</FieldTitle>
              <FieldDescription>{description}</FieldDescription>
            </FieldContent>
            <Switch
              id={field.name}
              name={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-invalid={fieldState.invalid}
            />
          </Field>
        </FieldLabel>
      )}
    />
  )
}
