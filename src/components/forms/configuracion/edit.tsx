"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { ajustesSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { Ajustes, SelectItemType } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { updateAjustes } from "@/database/actions/ajustes"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface EditAjustesFormProps {
  ajustes: Ajustes
  cuentas: SelectItemType[]
}

export function EditAjustesForm({ ajustes, cuentas }: EditAjustesFormProps) {
  const formId = "edit-ajustes"
  const form = useForm<z.infer<typeof ajustesSchema>>({
    resolver: zodResolver(ajustesSchema),
    defaultValues: {
      cambio_dolar: ajustes.cambio_dolar,
      id_categoria_efectivo: ajustes.id_categoria_efectivo,
    },
  })

  const [state, formAction, isPending] = useActionState(
    updateAjustes,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof ajustesSchema>) {
    startTransition(() => {
      formAction({ values: values as Ajustes })
    })
  }

  useServerActionFeedback(state, { refresh: true })

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5 p-2"
    >
      <FieldSet>
        <FieldGroup>
          <FormInputText
            control={form.control}
            name="cambio_dolar"
            label="Cambio de dólar"
          />
          <FormComboBox
            control={form.control}
            name="id_categoria_efectivo"
            label="Cuenta de efectivo"
            items={cuentas}
          />
        </FieldGroup>
      </FieldSet>
      <Button type="submit" form={formId}>
        {isPending && <Spinner />}
        Guardar
      </Button>
    </form>
  )
}
