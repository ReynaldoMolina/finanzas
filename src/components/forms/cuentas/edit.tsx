"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { cuentaSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { updateCuenta } from "@/database/actions/cuenta"
import { CuentaById, SelectItemType } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawer } from "../../responsive-drawer"
import { SelectUpdateParam } from "@/components/form-elements/select-update-param"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { cuentaTipo } from "@/lib/tipos"

interface EditCuentaForm {
  cuenta: CuentaById
  categorias: SelectItemType[]
}

export function EditCuentaForm({ cuenta, categorias }: EditCuentaForm) {
  const formId = "edit-cuenta"
  const form = useForm<z.infer<typeof cuentaSchema>>({
    resolver: zodResolver(cuentaSchema),
    defaultValues: {
      id_categoria: cuenta.id_categoria,
      nombre: cuenta.nombre,
    },
  })

  const [state, formAction, isPending] = useActionState(
    updateCuenta,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof cuentaSchema>) {
    startTransition(() => {
      formAction({ id: cuenta.id, values: values as CuentaById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  return (
    <ResponsiveDrawer
      action="edit"
      formId={formId}
      name="cuenta"
      isPending={isPending}
      isOpen={true}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <SelectUpdateParam
              label="Tipo"
              items={cuentaTipo}
              paramKey="cuenta_tipo"
              initialTipo={cuenta.tipo}
              onChangeExtra={() =>
                form.setValue("id_categoria", "" as unknown as number)
              }
            />

            <FormComboBox
              control={form.control}
              name="id_categoria"
              items={categorias}
              label="Categoría"
            />

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
