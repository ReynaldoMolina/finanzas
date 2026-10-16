"use client"

import { ArrowLeftIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function ButtonNotFoundBack() {
  const router = useRouter()

  return (
    <Button
      type="button"
      variant="secondary"
      className="mt-5"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon />
      Regresar
    </Button>
  )
}
