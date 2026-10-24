"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "../ui/card"

export default function EmptyList() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search") ?? ""

  return (
    <Card className="w-full">
      <CardContent>
        <span className="block w-full text-center text-muted-foreground">
          {search ? `No hay resultados para "${search}"` : "No hay resultados"}
        </span>
      </CardContent>
    </Card>
  )
}
