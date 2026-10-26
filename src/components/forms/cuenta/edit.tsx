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
import { ResponsiveDrawerFooter } from "../../responsive-drawer"
import { SelectUpdateParam } from "@/components/form-elements/select-update-param"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { cuentaTipo } from "@/lib/tipos"
import { FormSwitch } from "@/components/form-elements/form-switch"
import { formDivStyle } from "@/lib/styles"

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
      is_dollar: cuenta.is_dollar,
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
    <>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className={formDivStyle}
      >
        <FieldSet>
          <FieldGroup>
            <SelectUpdateParam
              label="Tipo"
              items={cuentaTipo}
              paramKey="cuenta_tipo"
              initialTipo={cuenta.tipo}
              onChangeExtra={() => {
                form.setValue("id_categoria", "" as unknown as number)
                form.setValue("is_dollar", false)
              }}
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
            />

            <FormSwitch
              control={form.control}
              name="is_dollar"
              label="Cuenta en dólares"
              description="Se mostrará el total en dólares."
              hideField={cuenta.tipo !== "Activo"}
            />
          </FieldGroup>
        </FieldSet>
      </form>
      <ResponsiveDrawerFooter formId={formId} isPending={isPending} />
    </>
  )
}
