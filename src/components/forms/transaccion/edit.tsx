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
import { updateTransaccion } from "@/database/actions/transaccion"
import { FormDatePicker } from "@/components/form-elements/form-date-picker"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { FormTextArea } from "@/components/form-elements/form-text-area"
import { getLabels } from "./get-labels"
import { useSearchParams } from "next/navigation"
import { FormSelect } from "@/components/form-elements/form-select"
import { useUpdateParams } from "@/hooks/use-update-params"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  const { updateParam } = useUpdateParams()

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
          <FieldGroup className="flex flex-row">
            <FormSelect
              control={form.control}
              name="tipo"
              label="Tipo"
              items={transaccionTipos}
              onChangeExtra={(value) => {
                updateParam({
                  paramKey: "tipo",
                  newValue: value != null ? String(value) : null,
                })
                form.setValue("id_cuenta_origen", "" as unknown as number)
              }}
            />
            <FormDatePicker control={form.control} name="fecha" label="Fecha" />
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
            <Item variant="outline">
              <ItemMedia variant="icon">
                <TrashIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Borrar</ItemTitle>
                <ItemDescription>Borrar el registro</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="destructive">
                  Borrar
                </Button>
              </ItemActions>
            </Item>
          </FieldGroup>
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
