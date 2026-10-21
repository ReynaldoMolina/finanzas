"use client"

import { formatDate, formatNumber } from "@/lib/formatters"
import { PencilIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import Link from "next/link"
import { TransaccionTablaType } from "@/types"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { getTransaccionStyle } from "./get-transaccion-style"
import { cn } from "cn"
import { Badge } from "../ui/badge"
import EmptyList from "./empty-list"
import { Pagination } from "./pagination"
import { LinkButton } from "../link-button"

interface DataTableProps {
  data: TransaccionTablaType[]
  totalPages: number
}

export function TransaccionTable({ data, totalPages }: DataTableProps) {
  const isMobile = useIsMobile()

  if (data.length <= 0) {
    return <EmptyList />
  }

  if (isMobile)
    return (
      <>
        {data.map((item) => {
          const { textColor, sign } = getTransaccionStyle(item.tipo)

          return (
            <Link key={item.id} href={`/transaccion/${item.id}`}>
              <Card className="py-3 dark:border-0">
                <CardHeader>
                  <CardTitle className="truncate text-xs font-normal">
                    {item.categoria_origen} · {item.cuenta_origen}
                  </CardTitle>
                  <CardDescription className="flex flex-col gap-1">
                    {item.descripcion && (
                      <span className="text-xxs">{item.descripcion}</span>
                    )}
                    <Badge variant="secondary" className="text-xxs">
                      {item.categoria_destino} · {item.cuenta_destino}
                    </Badge>
                  </CardDescription>
                  <CardAction className="flex flex-col items-end">
                    <span className={cn("text-sm", textColor)}>
                      {sign} {formatNumber(Number(item.monto))}
                    </span>
                    <span className="text-xxs text-muted-foreground">
                      {formatDate(item.fecha)}
                    </span>
                  </CardAction>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
        <Pagination totalPages={totalPages} />
      </>
    )

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Editar</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Cuenta</TableHead>
            <TableHead className="w-full">Descripción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const { textColor, sign } = getTransaccionStyle(item.tipo)

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <LinkButton
                    href={`/transaccion/${item.id}`}
                    variant="outline"
                    size="icon-xs"
                  >
                    <PencilIcon />
                  </LinkButton>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(item.fecha)}
                </TableCell>
                <TableCell className={cn("text-right", textColor)}>
                  {sign} {formatNumber(Number(item.monto))}
                </TableCell>
                <TableCell>
                  {item.categoria_origen} · {item.cuenta_origen}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <Badge variant="secondary" className="text-muted-foreground">
                    {item.categoria_destino} · {item.cuenta_destino}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {item.descripcion ? item.descripcion : "-"}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination totalPages={totalPages} />
    </>
  )
}
