"use client"

import { ComponentPropsWithoutRef } from "react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

interface InputTextProps<TFieldValues extends FieldValues> extends Omit<
  ComponentPropsWithoutRef<"input">,
  "name" | "form"
> {
  form: UseFormReturn<TFieldValues>
  name: Path<TFieldValues>
  label: string
}

export function InputText<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  className,
  ...props
}: InputTextProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            {...props}
            id={name}
            aria-invalid={fieldState.invalid}
            value={field.value ?? ""}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
