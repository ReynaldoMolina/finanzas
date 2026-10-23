"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { es } from "date-fns/locale"
import { dateToIso, formatDate } from "@/lib/formatters"
import { Matcher } from "react-day-picker"

interface DatePicker {
  label: string
  date: Date | undefined
  disabled?: Matcher | Matcher[]
  handleChange?: (date: Date | undefined) => void
}

export function DatePicker({
  label,
  date,
  disabled,
  handleChange,
}: DatePicker) {
  return (
    <div className="flex w-full flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date"
              className="w-full justify-between font-normal"
            >
              {date ? formatDate(dateToIso(date)) : "Seleccionar"}
              <ChevronDownIcon />
            </Button>
          }
        />
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (handleChange) handleChange(date)
            }}
            locale={es}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
