import {
  getArqueoById,
  getCuentasActivosArqueo,
} from "@/database/get-data/arqueo"
import { notFound } from "next/navigation"
import { EditArqueoForm } from "../forms/arqueo/edit"

interface Props {
  id: string
}

export async function ArqueoEditWrapper({ id }: Props) {
  const { data } = await getArqueoById(id)

  if (!data) return notFound()

  const { data: cuentas } = await getCuentasActivosArqueo(data.id_cuenta)

  return <EditArqueoForm arqueo={data} cuentas={cuentas} />
}
