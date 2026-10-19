import { Dispatch, SetStateAction, useState } from "react"
import { getCurrentMonth } from "@/lib/get-date"
import { dateIsoToDate, dateToIso } from "@/lib/formatters"
import { Calendar } from "lucide-react"
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
import { cn } from "@/lib/utils"

interface DateSelector {
  searchParams: SearchParamsProps
  active?: boolean
}

interface DateFilter {
  start: string
  end: string
}

export function DateSelector({ searchParams, active }: DateSelector) {
  const { firstDay, lastDay } = getCurrentMonth()
  const { updateParams } = useUpdateParams()

  const [filter, setFilter] = useState<DateFilter>({
    start: searchParams?.start || firstDay,
    end: searchParams?.end || lastDay,
  })

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <ToggleGroupItem
            value="5"
            className={cn("text-xs", active && "bg-muted dark:bg-muted")}
          >
            <Calendar className="size-3.5" />
          </ToggleGroupItem>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccionar fechas</DialogTitle>
          <DialogDescription>
            Elige el periodo que deseas consultar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 xs:flex-row">
          <DatePickerForm
            name="start"
            label="Desde"
            filter={filter}
            setFilter={setFilter}
          />
          <DatePickerForm
            name="end"
            label="Hasta"
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button
            type="button"
            onClick={() => {
              updateParams({
                start: filter.start,
                end: filter.end,
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
  name: "start" | "end"
  label: string
  filter: DateFilter
  setFilter: Dispatch<SetStateAction<DateFilter>>
}

function DatePickerForm({ name, label, filter, setFilter }: DatePickerForm) {
  function handleChange(date: Date | undefined) {
    if (date) {
      const formattedDate = dateToIso(date)
      setFilter({ ...filter, [name]: formattedDate })
    }
  }

  return (
    <DatePicker
      label={label}
      initialDate={dateIsoToDate(filter[name])}
      handleChange={handleChange}
      disabled={{ before: new Date(2026, 0, 1) }}
    />
  )
}
