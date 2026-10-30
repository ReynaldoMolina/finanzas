import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subMonths,
  format,
  subWeeks,
  subDays,
} from "date-fns"

const fmt = (date: Date) => format(date, "yyyy-MM-dd")

export const today = () => {
  const now = fmt(new Date())
  return { from: now, to: now }
}

export const yesterday = () => {
  const date = fmt(subDays(new Date(), 1))
  return { from: date, to: date }
}

export const thisWeek = () => {
  const now = new Date()
  return {
    from: fmt(startOfWeek(now, { weekStartsOn: 0 })),
    to: fmt(endOfWeek(now, { weekStartsOn: 0 })),
  }
}

export const lastWeek = () => {
  const date = subWeeks(new Date(), 1)
  return {
    from: fmt(startOfWeek(date, { weekStartsOn: 0 })),
    to: fmt(endOfWeek(date, { weekStartsOn: 0 })),
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

export function getCurrentMonth() {
  const now = new Date()
  return {
    firstDay: fmt(startOfMonth(now)),
    lastDay: fmt(endOfMonth(now)),
  }
}
