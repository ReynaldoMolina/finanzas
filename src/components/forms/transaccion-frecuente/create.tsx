"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { transaccionFrecuenteSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { SelectItemType, TransaccionFrecuenteById } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawer } from "../../responsive-drawer"
import { TransaccionTipo, transaccionTipos } from "@/lib/tipos"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { FormTextArea } from "@/components/form-elements/form-text-area"
import { useSearchParams } from "next/navigation"
import { FormSelect } from "@/components/form-elements/form-select"
import { useUpdateParams } from "@/hooks/use-update-params"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { createTransaccionFrecuente } from "@/database/actions/transaccion-frecuente"
import { getLabels } from "../transaccion/get-labels"

interface CreateTransaccionFrecuenteForm {
  tipo: TransaccionTipo
  monto?: string
  origen?: string
  destino?: string
  descripcion?: string
  cuentasOrigen: SelectItemType[]
  cuentasDestino: SelectItemType[]
}

export function CreateTransaccionFrecuenteForm({
  tipo,
  monto,
  origen,
  destino,
  descripcion,
  cuentasOrigen,
  cuentasDestino,
}: CreateTransaccionFrecuenteForm) {
  const formId = "create-transaccion-frecuente"
  const form = useForm<z.infer<typeof transaccionFrecuenteSchema>>({
    resolver: zodResolver(transaccionFrecuenteSchema),
    defaultValues: {
      tipo: tipo,
      nombre: "",
      monto: monto ?? "",
      id_cuenta_origen: Number(origen) ?? undefined,
      id_cuenta_destino: Number(destino) ?? undefined,
      descripcion: descripcion ?? "",
    },
  })

  const [state, formAction, isPending] = useActionState(
    createTransaccionFrecuente,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof transaccionFrecuenteSchema>) {
    startTransition(() => {
      formAction({ values: values as TransaccionFrecuenteById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  const searchParams = useSearchParams()

  const { labelCategoria, labelCuenta } = getLabels(
    searchParams.get("tipo") as TransaccionTipo
  )

  const { updateParam } = useUpdateParams()

  return (
    <ResponsiveDrawer
      action="create"
      formId={formId}
      name="transacción frecuente"
      isPending={isPending}
      isOpen={true}
    >
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
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
            <FormInputText
              control={form.control}
              name="monto"
              label="Monto"
              textAddon="C$"
              required
            />
          </FieldGroup>
          <FieldGroup>
            <FormInputText
              control={form.control}
              name="nombre"
              label="Nombre"
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
        </FieldSet>
      </form>
    </ResponsiveDrawer>
  )
}
