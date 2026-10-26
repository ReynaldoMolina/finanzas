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
import { deletePlantilla, updatePlantilla } from "@/database/actions/plantilla"
import { getLabels } from "../transaccion/get-labels"
import { DeleteFormItem } from "@/components/form-elements/form-delete"
import { formDivStyle } from "@/lib/styles"

interface EditPlantillaForm {
  transaccion: PlantillaById
  cuentasOrigen: SelectItemType[]
  cuentasDestino: SelectItemType[]
}

export function EditPlantillaForm({
  transaccion,
  cuentasOrigen,
  cuentasDestino,
}: EditPlantillaForm) {
  const formId = "edit-plantilla"
  const form = useForm<z.infer<typeof plantillaSchema>>({
    resolver: zodResolver(plantillaSchema),
    defaultValues: {
      tipo: transaccion.tipo,
      nombre: transaccion.nombre,
      monto: transaccion.monto,
      id_cuenta_origen: transaccion.id_cuenta_origen,
      id_cuenta_destino: transaccion.id_cuenta_destino,
      descripcion: transaccion.descripcion,
    },
  })

  const [state, formAction, isPending] = useActionState(
    updatePlantilla,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof plantillaSchema>) {
    startTransition(() => {
      formAction({
        id: transaccion.id,
        values: values as PlantillaById,
      })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  const searchParams = useSearchParams()

  const { labelCategoria, labelCuenta } = getLabels(
    (searchParams.get("tipo") as TransaccionTipo) ?? transaccion.tipo
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
          <FieldGroup>
            <DeleteFormItem
              id={transaccion.id}
              handleDelete={deletePlantilla}
            />
          </FieldGroup>
        </FieldSet>
      </form>
      <ResponsiveDrawerFooter formId={formId} isPending={isPending} />
    </>
  )
}
