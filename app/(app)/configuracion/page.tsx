import { EditConfiguracionForm } from "@/components/forms/configuracion/edit"
import { AppHeader } from "@/components/header"
import { PageWrapper } from "@/components/page-wrapper"
import { getCategoriasActivo } from "@/database/get-data/categoria"
import { getConfiguracion } from "@/database/get-data/configuracion"

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
        <EditConfiguracionForm configuracion={data} cuentas={cuentas} />
      </PageWrapper>
    </>
  )
}
