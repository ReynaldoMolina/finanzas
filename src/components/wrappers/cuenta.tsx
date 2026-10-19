import { getCuentas } from "@/database/get-data/cuenta"
import { PageWrapperType } from "@/types"
import Link from "next/link"
import { Button } from "../ui/button"
import { formatNumber } from "@/lib/formatters"
import { PlusIcon, DotIcon } from "lucide-react"

export default async function CuentaWrapper({ searchParams }: PageWrapperType) {
  const { data } = await getCuentas(searchParams)

  return (
    <div className="mt-2 space-y-12">
      {data.map((tipo) => (
        <section key={tipo.nombre} className="relative space-y-3">
          {/* Nivel 1: Tipo */}
          <div className="sticky top-10 flex items-center gap-2 bg-background py-1.5">
            <Link href={`/categoria/crear?cuenta_tipo=${tipo.nombre}`}>
              <Button size="icon-sm">
                <PlusIcon />
              </Button>
            </Link>
            <h2>{tipo.nombre}s</h2>
            <span className="mr-3 ml-auto">{formatNumber(tipo.subtotal)}</span>
          </div>

          {/* Nivel 2: Categoría */}
          <div className="space-y-8 bg-muted p-3 dark:bg-muted/40">
            {tipo.categorias && tipo.categorias.length > 0 ? (
              tipo.categorias.map((categoria) => (
                <div key={categoria.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/cuenta/crear?cuenta_tipo=${tipo.nombre}&id_categoria=${categoria.id}`}
                    >
                      <Button variant="outline" size="icon-sm">
                        <PlusIcon />
                      </Button>
                    </Link>
                    <Link
                      href={`/categoria/${categoria.id}`}
                      className="hover:underline"
                    >
                      {categoria.nombre}
                    </Link>
                    <span className="ml-auto">
                      {formatNumber(categoria.subtotal)}
                    </span>
                  </div>
                  {/* Nivel 3: Cuentas */}
                  {categoria.cuentas && categoria.cuentas.length > 0 ? (
                    <ul className="space-y-3 pl-6">
                      {categoria.cuentas.map((cuenta) => (
                        <li
                          key={cuenta.id}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <DotIcon size="17" />
                          <Link
                            href={`/cuenta/${cuenta.id}`}
                            className="hover:underline"
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
                    <p className="pl-8 text-xs text-muted-foreground/60 italic">
                      Sin cuentas asignadas
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="pl-5">
                <p className="text-xs text-muted-foreground/60 italic">
                  No hay categorías
                </p>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
