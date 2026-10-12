"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ServerStatus } from "../types"
import { toast } from "../components/ui/toast"

interface FeedbackOptions {
  back?: boolean
  refresh?: boolean
  hardReload?: boolean
}

export function useServerActionFeedback(
  state: ServerStatus | undefined,
  options: FeedbackOptions = {}
) {
  const router = useRouter()

  useEffect(() => {
    if (state?.success === undefined) return

    if (state.success) {
      toast.add({
        type: "success",
        title: state.title ?? "Éxito",
        description: state.description,
      })

      if (options.hardReload) {
        window.location.reload()
        return
      }

      if (options.back && options.refresh) {
        router.back()
        setTimeout(() => router.refresh(), 300)
      } else {
        if (options.back) router.back()
        if (options.refresh) router.refresh()
      }
    } else {
      toast.add({
        type: "error",
        title: state?.title ?? "Error",
        description: state?.description ?? "Ocurrió un problema inesperado.",
      })
    }
  }, [state])
}
