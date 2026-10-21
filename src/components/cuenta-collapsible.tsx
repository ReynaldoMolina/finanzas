"use client"

import { formatNumber } from "@/lib/formatters"
import { CuentaTipos } from "@/types"
import { ChevronRight, DotIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { Button } from "./ui/button"
import Link from "next/link"

interface CuentaCollapsible {
  tipo: CuentaTipos
}

export function CuentaCollapsible({ tipo }: CuentaCollapsible) {
  return (
    <div>
      {tipo.categorias && tipo.categorias.length > 0 ? (
        tipo.categorias.map((categoria) => (
          <Collapsible key={categoria.id}>
            <CollapsibleTrigger
              render={
                <Button
                  variant="secondary"
                  className="w-full dark:bg-secondary/50"
                >
                  <ChevronRight className="transition group-data-panel-open/button:rotate-90" />

                  <Link
                    href={`/categoria/${categoria.id}`}
                    className="hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {categoria.nombre}
                  </Link>
                  <span className="ml-auto">
                    {formatNumber(categoria.subtotal)}
                  </span>
                </Button>
              }
            />
            {/* Nivel 3: Cuentas */}
            <CollapsibleContent>
              {categoria.cuentas && categoria.cuentas.length > 0 ? (
                <ul className="text-xs">
                  {categoria.cuentas.map((cuenta) => (
                    <li
                      key={cuenta.id}
                      className="flex items-center gap-2 px-2.5 py-2 text-muted-foreground not-last:border-b"
                    >
                      <DotIcon size="16" />
                      <Link
                        href={`/cuenta/${cuenta.id}`}
                        className="hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {cuenta.nombre}
                      </Link>
                      <span className="ml-auto">
                        {formatNumber(cuenta.saldo)}
                      </span>
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
