import { SearchInput } from "@/components/data-actions/search-input"
import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import { getCuentas } from "@/database/get-data/cuenta"
import { DotIcon, PlusIcon } from "lucide-react"
import { PageProps } from "@/types"
import Link from "next/link"
import { formatNumber } from "@/lib/formatters"

const title = "Cuentas"

export const metadata = {
  title: title,
}

export default async function Page({ searchParams }: PageProps) {
  const { data } = await getCuentas(await searchParams)

  return (
    <>
      <AppHeader title={title} />
      <PageWrapper>
        <SearchInput />

        <div className="mt-2 space-y-12">
          {data.map((tipo) => (
            <section key={tipo.nombre} className="relative space-y-3">
              {/* Nivel 1: Tipo */}
              <div className="sticky top-10 flex items-center gap-2 bg-background py-1.5">
                <Link href={`/categoria/crear?cuenta_tipo=${tipo.nombre}`}>
                  <Button variant="outline" size="icon-xs">
                    <PlusIcon />
                  </Button>
                </Link>
                <h2>{tipo.nombre}s</h2>
                {/* <Tag size="16" /> */}
                <span className="mr-3 ml-auto text-xs">
                  {formatNumber(tipo.subtotal)}
                </span>
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
                          <Button variant="outline" size="icon-xs">
                            <PlusIcon />
                          </Button>
                        </Link>
                        <Link
                          href={`/categoria/${categoria.id}`}
                          className="hover:underline"
                        >
                          {categoria.nombre}
                        </Link>
                        <span className="ml-auto text-xs">
                          {formatNumber(categoria.subtotal)}
                        </span>
                      </div>
                      {/* Nivel 3: Cuentas */}
                      {categoria.cuentas && categoria.cuentas.length > 0 ? (
                        <ul className="space-y-3 pl-6">
                          {categoria.cuentas.map((cuenta) => (
                            <li
                              key={cuenta.id}
                              className="flex items-center gap-2 text-xs text-muted-foreground"
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
      </PageWrapper>
    </>
  )
}
