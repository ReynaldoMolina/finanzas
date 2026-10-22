export const dynamic = "force-dynamic"

import { EditArqueoForm } from "@/components/forms/arqueo/edit"
import {
  getArqueoById,
  getCuentasActivosArqueo,
} from "@/database/get-data/arqueo"
import { PageProps } from "@/types"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Editar arqueo",
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const { data } = await getArqueoById(id)

  if (!data) return notFound()

  const { data: cuentas } = await getCuentasActivosArqueo(data.id_cuenta)

  return <EditArqueoForm arqueo={data} cuentas={cuentas} />
}
