export const dynamic = "force-dynamic"

import { CreateArqueoForm } from "@/components/forms/arqueo/create"
import { getCuentasActivosArqueo } from "@/database/get-data/arqueo"

export const metadata = {
  title: "Crear arqueo",
}

export default async function Page() {
  const { data } = await getCuentasActivosArqueo()

  return <CreateArqueoForm cuentas={data} />
}
