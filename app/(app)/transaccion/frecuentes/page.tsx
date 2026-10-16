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

const title = "Transacciones frecuentes"

export const metadata = {
  title: title,
}

export default async function Page() {
  return (
    <ResponsiveDrawerMenu>
      <div className="flex flex-col gap-5">
        <Suspense fallback={<Loading />}>
          <TransaccionFrecuenteMenuWrapper />
        </Suspense>
        <Item variant="outline" render={<Link href="/transaccion-frecuente" />}>
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
  )
}
