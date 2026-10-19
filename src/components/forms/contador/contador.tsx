"use client"

import { FormInputTable } from "@/components/form-elements/form-input-table"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Spinner } from "@/components/ui/spinner"
import { updateArqueoConteo } from "@/database/actions/arqueo"
import { stateDefault } from "@/database/actions/state-message"
import { useServerActionFeedback } from "@/hooks/use-server-status"
import { evaluarSuma } from "@/lib/evaluar-suma"
import { formatNumber } from "@/lib/formatters"
import { cn } from "@/lib/utils"
import { ArqueoPage, ArqueoType } from "@/types"
import { contadorSchema } from "@/validation/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { PencilIcon, SaveIcon } from "lucide-react"
import Link from "next/link"
import { useActionState, startTransition } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

interface ContadorProps {
  arqueo: ArqueoPage
  cambio_dolar: number
}

type DenominationKey = keyof z.infer<typeof contadorSchema>

interface DenominationConfig {
  name: DenominationKey
  label: string
  value: number
  isDollar?: boolean
}

const DENOMINATIONS: DenominationConfig[] = [
  { name: "dolar_100", label: "$100", value: 100, isDollar: true },
  { name: "dolar_50", label: "$50", value: 50, isDollar: true },
  { name: "dolar_20", label: "$20", value: 20, isDollar: true },
  { name: "dolar_10", label: "$10", value: 10, isDollar: true },
  { name: "dolar_5", label: "$5", value: 5, isDollar: true },
  { name: "dolar_2", label: "$2", value: 2, isDollar: true },
  { name: "dolar_1", label: "$1", value: 1, isDollar: true },
  { name: "nio_1000", label: "1000", value: 1000 },
  { name: "nio_500", label: "500", value: 500 },
  { name: "nio_200", label: "200", value: 200 },
  { name: "nio_100", label: "100", value: 100 },
  { name: "nio_50", label: "50", value: 50 },
  { name: "nio_20", label: "20", value: 20 },
  { name: "nio_10", label: "10", value: 10 },
  { name: "nio_5", label: "5", value: 5 },
  { name: "nio_1", label: "1", value: 1 },
  { name: "nio_050", label: "0.50", value: 0.5 },
  { name: "nio_025", label: "0.25", value: 0.25 },
  { name: "nio_010", label: "0.10", value: 0.1 },
]

export function Contador({ arqueo, cambio_dolar }: ContadorProps) {
  const formId = `edit-contador-${arqueo.cuenta}`
  const form = useForm<z.infer<typeof contadorSchema>>({
    resolver: zodResolver(contadorSchema),
    defaultValues: {
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
    updateArqueoConteo,
    stateDefault
  )

  function onSubmit(values: z.infer<typeof contadorSchema>) {
    startTransition(() => {
      formAction({ id: arqueo.id, values: values as ArqueoType })
    })
  }

  useServerActionFeedback(state, { refresh: true })

  const formValues = form.watch()

  const { totalDolares, totalCordobas, granTotalNIO } = DENOMINATIONS.reduce(
    (acc, { name, value, isDollar }) => {
      const inputValue = formValues[name]
      const numericValue = evaluarSuma(inputValue)
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

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-2 xs:max-w-70"
    >
      <div className="flex items-center border p-1">
        <Link
          href={`/arqueo/${arqueo.id}`}
          className="inline-flex items-center gap-2 text-xs"
        >
          {arqueo.cuenta}
          <PencilIcon size={12} />
        </Link>
        <Button
          variant="outline"
          size="sm"
          type="submit"
          form={formId}
          className="ml-auto"
        >
          {isPending ? <Spinner /> : <SaveIcon />}
          Guardar
        </Button>
      </div>

      <table className="text-xs">
        <tbody className="dark:bg-muted/50">
          {DENOMINATIONS.map(({ name, label, value, isDollar }) => {
            const inputValue = formValues[name]
            const numericValue = evaluarSuma(inputValue)

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
              <tr key={name}>
                <td className="w-fit border px-1 text-right text-muted-foreground">
                  {label}
                </td>
                <td className="max-w-25 border">
                  <FormInputTable
                    control={form.control}
                    name={name}
                    className="h-4.5 border-0 px-1 text-center dark:bg-transparent"
                  />
                </td>
                <td className="min-w-25 border px-1 text-right text-muted-foreground">
                  {isNaN(subtotal) ? "-" : formatNumber(subtotal)}
                </td>
              </tr>
            )
          })}
        </tbody>

        <tfoot>
          <tr className="border-t-4 border-double font-bold">
            <td className="w-12 border px-1 text-right">Total</td>
            <td className="h-4.5 max-w-20 border px-1 text-right">
              ${formatNumber(granTotalNIO / cambio_dolar)}
            </td>
            <td className="min-w-25 border px-1 text-right">
              C${formatNumber(granTotalNIO)}
            </td>
          </tr>
          <tr>
            <td className="w-12 border px-1 text-right">Detalle</td>
            <td className="h-4.5 max-w-20 border px-1 text-right">
              ${formatNumber(totalDolares)}
            </td>
            <td className="min-w-25 border px-1 text-right">
              C${formatNumber(totalCordobas)}
            </td>
          </tr>
          <tr>
            <td className="w-12 border px-1 text-right">Square</td>
            <td
              className={cn(
                "h-4.5 max-w-20 border px-1 text-right",
                granTotalNIO - arqueo.saldo !== 0
                  ? "bg-red-200 dark:bg-red-900/80"
                  : "bg-green-200 dark:bg-green-900/80"
              )}
            >
              {formatNumber(granTotalNIO - arqueo.saldo)}
            </td>
            <td className="min-w-25 border bg-yellow-200 px-1 text-right dark:bg-yellow-900">
              C${formatNumber(arqueo.saldo)}
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  )
}
