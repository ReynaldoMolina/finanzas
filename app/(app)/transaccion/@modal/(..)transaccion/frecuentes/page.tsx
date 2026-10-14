import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ResponsiveDrawerMenu } from "@/components/responsive-drawer-menu"
import { getTransaccionesFrecuentesPage } from "@/database/get-data/transaccion-frecuente"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item"
import { ListIcon, ChevronRightIcon, RepeatIcon, ZapIcon } from "lucide-react"

const title = "Transacciones frecuentes"

export const metadata = {
  title: title,
}

export default async function Page() {
  const { data: transaccionesFrecuentes } =
    await getTransaccionesFrecuentesPage()

  return (
    <>
      <ResponsiveDrawerMenu>
        <div className="flex flex-col gap-5">
          {transaccionesFrecuentes.map((item) => (
            <div key={item.tipo} className="flex flex-col gap-2">
              <span className="text-muted-foreground">{item.tipo}s</span>
              <div className="flex flex-wrap gap-1">
                {item.items.map((i) => (
                  <Link
                    key={i.nombre}
                    href={`/transaccion/crear?tipo=${item.tipo}&monto=${i.monto}&origen=${i.id_cuenta_origen}&destino=${i.id_cuenta_destino}&descripcion=${i.descripcion}`}
                  >
                    <Button variant="secondary">{i.nombre}</Button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Item
            variant="outline"
            render={<Link href="/transaccion-frecuente" />}
          >
            <ItemMedia variant="icon">
              <ZapIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Transacciones frecuentes</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon size="16" />
            </ItemActions>
          </Item>
        </div>
      </ResponsiveDrawerMenu>
    </>
  )
}
