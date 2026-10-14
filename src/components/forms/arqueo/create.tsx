"use client"

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { arqueoSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { ArqueoById, SelectItemType } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawer } from "../../responsive-drawer"
import { createArqueo } from "@/database/actions/arqueo"
import { FormComboBox } from "@/components/form-elements/form-combo-box"

interface CreateArqueoForm {
  cuentas: SelectItemType[]
}

export function CreateArqueoForm({ cuentas }: CreateArqueoForm) {
  const formId = "create-arqueo"
  const form = useForm<z.infer<typeof arqueoSchema>>({
    resolver: zodResolver(arqueoSchema),
    defaultValues: {
      id_cuenta: undefined,
    },
  })

  const [state, formAction, isPending] = useActionState(
    createArqueo,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof arqueoSchema>) {
    startTransition(() => {
      formAction({ values: values as ArqueoById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  return (
    <ResponsiveDrawer
      action="create"
      formId={formId}
      name="arqueo"
      isPending={isPending}
      isOpen={true}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <FormComboBox
              control={form.control}
              name="id_cuenta"
              items={cuentas}
              label="Cuenta"
            />
          </FieldGroup>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
