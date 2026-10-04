"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { groupSchema } from "@/src/validation/schema"
import { FieldGroup } from "../ui/field"
import { toast } from "../ui/toast"
import { ResponsiveDrawer } from "./responsive-drawer"
import { InputText } from "./input-text"
import { startTransition, useActionState } from "react"
import { updateGroup } from "@/src/database/actions/group"
import { stateDefault } from "@/src/database/actions/state-message"
import { GroupById } from "@/src/types"
import { useServerActionFeedback } from "@/src/hooks/use-server-status"

interface Group {
  id: number
  id_tipo: number
  nombre: string
  name?: string
}

export function EditGroupForm({ id, id_tipo, nombre, name }: Group) {
  const formId = "edit-group"
  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      id_tipo: id_tipo,
      nombre: nombre,
    },
  })

  const [state, formAction, isPending] = useActionState(
    updateGroup,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof groupSchema>) {
    startTransition(() => {
      formAction({ id: id, values: values as GroupById })
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
          <InputText form={form} name="id_tipo" label="Id tipo" />
        </FieldGroup>
        <FieldGroup>
          <InputText form={form} name="nombre" label="Nombre del grupo" />
        </FieldGroup>
      </form>
    </ResponsiveDrawer>
  )
}
