export const dynamic = "force-dynamic"

import { CreateArqueoForm } from "@/components/forms/arqueo/create"
import { getCuentasActivos } from "@/database/get-data/cuenta"

export const metadata = {
  title: "Crear arqueo",
}

export default async function Page() {
  const { data } = await getCuentasActivos()

  return <CreateArqueoForm cuentas={data} />
}
