import { EditArqueoForm } from "@/components/forms/arqueo/edit"
import { getArqueoById } from "@/database/get-data/arqueo"
import { getCuentasActivos } from "@/database/get-data/cuenta"
import { PageProps } from "@/types"

export const metadata = {
  title: "Editar arqueo",
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const { data } = await getArqueoById(id)
  const { data: cuentas } = await getCuentasActivos()

  return <EditArqueoForm arqueo={data} cuentas={cuentas} />
}
