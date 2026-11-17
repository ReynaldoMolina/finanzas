"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { arqueoSchema } from "@/validation/schema"
import { FieldGroup, FieldSet } from "../../ui/field"
import { startTransition, useActionState } from "react"
import { stateDefault } from "@/database/actions/state-message"
import { ArqueoById, SelectItemType } from "@/types"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { ResponsiveDrawerFooter } from "../../responsive-drawer"
import { deleteArqueo, updateArqueo } from "@/database/actions/arqueo"
import { FormComboBox } from "@/components/form-elements/form-combo-box"
import { DeleteFormItem } from "@/components/form-elements/form-delete"
import { formDivStyle } from "@/lib/styles"
import { evaluarSuma } from "@/lib/evaluar-suma"
import { FormInputTable } from "@/components/form-elements/form-input-table"
import { formatNumber } from "@/lib/formatters"
import { cn } from "@/lib/utils"

interface EditArqueoFormProps {
  arqueo: ArqueoById
  cuentas: SelectItemType[]
  cambio_dolar: number
}

type DenominationKey = keyof z.infer<typeof arqueoSchema>

interface DenominationConfig {
  name: DenominationKey
  label: string
  value: number
  isDollar?: boolean
  separator?: boolean
}

const DENOMINATIONS: DenominationConfig[] = [
  { name: "dolar_100", label: "$100", value: 100, isDollar: true },
  { name: "dolar_50", label: "$50", value: 50, isDollar: true },
  { name: "dolar_20", label: "$20", value: 20, isDollar: true },
  { name: "dolar_10", label: "$10", value: 10, isDollar: true },
  { name: "dolar_5", label: "$5", value: 5, isDollar: true },
  { name: "dolar_2", label: "$2", value: 2, isDollar: true },
  { name: "dolar_1", label: "$1", value: 1, isDollar: true, separator: true },
  { name: "nio_1000", label: "1,000", value: 1000 },
  { name: "nio_500", label: "500", value: 500 },
  { name: "nio_200", label: "200", value: 200 },
  { name: "nio_100", label: "100", value: 100 },
  { name: "nio_50", label: "50", value: 50 },
  { name: "nio_20", label: "20", value: 20 },
  { name: "nio_10", label: "10", value: 10, separator: true },
  { name: "nio_5", label: "5", value: 5 },
  { name: "nio_1", label: "1", value: 1 },
  { name: "nio_050", label: "0.50", value: 0.5 },
  { name: "nio_025", label: "0.25", value: 0.25 },
  { name: "nio_010", label: "0.10", value: 0.1 },
]

export function EditArqueoForm({
  arqueo,
  cuentas,
  cambio_dolar,
}: EditArqueoFormProps) {
  const formId = "edit-arqueo"
  const form = useForm<z.infer<typeof arqueoSchema>>({
    resolver: zodResolver(arqueoSchema),
    defaultValues: {
      id_cuenta: arqueo.id_cuenta,
      dolar_100: arqueo.dolar_100 ?? "",
      dolar_50: arqueo.dolar_50 ?? "",
      dolar_20: arqueo.dolar_20 ?? "",
      dolar_10: arqueo.dolar_10 ?? "",
      dolar_5: arqueo.dolar_5 ?? "",
      dolar_2: arqueo.dolar_2 ?? "",
      dolar_1: arqueo.dolar_1 ?? "",
      nio_1000: arqueo.nio_1000 ?? "",
      nio_500: arqueo.nio_500 ?? "",
      nio_200: arqueo.nio_200 ?? "",
      nio_100: arqueo.nio_100 ?? "",
      nio_50: arqueo.nio_50 ?? "",
      nio_20: arqueo.nio_20 ?? "",
      nio_10: arqueo.nio_10 ?? "",
      nio_5: arqueo.nio_5 ?? "",
      nio_1: arqueo.nio_1 ?? "",
      nio_050: arqueo.nio_050 ?? "",
      nio_025: arqueo.nio_025 ?? "",
      nio_010: arqueo.nio_010 ?? "",
    },
  })

  const [state, formAction, isPending] = useActionState(
    updateArqueo,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof arqueoSchema>) {
    startTransition(() => {
      formAction({ id: arqueo.id, values: values as ArqueoById })
    })
  }

  useServerActionFeedback(state, { refresh: true, back: true })

  const formValues = form.watch()

  const { totalDolares, totalCordobas, granTotalNIO } = DENOMINATIONS.reduce(
    (acc, { name, value, isDollar }) => {
      const inputValue = formValues[name]
      const numericValue = evaluarSuma(
        inputValue !== null && inputValue !== undefined
          ? String(inputValue)
          : undefined
      )
      const hasValue =
        inputValue !== "" && inputValue !== null && inputValue !== undefined

      if (hasValue && numericValue !== 0) {
        if (isDollar) {
          acc.totalDolares += numericValue * value
          acc.granTotalNIO += numericValue * value * cambio_dolar
        } else {
          acc.totalCordobas += numericValue * value
          acc.granTotalNIO += numericValue * value
        }
      }
      return acc
    },
    { totalDolares: 0, totalCordobas: 0, granTotalNIO: 0 }
  )

  const diferencia = granTotalNIO - arqueo.saldo
  const cuadrado = diferencia === 0

  return (
    <>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className={formDivStyle}
      >
        <FieldSet>
          <FieldGroup>
            <FormComboBox
              control={form.control}
              name="id_cuenta"
              items={cuentas}
              label="Cuenta"
            />
          </FieldGroup>
          <FieldGroup>
            <div className="space-y-2">
              <table className="w-full">
                <tbody className="">
                  {DENOMINATIONS.map(
                    ({ name, label, value, isDollar, separator }) => {
                      const inputValue = formValues[name]
                      const stringValue =
                        inputValue !== null && inputValue !== undefined
                          ? String(inputValue)
                          : undefined
                      const numericValue = evaluarSuma(stringValue)

                      const isValid =
                        inputValue !== "" &&
                        inputValue !== null &&
                        inputValue !== undefined

                      const subtotal = isValid
                        ? isDollar
                          ? numericValue * value * cambio_dolar
                          : numericValue * value
                        : NaN

                      return (
                        <tr
                          key={name}
                          className={separator ? "border-b-2" : ""}
                        >
                          <td className="w-18 border px-1 text-right text-muted-foreground">
                            {label}
                          </td>
                          <td className="max-w-25 border">
                            <FormInputTable
                              control={form.control}
                              name={name}
                              className="h-5.5 border-0 px-1 text-center dark:bg-transparent"
                            />
                          </td>
                          <td className="min-w-25 border px-1 text-right text-muted-foreground">
                            {isNaN(subtotal) ? "-" : formatNumber(subtotal)}
                          </td>
                        </tr>
                      )
                    }
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t-4 border-double font-bold">
                    <td className="border px-1 text-right">Total</td>
                    <td className="h-5.5 max-w-20 border px-1 text-right">
                      ${formatNumber(granTotalNIO / cambio_dolar)}
                    </td>
                    <td className="min-w-25 border px-1 text-right">
                      {formatNumber(granTotalNIO)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-1 text-right">Detalle</td>
                    <td className="h-5.5 max-w-20 border px-1 text-right">
                      ${formatNumber(totalDolares)}
                    </td>
                    <td className="min-w-25 border px-1 text-right">
                      {formatNumber(totalCordobas)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-1 text-right">Diferencia</td>
                    <td
                      className={cn(
                        cuadrado ? "" : "text-red-600 dark:text-red-400",
                        "h-5.5 max-w-20 border px-1 text-right"
                      )}
                    >
                      {formatNumber(diferencia)}
                    </td>
                    <td className="min-w-25 border px-1 text-right">
                      {formatNumber(arqueo.saldo)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </FieldGroup>
          <FieldGroup>
            <DeleteFormItem
              id={arqueo.id}
              title="arqueo"
              handleDelete={deleteArqueo}
            />
          </FieldGroup>
        </FieldSet>
      </form>
      <ResponsiveDrawerFooter formId={formId} isPending={isPending} />
    </>
  )
}
