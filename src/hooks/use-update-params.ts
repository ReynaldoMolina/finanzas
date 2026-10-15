"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface UpdateParamsProps {
  newValue: string | null
  paramKey: string
}

export function useUpdateParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParams = (
    newParams: Record<string, string | null | undefined>
  ) => {
    const params = new URLSearchParams(searchParams.toString())
    let hasChanges = false

    Object.entries(newParams).forEach(([key, value]) => {
      const currentValue = searchParams.get(key)
      const normalizedValue = value ?? null
      const normalizedCurrent = currentValue ?? null

      // Only mark for update if the value actually changed
      if (normalizedValue !== normalizedCurrent) {
        hasChanges = true
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }
    })

    // Skip router push/replace if no parameters actually changed
    if (!hasChanges) return

    const newQuery = params.toString()
    const targetUrl = newQuery ? `${pathname}?${newQuery}` : pathname

    router.replace(targetUrl, { scroll: false })
  }

  return { updateParams }
}
