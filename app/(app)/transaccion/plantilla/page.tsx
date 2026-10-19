import { Suspense } from "react"
import { Loading } from "@/components/loading"
import { TransaccionFrecuenteMenuWrapper } from "@/components/wrappers/transaccion-frecuente-menu"
import { ResponsiveDrawerMenu } from "@/components/responsive-drawer-menu"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item"
import { ZapIcon, ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const title = "Plantillas"

export const metadata = {
  title: title,
}

const plantillas = ["Ingreso", "Gasto", "Transferencia"]

export default async function Page() {
  return (
    <ResponsiveDrawerMenu>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground">Plantillas</span>
          <div className="flex flex-wrap gap-1">
            {plantillas.map((item, index) => (
              <Link key={index} href={`/transaccion/crear?tipo=${item}`}>
                <Button variant="secondary">{item}</Button>
              </Link>
            ))}
            <Link href="/transaccion/crear">
              <Button variant="secondary">En blanco</Button>
            </Link>
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <TransaccionFrecuenteMenuWrapper />
        </Suspense>
        <Item
          variant="outline"
          render={<Link href="/configuracion/plantilla" />}
        >
          <ItemMedia variant="icon">
            <ZapIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Editar plantilla</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon size="16" />
          </ItemActions>
        </Item>
      </div>
    </ResponsiveDrawerMenu>
  )
}
