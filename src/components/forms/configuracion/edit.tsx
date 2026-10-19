"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { configuracionSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { Configuracion, SelectItemType } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { updateConfiguracion } from "@/database/actions/configuracion"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface EditConfiguracionFormProps {
  configuracion: Configuracion
  cuentas: SelectItemType[]
}

export function EditConfiguracionForm({
  configuracion,
  cuentas,
}: EditConfiguracionFormProps) {
  const formId = "edit-configuracion"
  const form = useForm<z.infer<typeof configuracionSchema>>({
    resolver: zodResolver(configuracionSchema),
    defaultValues: {
      cambio_dolar: configuracion.cambio_dolar,
      id_categoria_efectivo: configuracion.id_categoria_efectivo,
    },
  })

  const [state, formAction, isPending] = useActionState(
    updateConfiguracion,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof configuracionSchema>) {
    startTransition(() => {
      formAction({ values: values as Configuracion })
    })
  }

  useServerActionFeedback(state, { refresh: true })

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5 border p-3"
    >
      <FieldSet>
        <FieldGroup>
          <FormInputText
            control={form.control}
            name="cambio_dolar"
            label="Cambio de dólar"
            description="Se usa para calcular "
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
        Guardar configuración
      </Button>
    </form>
  )
}
