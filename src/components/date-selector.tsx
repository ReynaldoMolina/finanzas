import { Dispatch, SetStateAction, useState } from "react"
import { getCurrentMonth } from "@/lib/get-date"
import { dateIsoToDate, dateToIso } from "@/lib/formatters"
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

interface DateSelector {
  searchParams: SearchParamsProps
}

interface DateRange {
  from: string
  to: string
}

export function DateSelector({ searchParams }: DateSelector) {
  const { firstDay, lastDay } = getCurrentMonth()
  const { updateParams } = useUpdateParams()

  const [open, setOpen] = useState(false)
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<ToggleGroupItem value="6">Rango</ToggleGroupItem>}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccionar fechas</DialogTitle>
          <DialogDescription>
            Elige el periodo que deseas consultar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 xs:flex-row">
          <DatePickerForm
            name="from"
            label="Desde"
            range={range}
            setRange={setRange}
          />
          <DatePickerForm
            name="to"
            label="Hasta"
            range={range}
            setRange={setRange}
          />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button
            type="button"
            onClick={() => {
              updateParams({
                from: range.from,
                to: range.to,
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

interface DatePickerForm {
  name: "from" | "to"
  label: string
  range: DateRange
  setRange: Dispatch<SetStateAction<DateRange>>
}

function DatePickerForm({ name, label, range, setRange }: DatePickerForm) {
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
      disabled={{ before: new Date(2026, 0, 1) }}
    />
  )
}
