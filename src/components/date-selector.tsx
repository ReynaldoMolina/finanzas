import { Dispatch, SetStateAction, useState } from "react"
import { getCurrentMonth } from "@/lib/get-date"
import { dateIsoToDate, dateToIso, formatDate } from "@/lib/formatters"
import { SearchParamsProps } from "@/types"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { ToggleGroupItem } from "./ui/toggle-group"
import { Button } from "./ui/button"
import { useUpdateParams } from "@/hooks/use-update-params"
import { DatePicker } from "./date-picker"
import { CalendarIcon } from "lucide-react"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { Field, FieldGroup } from "./ui/field"

interface DateSelector {
  searchParams: SearchParamsProps
  isActive: boolean
}

interface DateRange {
  from: string
  to: string
}

export function DateSelector({ searchParams, isActive = false }: DateSelector) {
  const { firstDay, lastDay } = getCurrentMonth()
  const { updateParams } = useUpdateParams()

  const [open, setOpen] = useState(false)
  const [isSingle, setIsSingle] = useState(false)
  const [range, setRange] = useState<DateRange>({
    from: searchParams?.from ?? firstDay,
    to: searchParams?.to ?? lastDay,
  })

  function handleOpenChange(isOpen: boolean) {
    if (isOpen) {
      setRange({
        from: searchParams?.from ?? firstDay,
        to: searchParams?.to ?? lastDay,
      })
    }
    setOpen(isOpen)
  }

  const buttonText = isActive
    ? isSingle
      ? formatDate({ date: range.from })
      : `${formatDate({ date: range.from, short: true })} - ${formatDate({ date: range.to, short: true })}`
    : ""

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <ToggleGroupItem value="Rango" className="text-xs">
            <CalendarIcon className="size-3.5" />
            {buttonText}
            {!isActive && "Fecha"}
          </ToggleGroupItem>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar fechas</DialogTitle>
          <DialogDescription>
            Elige el período que quieres filtrar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="inline-flex gap-2">
            <Switch
              id="is-single"
              checked={isSingle}
              onCheckedChange={setIsSingle}
            />
            <Label htmlFor="is-single">Seleccionar solo una fecha</Label>
          </div>
          <Field>
            <FieldGroup className="xs:flex-row">
              <DateRangePicker
                name="from"
                label="Desde"
                range={range}
                setRange={setRange}
              />
              {!isSingle && (
                <DateRangePicker
                  name="to"
                  label="Hasta"
                  range={range}
                  setRange={setRange}
                />
              )}
            </FieldGroup>
          </Field>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button
            type="button"
            onClick={() => {
              updateParams({
                from: range.from,
                to: isSingle ? range.from : range.to,
              })
              setOpen(false)
            }}
          >
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface DateRangePicker {
  name: "from" | "to"
  label: string
  range: DateRange
  setRange: Dispatch<SetStateAction<DateRange>>
}

function DateRangePicker({ name, label, range, setRange }: DateRangePicker) {
  function handleChange(date: Date | undefined) {
    if (date) {
      const formattedDate = dateToIso(date)
      setRange({ ...range, [name]: formattedDate })
    }
  }

  return (
    <DatePicker
      label={label}
      date={dateIsoToDate(range[name])}
      handleChange={handleChange}
    />
  )
}
