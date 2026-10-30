import {
  format,
  formatISO,
  isAfter,
  isSameYear,
  isThisWeek,
  isToday,
  isYesterday,
  parseISO,
  startOfWeek,
} from "date-fns"
import { es } from "date-fns/locale"

export function formatNumber(value: number, digits = 2) {
  const formatter = new Intl.NumberFormat("es-NI", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })

  return formatter.format(Number(value))
}

interface FormatDate {
  date: string | number | Date
  short?: boolean
  natural?: boolean
}

export function formatDate({
  date,
  short = false,
  natural = false,
}: FormatDate) {
  const parsedDate = typeof date === "string" ? parseISO(date) : new Date() // o parseISO(date)
  const now = new Date()

  if (natural) {
    if (isToday(parsedDate)) {
      return "Hoy"
    }

    if (isYesterday(parsedDate)) {
      return "Ayer"
    }

    if (isThisWeek(parsedDate, { weekStartsOn: 0 })) {
      const dayName = format(parsedDate, "EEEE", { locale: es })
      return dayName.charAt(0).toUpperCase() + dayName.slice(1)
    }
  }

  if (isSameYear(now, parsedDate)) {
    const pattern = short ? "d MMM" : "d MMMM"
    return format(parsedDate, pattern, { locale: es })
  }

  return format(parsedDate, "d/MMM/yy", { locale: es })
}

export function dateIsoToDate(date: string) {
  return new Date(`${date}T00:00:00`)
}

export function dateToIso(date: Date) {
  return format(date, "yyyy-MM-dd")
}
