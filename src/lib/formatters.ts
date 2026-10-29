import { format, isSameYear, parseISO } from "date-fns"
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
}

export function formatDate({ date, short = false }: FormatDate) {
  const parsedDate = typeof date === "string" ? parseISO(date) : new Date(date)

  if (isSameYear(new Date(), parsedDate)) {
    const pattern = short ? "d MMM" : "d MMMM"
    return format(parsedDate, pattern, { locale: es })
  }

  return format(parsedDate, "d/MMM/yy", { locale: es })
}

export function dateIsoToDate(date: string) {
  return new Date(`${date}T00:00:00`)
}

export function dateToIso(date: Date) {
  return date?.toISOString().split("T")[0]
}
