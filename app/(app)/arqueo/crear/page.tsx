export const dynamic = "force-dynamic"

import { CreateArqueoForm } from "@/components/forms/arqueo/create"
import { ResponsiveDrawer } from "@/components/responsive-drawer"
import { getCuentasActivosArqueo } from "@/database/get-data/arqueo"

const title = "Crear arqueo"

export const metadata = { title }

export default async function Page() {
  const { data } = await getCuentasActivosArqueo()

  return (
    <ResponsiveDrawer title={title}>
      <CreateArqueoForm cuentas={data} />
    </ResponsiveDrawer>
  )
}
