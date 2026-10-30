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
import { EmptyList } from "./empty-list"

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
        <Link key={item.id} href={`/ajustes/plantilla/${item.id}`}>
          <Card size="sm">
            <CardHeader className="gap-2">
              <CardTitle className="truncate text-sm">{item.nombre}</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                {item.categoria_origen} · {item.cuenta_origen}
                <Badge variant="secondary" className="text-muted-foreground">
                  {item.categoria_destino} · {item.cuenta_destino}
                </Badge>
              </CardDescription>
              <CardAction>
                <span className={cn("text-sm font-semibold", textColor)}>
                  {sign}
                  {formatNumber(Number(item.monto))}
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
          <TableHead>Descripción</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Cuenta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => {
          const { textColor, sign } = getTransaccionStyle(item.tipo)

          return (
            <TableRow key={item.id}>
              <TableCell>
                <Link href={`/ajustes/plantilla/${item.id}`}>
                  <Button variant="outline" size="icon-xs">
                    <PencilIcon />
                  </Button>
                </Link>
              </TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell className={cn("text-right font-semibold", textColor)}>
                {sign}
                {formatNumber(Number(item.monto))}
              </TableCell>
              <TableCell className="max-w-xs truncate text-muted-foreground">
                {item.descripcion ? (
                  item.descripcion
                ) : (
                  <span className="text-muted-foreground italic">
                    Sin descripción
                  </span>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {item.categoria_origen} · {item.cuenta_origen}
              </TableCell>
              <TableCell className="text-muted-foreground">
                <Badge variant="secondary" className="text-muted-foreground">
                  {item.categoria_destino} · {item.cuenta_destino}
                </Badge>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
