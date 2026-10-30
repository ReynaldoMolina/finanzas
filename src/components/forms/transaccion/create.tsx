"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { transaccionSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { SelectItemType, TransaccionById } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawerFooter } from "../../responsive-drawer"
import { TransaccionTipo, transaccionTipos } from "@/lib/tipos"
import { createTransaccion } from "@/database/actions/transaccion"
import { FormDatePicker } from "@/components/form-elements/form-date-picker"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { FormTextArea } from "@/components/form-elements/form-text-area"
import { getLabels } from "./get-labels"
import { useSearchParams } from "next/navigation"
import { FormSelect } from "@/components/form-elements/form-select"
import { useUpdateParams } from "@/hooks/use-update-params"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { dateToIso } from "@/lib/formatters"
import { formDivStyle } from "@/lib/styles"

interface CreateTransaccionForm {
  tipo: TransaccionTipo
  monto?: string
  origen?: string
  destino?: string
  descripcion?: string
  cuentasOrigen: SelectItemType[]
  cuentasDestino: SelectItemType[]
}

export function CreateTransaccionForm({
  tipo,
  monto,
  origen,
  destino,
  descripcion,
  cuentasOrigen,
  cuentasDestino,
}: CreateTransaccionForm) {
  const formId = "create-transaccion"
  const form = useForm<z.infer<typeof transaccionSchema>>({
    resolver: zodResolver(transaccionSchema),
    defaultValues: {
      tipo: tipo,
      fecha: dateToIso(new Date()),
      monto: monto ?? "",
      id_cuenta_origen: Number(origen) ?? undefined,
      id_cuenta_destino: Number(destino) ?? undefined,
      descripcion: descripcion ?? "",
    },
  })

  const [state, formAction, isPending] = useActionState(
    createTransaccion,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof transaccionSchema>) {
    startTransition(() => {
      formAction({ values: values as TransaccionById })
    })
  }

  useServerActionFeedback(state, {
    refresh: true,
    back: true,
  })

  const searchParams = useSearchParams()

  const { labelCategoria, labelCuenta } = getLabels(
    searchParams.get("tipo") as TransaccionTipo
  )

  const { updateParams } = useUpdateParams()

  return (
    <>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className={formDivStyle}
      >
        <FieldSet>
          <FieldGroup className="flex-row">
            <FormDatePicker control={form.control} name="fecha" label="Fecha" />
            <FormSelect
              control={form.control}
              name="tipo"
              label="Tipo"
              items={transaccionTipos}
              onChangeExtra={(value) => {
                updateParams({
                  tipo: value != null ? String(value) : null,
                })
                form.setValue("id_cuenta_origen", "" as unknown as number)
              }}
            />
          </FieldGroup>
          <FieldGroup>
            <FormInputText
              control={form.control}
              name="monto"
              label="Monto"
              textAddon="C$"
              inputMode="numeric"
            />

            <FormComboBox
              control={form.control}
              name="id_cuenta_origen"
              items={cuentasOrigen}
              label={labelCategoria}
            />

            <FormComboBox
              control={form.control}
              name="id_cuenta_destino"
              items={cuentasDestino}
              label={labelCuenta}
            />

            <FormTextArea
              control={form.control}
              name="descripcion"
              label="Descripción"
            />
          </FieldGroup>
        </FieldSet>
      </form>
      <ResponsiveDrawerFooter formId={formId} isPending={isPending} />
    </>
  )
}
