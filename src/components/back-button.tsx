"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <Button variant="ghost" onClick={() => router.back()}>
      <ArrowLeft />
    </Button>
  )
}
