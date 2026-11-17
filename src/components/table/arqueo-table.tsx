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
import Link from "next/link"
import { ArqueoPage } from "@/types"
import { Card, CardAction, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { EmptyList } from "./empty-list"
import { LinkButton } from "../link-button"

interface DataTableProps {
  data: ArqueoPage[]
  // totalPages: number
}

export function ArqueoTable({ data }: DataTableProps) {
  if (data.length <= 0) {
    return <EmptyList />
  }

  return (
    <>
      <div className="flex flex-col gap-2 md:hidden">
        {data.map((item) => {
          const diferencia = item.total - item.saldo
          const cuadrado = diferencia === 0
          const saldoCero = Number(item.saldo) === 0

          return (
            <Link key={item.id} href={`/arqueo/${item.id}`}>
              <Card size="sm" className="py-2.5">
                <CardHeader className="gap-0">
                  <CardTitle className="truncate text-sm">
                    {item.cuenta}
                  </CardTitle>
                  <CardAction className="flex flex-col items-end gap-2.5">
                    {saldoCero && (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        Sin saldo
                      </Badge>
                    )}
                    {cuadrado ? (
                      !saldoCero && (
                        <CheckIcon size={20} className="text-green-600" />
                      )
                    ) : (
                      <span className="text-xs text-red-400">
                        {formatNumber(diferencia)}
                      </span>
                    )}
                  </CardAction>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Editar</TableHead>
              <TableHead>Cuenta</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              const diferencia = item.total - item.saldo
              const cuadrado = diferencia === 0
              const saldoCero = Number(item.saldo) === 0

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <LinkButton
                      href={`/arqueo/${item.id}`}
                      variant="outline"
                      size="icon-xs"
                    >
                      <PencilIcon />
                    </LinkButton>
                  </TableCell>
                  <TableCell>{item.cuenta}</TableCell>
                  <TableCell className="truncate">
                    {saldoCero && (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        Sin saldo
                      </Badge>
                    )}
                    {cuadrado ? (
                      !saldoCero && (
                        <CheckIcon size={20} className="text-green-600" />
                      )
                    ) : (
                      <span className="text-xs text-red-400">
                        {formatNumber(diferencia)}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
