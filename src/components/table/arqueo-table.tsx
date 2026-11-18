"use client"

import { formatNumber } from "@/lib/formatters"
import { CheckIcon, PencilIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { ArqueoPage } from "@/types"
import { Badge } from "../ui/badge"
import { EmptyList } from "./empty-list"
import { LinkButton } from "../link-button"

interface DataTableProps {
  data: ArqueoPage[]
}

export function ArqueoTable({ data }: DataTableProps) {
  if (data.length <= 0) {
    return <EmptyList />
  }

  return (
    <div className="flex max-w-2xl flex-col gap-2">
      {data.map((item) => {
        const diferencia = item.total - item.saldo
        const cuadrado = diferencia === 0
        const saldoCero = Number(item.saldo) === 0

        return (
          <LinkButton
            variant="secondary"
            key={item.id}
            href={`/arqueo/${item.id}`}
            className="font-normal dark:bg-secondary/50"
          >
            {item.cuenta}
            <div className="ml-auto inline-flex items-center gap-2">
              {cuadrado ? (
                !saldoCero && <CheckIcon size={20} className="text-green-600" />
              ) : (
                <span className="text-xs text-red-400">
                  {formatNumber(diferencia)}
                </span>
              )}
              {saldoCero && (
                <Badge variant="outline" className="text-muted-foreground">
                  Sin saldo
                </Badge>
              )}
            </div>
          </LinkButton>
        )
      })}
    </div>
  )
}
