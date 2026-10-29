import { getCuentas } from "@/database/get-data/cuenta"
import { PageWrapperType } from "@/types"
import { formatNumber } from "@/lib/formatters"
import { TagIcon } from "lucide-react"
import { CuentaCollapsible } from "../cuenta-collapsible"
import { getAjustesCambioDolar } from "@/database/get-data/ajustes"

export async function CuentaWrapper({ searchParams }: PageWrapperType) {
  const { data } = await getCuentas(searchParams)
  const { cambio_dolar } = await getAjustesCambioDolar()
  const [, gastos, ingresos] = data

  const salario = ingresos.categorias.find((e) => e.id === 6)
  const pedidosYa = salario?.cuentas.find((e) => e.id === 46)?.saldo ?? 0

  const deducciones = gastos.categorias.find((e) => e.id === 9)?.subtotal ?? 0
  const moto = gastos.categorias.find((e) => e.id === 8)?.subtotal ?? 0

  const utilidad = ingresos.subtotal - gastos.subtotal
  const gananciaPeya = pedidosYa - deducciones - moto

  return (
    <div className="mt-4 max-w-2xl space-y-12">
      {/* data */}
      {data.map((tipo) => (
        <section key={tipo.nombre} className="space-y-0">
          {/* Nivel 1: Tipo */}
          <div className="mx-2.5 flex items-center gap-2 pb-2 font-semibold">
            <TagIcon size={16} />
            <h2>{tipo.nombre}s</h2>
            <span className="ml-auto">{formatNumber(tipo.subtotal)}</span>
          </div>

          {/* Nivel 2: Categoría */}
          <CuentaCollapsible tipo={tipo} cambio_dolar={cambio_dolar} />
        </section>
      ))}

      <section className="space-y-0">
        <div className="mx-2.5 flex items-center gap-2 pb-2 font-semibold">
          <TagIcon size={16} />
          <h2>Utilidad</h2>
          <span className="ml-auto">
            {formatNumber(utilidad + gananciaPeya)}
          </span>
        </div>

        <ul className="ml-6">
          <li className="flex items-center gap-2 px-2.5 py-2 text-muted-foreground not-last:border-b">
            <span>Ingresos - Gastos</span>
            <span className="ml-auto">{formatNumber(utilidad)}</span>
          </li>
          <li className="flex items-center gap-2 px-2.5 py-2 text-muted-foreground not-last:border-b">
            <span>PedidosYa</span>
            <span className="ml-auto">{formatNumber(gananciaPeya)}</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
