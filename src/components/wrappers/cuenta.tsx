import { getCuentas } from "@/database/get-data/cuenta"
import { PageWrapperType } from "@/types"
import { formatNumber } from "@/lib/formatters"
import { TagIcon } from "lucide-react"
import { CuentaCollapsible } from "../cuenta-collapsible"

export default async function CuentaWrapper({ searchParams }: PageWrapperType) {
  const { data } = await getCuentas(searchParams)

  return (
    <div className="mt-4 max-w-2xl space-y-6">
      {data.map((tipo) => (
        <section key={tipo.nombre} className="space-y-0">
          {/* Nivel 1: Tipo */}
          <div className="flex items-center gap-2 pb-2 font-semibold">
            <TagIcon size={16} />
            <h2>{tipo.nombre}s</h2>
            <span className="mr-2.5 ml-auto">
              {formatNumber(tipo.subtotal)}
            </span>
          </div>

          {/* Nivel 2: Categoría */}
          <CuentaCollapsible tipo={tipo} />
        </section>
      ))}
    </div>
  )
}
