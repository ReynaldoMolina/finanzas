"use client"

import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cuentaSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { CuentaById, SelectItemType } from "@/types"
import { createCuenta } from "@/database/actions/cuenta"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawer } from "../../responsive-drawer"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { SelectUpdateParam } from "@/components/form-elements/select-update-param"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { cuentaTipo } from "@/lib/tipos"

interface CreateCuentaFormProps {
  categorias: SelectItemType[]
  // tipo?: CuentaTipo
  // id_categoria?: string
}

export function CreateCuentaForm({ categorias }: CreateCuentaFormProps) {
  const formId = "create-cuenta"
  const form = useForm<z.infer<typeof cuentaSchema>>({
    resolver: zodResolver(cuentaSchema),
    defaultValues: {
      id_categoria: undefined,
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
            <SelectUpdateParam
              label="Tipo"
              items={cuentaTipo}
              paramKey="cuenta_tipo"
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
            />
          </FieldGroup>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
