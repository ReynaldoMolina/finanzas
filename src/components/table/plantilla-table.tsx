"use client"

import { formatNumber } from "@/lib/formatters"
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
import { PlantillaTable } from "@/types"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Badge } from "../ui/badge"
import { getTransaccionStyle } from "./get-transaccion-style"
import { cn } from "cn"
import EmptyList from "./empty-list"

interface DataTableProps {
  data: PlantillaTable[]
}

export function PlantillaTabla({ data }: DataTableProps) {
  const isMobile = useIsMobile()

  if (data.length <= 0) {
    return <EmptyList />
  }

  if (isMobile)
    return data.map((item) => {
      const { textColor, sign } = getTransaccionStyle(item.tipo)

      return (
        <Link key={item.id} href={`/configuracion/plantilla/${item.id}`}>
          <Card className="py-3">
            <CardHeader className="gap-2">
              <CardTitle className="truncate text-xs">
                {item.categoria_origen} · {item.cuenta_origen}
              </CardTitle>
              <CardDescription className="flex flex-col gap-2">
                {item.descripcion && (
                  <span className="text-xs">{item.descripcion}</span>
                )}
                <Badge variant="secondary" className="text-muted-foreground">
                  {item.categoria_destino} · {item.cuenta_destino}
                </Badge>
              </CardDescription>
              <CardAction className="flex flex-col items-end gap-1.5">
                <span className={cn("text-sm font-semibold", textColor)}>
                  {sign} {formatNumber(Number(item.monto))}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.nombre}
                </span>
              </CardAction>
            </CardHeader>
          </Card>
        </Link>
      )
    })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Editar</TableHead>
          <TableHead>Nombre</TableHead>
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
                <Link href={`/configuracion/plantilla/${item.id}`}>
                  <Button variant="outline" size="icon-xs">
                    <PencilIcon />
                  </Button>
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {item.nombre}
              </TableCell>
              <TableCell className={cn("text-right font-semibold", textColor)}>
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
  )
}
