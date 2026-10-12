"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { cuentaCategoriaSchema } from "@/validation/schema"
import { FieldGroup } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { updateCuentaCategoria } from "@/database/actions/categoria"
import { stateDefault } from "@/database/actions/state-message"
import { CategoriaById } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawer } from "../../responsive-drawer"
import { FormSelect } from "@/components/form-elements/form-select"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { cuentaTipos } from "@/lib/tipos"

interface EditCategoriaFormProps {
  categoria: CategoriaById
}

export function EditCategoriaForm({ categoria }: EditCategoriaFormProps) {
  const formId = "edit-categoria"
  const form = useForm<z.infer<typeof cuentaCategoriaSchema>>({
    resolver: zodResolver(cuentaCategoriaSchema),
    defaultValues: {
      tipo: categoria.tipo,
      nombre: categoria.nombre,
    },
  })

  const [state, formAction, isPending] = useActionState(
    updateCuentaCategoria,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof cuentaCategoriaSchema>) {
    startTransition(() => {
      formAction({ id: categoria.id, values: values as CategoriaById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  return (
    <ResponsiveDrawer
      action="edit"
      formId={formId}
      name="categoría"
      isPending={isPending}
      isOpen={true}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormSelect
            control={form.control}
            name="tipo"
            label="Tipo"
            items={cuentaTipos}
          />
          <FormInputText
            control={form.control}
            name="nombre"
            label="Nombre"
            required
          />
        </FieldGroup>
      </form>
    </ResponsiveDrawer>
  )
}
