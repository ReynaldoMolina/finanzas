"use client"

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cuentaCategoriaSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { createCuentaCategoria } from "@/database/actions/categoria"
import { stateDefault } from "@/database/actions/state-message"
import { CategoriaById } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawer } from "../../responsive-drawer"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { CuentaTipo } from "@/lib/tipos"

interface CreateCategoriaFormProps {
  tipo?: CuentaTipo
}

export function CreateCategoriaForm({ tipo }: CreateCategoriaFormProps) {
  const formId = "create-categoria"
  const form = useForm<z.infer<typeof cuentaCategoriaSchema>>({
    resolver: zodResolver(cuentaCategoriaSchema),
    defaultValues: {
      tipo: tipo,
      nombre: "",
    },
  })

  const [state, formAction, isPending] = useActionState(
    createCuentaCategoria,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof cuentaCategoriaSchema>) {
    startTransition(() => {
      formAction({ values: values as CategoriaById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  return (
    <ResponsiveDrawer
      action="create"
      formId={formId}
      name="categoría"
      isPending={isPending}
      isOpen={true}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <FormInputText
              control={form.control}
              name="tipo"
              label="Tipo"
              disabled
            />
            <FormInputText
              control={form.control}
              name="nombre"
              label="Nombre "
              required
            />
          </FieldGroup>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
