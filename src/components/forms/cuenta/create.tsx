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
import { ResponsiveDrawerFooter } from "../../responsive-drawer"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { SelectUpdateParam } from "@/components/form-elements/select-update-param"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { CuentaTipo, cuentaTipo } from "@/lib/tipos"
import { FormSwitch } from "@/components/form-elements/form-switch"
import { formDivStyle } from "@/lib/styles"

interface CreateCuentaFormProps {
  categorias: SelectItemType[]
  cuenta_tipo?: CuentaTipo
}

export function CreateCuentaForm({
  categorias,
  cuenta_tipo,
}: CreateCuentaFormProps) {
  const formId = "create-cuenta"
  const form = useForm<z.infer<typeof cuentaSchema>>({
    resolver: zodResolver(cuentaSchema),
    defaultValues: {
      id_categoria: undefined,
      nombre: "",
      is_dollar: false,
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
              hideField={cuenta_tipo !== "Activo"}
            />
          </FieldGroup>
        </FieldSet>
      </form>
      <ResponsiveDrawerFooter formId={formId} isPending={isPending} />
    </>
  )
}
