"use client"

import { formatNumber } from "@/lib/formatters"
import { CuentaTipos } from "@/types"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { Button } from "./ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface CuentaCollapsible {
  tipo: CuentaTipos
  cambio_dolar: number
}

export function CuentaCollapsible({ tipo, cambio_dolar }: CuentaCollapsible) {
  const searchParams = useSearchParams()
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const rangeString = Boolean(from && to) ? `&from=${from}&to=${to}` : ""
  const isActivo = tipo.nombre === "Activo"

  return (
    <div>
      {tipo.categorias && tipo.categorias.length > 0 ? (
        tipo.categorias.map((categoria) => (
          <Collapsible key={categoria.id}>
            <CollapsibleTrigger
              render={
                <Button
                  variant="secondary"
                  className="w-full font-normal dark:bg-secondary/50"
                >
                  <ChevronRight className="transition group-data-panel-open/button:rotate-90" />

                  <Link
                    href={`/categoria/${categoria.id}`}
                    className="hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {categoria.nombre}
                  </Link>
                  {isActivo ? (
                    <span className="ml-auto">
                      {formatNumber(categoria.subtotal)}
                    </span>
                  ) : (
                    <Link
                      href={`/transaccion?search=${categoria.nombre}&tipo=${tipo.nombre}&search_field=Categoría${rangeString}`}
                      className="ml-auto hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {formatNumber(categoria.subtotal)}
                    </Link>
                  )}
                </Button>
              }
            />
            {/* Nivel 3: Cuentas */}
            <CollapsibleContent className="mb-4">
              {categoria.cuentas && categoria.cuentas.length > 0 ? (
                <ul className="ml-6">
                  {categoria.cuentas.map((cuenta) => (
                    <li
                      key={cuenta.id}
                      className="flex items-center gap-2 px-2.5 py-2 text-muted-foreground not-last:border-b"
                    >
                      <Link
                        href={`/cuenta/${cuenta.id}`}
                        className="hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {cuenta.nombre}
                      </Link>
                      {isActivo ? (
                        <span className="ml-auto">
                          {cuenta.is_dollar &&
                            `$${formatNumber(cuenta.saldo / cambio_dolar)} | `}
                          {formatNumber(cuenta.saldo)}
                        </span>
                      ) : (
                        <Link
                          href={`/transaccion?tipo=${tipo.nombre}&search_field=Categoría&search=${cuenta.nombre}${rangeString}`}
                          className="ml-auto hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {cuenta.is_dollar &&
                            `$${formatNumber(cuenta.saldo / cambio_dolar)} | `}
                          {formatNumber(cuenta.saldo)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-8 py-2 text-xs text-muted-foreground/60 italic">
                  Sin cuentas asignadas
                </p>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <div className="pl-5">
          <p className="text-xs text-muted-foreground/60 italic">
            No hay categorías
          </p>
        </div>
      )}
    </div>
  )
}
