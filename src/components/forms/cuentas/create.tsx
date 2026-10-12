"use client"

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cuentaSchema } from "@/validation/schema"
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { CuentaById, SelectItemType } from "@/types"
import { createCuenta } from "@/database/actions/cuenta"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawer } from "../../responsive-drawer"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { Input } from "@/components/ui/input"

interface CreateCuentaFormProps {
  categorias: SelectItemType[]
  tipo?: string
  id_categoria?: string
}

export function CreateCuentaForm({
  categorias,
  id_categoria,
  tipo,
}: CreateCuentaFormProps) {
  const formId = "create-account"
  const form = useForm<z.infer<typeof cuentaSchema>>({
    resolver: zodResolver(cuentaSchema),
    defaultValues: {
      id_categoria: Number(id_categoria),
      nombre: "",
    },
  })

  const [state, formAction, isPending] = useActionState(
    createCuenta,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof cuentaSchema>) {
    startTransition(() => {
      formAction({ values: values as CuentaById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  const categoria = categorias.find((item) => item.value === id_categoria)

  return (
    <ResponsiveDrawer
      action="create"
      formId={formId}
      name="cuenta"
      isPending={isPending}
      isOpen={true}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Tipo</FieldLabel>
              <Input value={tipo} disabled />
            </Field>

            <Field>
              <FieldLabel>Categoría</FieldLabel>
              <Input value={categoria?.label} disabled />
            </Field>

            <FormInputText
              control={form.control}
              name="nombre"
              label="Nombre"
              required
            />
          </FieldGroup>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
