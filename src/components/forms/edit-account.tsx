"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { accountSchema } from "@/src/validation/schema"
import { FieldGroup } from "../ui/field"
import { ResponsiveDrawer } from "./responsive-drawer"
import { InputText } from "./input-text"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/src/database/actions/state-message"
import { updateAccount } from "@/src/database/actions/account"
import { AccountById } from "@/src/types"
import { useServerActionFeedback } from "@/src/hooks/use-server-status"

interface Account {
  id: number
  id_grupo: number
  nombre: string
  name?: string
}

export function EditAccountForm({ id, id_grupo, nombre, name }: Account) {
  const formId = "edit-group"
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      id_grupo: id_grupo,
      nombre: nombre,
    },
  })

  const [state, formAction, isPending] = useActionState(
    updateAccount,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof accountSchema>) {
    startTransition(() => {
      formAction({ id: id, values: values as AccountById })
    })
  }

  useServerActionFeedback(state, { refresh: true })

  return (
    <ResponsiveDrawer
      action="edit"
      formId={formId}
      name={name}
      isPending={isPending}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup hidden>
          <InputText form={form} name="id_grupo" label="Id grupo" />
        </FieldGroup>
        <FieldGroup>
          <InputText form={form} name="nombre" label="Nombre de la cuenta" />
        </FieldGroup>
      </form>
    </ResponsiveDrawer>
  )
}
