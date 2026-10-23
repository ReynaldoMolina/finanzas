import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subMonths,
  format,
} from "date-fns"

const fmt = (date: Date) => format(date, "yyyy-MM-dd")

export const today = () => {
  const now = new Date()
  return { from: fmt(now), to: fmt(now) }
}

export const thisWeek = () => {
  const now = new Date()
  return {
    from: fmt(startOfWeek(now, { weekStartsOn: 1 })),
    to: fmt(endOfWeek(now, { weekStartsOn: 1 })),
  }
}

export const thisMonth = () => {
  const now = new Date()
  return {
    from: fmt(startOfMonth(now)),
    to: fmt(endOfMonth(now)),
  }
}

export const lastMonth = () => {
  const now = subMonths(new Date(), 1)
  return {
    from: fmt(startOfMonth(now)),
    to: fmt(endOfMonth(now)),
  }
}

export const thisYear = () => {
  const now = new Date()
  return {
    from: fmt(startOfYear(now)),
    to: fmt(endOfYear(now)),
  }
}

export function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatDateInput(date: Date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function getCurrentMonth() {
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const firstDay = formatDateInput(firstDayOfMonth)
  const lastDay = formatDateInput(lastDayOfMonth)

  return { firstDay, lastDay }
}
