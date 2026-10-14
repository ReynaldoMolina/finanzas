import { EditConfiguracionForm } from "@/components/forms/configuracion/edit"
import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { getCategoriasActivo } from "@/database/get-data/categoria"
import { getConfiguracion } from "@/database/get-data/configuracion"
import { ChevronRightIcon, ZapIcon } from "lucide-react"
import Link from "next/link"

const title = "Configuración"

export const metadata = {
  title: title,
}

export default async function Page() {
  const { data } = await getConfiguracion()
  const { data: cuentas } = await getCategoriasActivo()

  return (
    <>
      <AppHeader title={title} />
      <PageWrapper className="gap-8 sm:max-w-md">
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-muted-foreground">General</h2>
          <EditConfiguracionForm configuracion={data} cuentas={cuentas} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xs text-muted-foreground">Otros</h2>

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
      </PageWrapper>
    </>
  )
}
