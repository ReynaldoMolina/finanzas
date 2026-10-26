"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { plantillaSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { SelectItemType, PlantillaById } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import {
  ResponsiveDrawer,
  ResponsiveDrawerFooter,
} from "../../responsive-drawer"
import { TransaccionTipo, transaccionTipos } from "@/lib/tipos"
import { FormInputText } from "@/components/form-elements/form-input-text"
import { FormTextArea } from "@/components/form-elements/form-text-area"
import { useSearchParams } from "next/navigation"
import { FormSelect } from "@/components/form-elements/form-select"
import { useUpdateParams } from "@/hooks/use-update-params"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { createPlantilla } from "@/database/actions/plantilla"
import { getLabels } from "../transaccion/get-labels"
import { formDivStyle } from "@/lib/styles"

interface CreatePlantillaForm {
  tipo: TransaccionTipo
  monto?: string
  origen?: string
  destino?: string
  descripcion?: string
  cuentasOrigen: SelectItemType[]
  cuentasDestino: SelectItemType[]
}

export function CreatePlantillaForm({
  tipo,
  monto,
  origen,
  destino,
  descripcion,
  cuentasOrigen,
  cuentasDestino,
}: CreatePlantillaForm) {
  const formId = "create-plantilla"
  const form = useForm<z.infer<typeof plantillaSchema>>({
    resolver: zodResolver(plantillaSchema),
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
    createPlantilla,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof plantillaSchema>) {
    startTransition(() => {
      formAction({ values: values as PlantillaById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

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
          <FieldGroup>
            <FormInputText
              control={form.control}
              name="nombre"
              label="Nombre"
            />
          </FieldGroup>
          <FieldGroup className="flex-row">
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
            <FormInputText
              control={form.control}
              name="monto"
              label="Monto"
              textAddon="C$"
              inputMode="numeric"
            />
          </FieldGroup>
          <FieldGroup>
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
