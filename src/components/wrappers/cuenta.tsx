import { getCuentas } from "@/database/get-data/cuenta"
import { PageWrapperType } from "@/types"
import { formatNumber } from "@/lib/formatters"
import { TagIcon } from "lucide-react"
import { CuentaCollapsible } from "../cuenta-collapsible"
import { getConfiguracionCambioDolar } from "@/database/get-data/configuracion"

export default async function CuentaWrapper({ searchParams }: PageWrapperType) {
  const { data } = await getCuentas(searchParams)
  const { cambio_dolar } = await getConfiguracionCambioDolar()

  return (
    <div className="mt-4 max-w-2xl space-y-12">
      {data.map((tipo) => (
        <section key={tipo.nombre} className="space-y-0">
          {/* Nivel 1: Tipo */}
          <div className="m;-2 mr-2.5 flex items-center gap-2 pb-2 font-semibold">
            <TagIcon size={16} />
            <h2>{tipo.nombre}s</h2>
            <span className="ml-auto text-xs">
              {formatNumber(tipo.subtotal)}
            </span>
          </div>

          {/* Nivel 2: Categoría */}
          <CuentaCollapsible tipo={tipo} cambio_dolar={cambio_dolar} />
        </section>
      ))}
    </div>
  )
}
