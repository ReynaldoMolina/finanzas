import { getCategoriasActivo } from "@/database/get-data/categoria"
import { getConfiguracion } from "@/database/get-data/configuracion"
import { EditConfiguracionForm } from "../forms/configuracion/edit"

export async function ConfiguracionWrapper() {
  const { data } = await getConfiguracion()
  const { data: cuentas } = await getCategoriasActivo()

  return <EditConfiguracionForm configuracion={data} cuentas={cuentas} />
}
