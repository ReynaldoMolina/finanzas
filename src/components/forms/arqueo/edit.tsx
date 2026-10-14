"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { arqueoSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { ArqueoById, SelectItemType } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawer } from "../../responsive-drawer"
import { deleteArqueo, updateArqueo } from "@/database/actions/arqueo"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { DeleteFormItem } from "@/components/form-elements/form-delete"

interface EditArqueoFormProps {
  arqueo: ArqueoById
  cuentas: SelectItemType[]
}

export function EditArqueoForm({ arqueo, cuentas }: EditArqueoFormProps) {
  const formId = "edit-arqueo"
  const form = useForm<z.infer<typeof arqueoSchema>>({
    resolver: zodResolver(arqueoSchema),
    defaultValues: {
      id_cuenta: arqueo.id_cuenta,
    },
  })

  const [state, formAction, isPending] = useActionState(
    updateArqueo,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof arqueoSchema>) {
    startTransition(() => {
      formAction({ id: arqueo.id, values: values as ArqueoById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  return (
    <ResponsiveDrawer
      action="edit"
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
          <FieldGroup>
            <DeleteFormItem
              id={arqueo.id}
              title="arqueo"
              handleDelete={deleteArqueo}
            />
          </FieldGroup>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
