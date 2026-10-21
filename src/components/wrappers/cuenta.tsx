import { getCuentas } from "@/database/get-data/cuenta"
import { PageWrapperType } from "@/types"
import { formatNumber } from "@/lib/formatters"
import { TagIcon } from "lucide-react"
import { CuentaCollapsible } from "../cuenta-collapsible"

export default async function CuentaWrapper({ searchParams }: PageWrapperType) {
  const { data } = await getCuentas(searchParams)

  return (
    <div className="mt-2 max-w-2xl space-y-12">
      {data.map((tipo) => (
        <section key={tipo.nombre} className="relative space-y-3">
          {/* Nivel 1: Tipo */}
          <div className="sticky top-10 flex items-center gap-2 bg-background py-1.5">
            <TagIcon size={16} />
            <h2>{tipo.nombre}s</h2>
            <span className="mr-3 ml-auto">{formatNumber(tipo.subtotal)}</span>
          </div>

          {/* Nivel 2: Categoría */}
          <CuentaCollapsible tipo={tipo} />
        </section>
      ))}
    </div>
  )
}
