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
import { ResponsiveDrawer } from "../../responsive-drawer"
import { TransaccionTipo, transaccionTipos } from "@/lib/tipos"
import {
  deleteTransaccion,
  updateTransaccion,
} from "@/database/actions/transaccion"
import { FormDatePicker } from "@/components/form-elements/form-date-picker"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { FormTextArea } from "@/components/form-elements/form-text-area"
import { getLabels } from "./get-labels"
import { useSearchParams } from "next/navigation"
import { FormSelect } from "@/components/form-elements/form-select"
import { useUpdateParams } from "@/hooks/use-update-params"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { DeleteFormItem } from "@/components/form-elements/form-delete"

interface EditTransaccionForm {
  transaccion: TransaccionById
  cuentasOrigen: SelectItemType[]
  cuentasDestino: SelectItemType[]
}

export function EditTransaccionForm({
  transaccion,
  cuentasOrigen,
  cuentasDestino,
}: EditTransaccionForm) {
  const formId = "edit-transaccion"
  const form = useForm<z.infer<typeof transaccionSchema>>({
    resolver: zodResolver(transaccionSchema),
    defaultValues: {
      tipo: transaccion.tipo,
      fecha: transaccion.fecha,
      monto: transaccion.monto,
      id_cuenta_origen: transaccion.id_cuenta_origen,
      id_cuenta_destino: transaccion.id_cuenta_destino,
      descripcion: transaccion.descripcion,
    },
  })

  const [state, formAction, isPending] = useActionState(
    updateTransaccion,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof transaccionSchema>) {
    startTransition(() => {
      formAction({ id: transaccion.id, values: values as TransaccionById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  const searchParams = useSearchParams()

  const { labelCategoria, labelCuenta } = getLabels(
    (searchParams.get("tipo") as TransaccionTipo) ?? transaccion.tipo
  )

  const { updateParams } = useUpdateParams()

  return (
    <ResponsiveDrawer
      action="edit"
      formId={formId}
      name="transacción"
      isPending={isPending}
      isOpen={true}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
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
              required
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
          <FieldGroup>
            <DeleteFormItem
              id={transaccion.id}
              handleDelete={deleteTransaccion}
            />
          </FieldGroup>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
