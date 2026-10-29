import { getCategoriasActivo } from "@/database/get-data/categoria"
import { getAjustes } from "@/database/get-data/ajustes"
import { EditAjustesForm } from "../forms/configuracion/edit"

export async function AjustesWrapper() {
  const { data } = await getAjustes()
  const { data: cuentas } = await getCategoriasActivo()

  return <EditAjustesForm ajustes={data} cuentas={cuentas} />
}
