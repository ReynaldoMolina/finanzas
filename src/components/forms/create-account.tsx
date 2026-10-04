"use client"

import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { accountSchema } from "@/src/validation/schema"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { ResponsiveDrawer } from "./responsive-drawer"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/src/database/actions/state-message"
import { AccountById } from "@/src/types"
import { createAccount } from "@/src/database/actions/account"
import { useServerActionFeedback } from "@/src/hooks/use-server-status"

interface Account {
  id_grupo: number
  name?: string
}

export function CreateAccountForm({ id_grupo, name }: Account) {
  const formId = "create-account"
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      id_grupo: id_grupo,
      nombre: "",
    },
  })

  const [state, formAction, isPending] = useActionState(
    createAccount,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof accountSchema>) {
    startTransition(() => {
      formAction({ values: values as AccountById })
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
            name="id_grupo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="id_grupo">Id tipo</FieldLabel>
                <Input
                  {...field}
                  id="id_grupo"
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
                <FieldLabel htmlFor="nombre">Nombre de la cuenta</FieldLabel>
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
