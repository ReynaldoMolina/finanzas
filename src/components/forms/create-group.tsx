"use client"

import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { groupSchema } from "@/src/validation/schema"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { ResponsiveDrawer } from "./responsive-drawer"
import { startTransition, useActionState } from "react"
import { createGroup } from "@/src/database/actions/group"
import { stateDefault } from "@/src/database/actions/state-message"
import { GroupById } from "@/src/types"
import { useServerActionFeedback } from "@/src/hooks/use-server-status"

interface Group {
  id_tipo: number
  name: string
}

export function CreateGroupForm({ id_tipo, name }: Group) {
  const formId = "create-group"
  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      id_tipo: id_tipo,
      nombre: "",
    },
  })

  const [state, formAction, isPending] = useActionState(
    createGroup,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof groupSchema>) {
    startTransition(() => {
      formAction({ values: values as GroupById })
    })
  }

  useServerActionFeedback(state, { refresh: true })

  return (
    <ResponsiveDrawer
      action="create"
      formId={formId}
      name={name}
      isPending={isPending}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup hidden>
          <Controller
            name="id_tipo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="id_tipo">Id tipo</FieldLabel>
                <Input
                  {...field}
                  id="id_tipo"
                  aria-invalid={fieldState.invalid}
                  hidden
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="nombre"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="nombre">Nombre del grupo</FieldLabel>
                <Input
                  {...field}
                  id="nombre"
                  aria-invalid={fieldState.invalid}
                  placeholder="Nombre"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </ResponsiveDrawer>
  )
}
