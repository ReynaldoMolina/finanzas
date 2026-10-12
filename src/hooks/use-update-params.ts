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

  const updateParam = ({ newValue, paramKey }: UpdateParamsProps) => {
    // 1. Obtener el valor actual del parámetro
    const currentValue = searchParams.get(paramKey)

    // 2. Si el valor nuevo es idéntico al actual (o ambos son nulos/vacíos), no hacer nada
    if ((newValue ?? null) === (currentValue ?? null)) {
      return
    }

    // 3. Modificar los parámetros solo si hubo un cambio real
    const params = new URLSearchParams(searchParams.toString())

    if (newValue) {
      params.set(paramKey, newValue)
    } else {
      params.delete(paramKey)
    }

    const newQuery = params.toString()
    const targetUrl = newQuery ? `${pathname}?${newQuery}` : pathname

    router.replace(targetUrl, { scroll: false })
  }

  return { updateParam }
}
