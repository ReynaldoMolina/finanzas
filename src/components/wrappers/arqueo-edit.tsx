import {
  getArqueoById,
  getCuentasActivosArqueo,
} from "@/database/get-data/arqueo"
import { notFound } from "next/navigation"
import { EditArqueoForm } from "../forms/arqueo/edit"
import { getAjustesCambioDolar } from "@/database/get-data/ajustes"

interface Props {
  id: string
}

export async function ArqueoEditWrapper({ id }: Props) {
  const { data } = await getArqueoById(id)

  if (!data) return notFound()

  const { data: cuentas } = await getCuentasActivosArqueo(data.id_cuenta)
  const { cambio_dolar } = await getAjustesCambioDolar()

  return (
    <EditArqueoForm
      arqueo={data}
      cuentas={cuentas}
      cambio_dolar={cambio_dolar}
    />
  )
}
