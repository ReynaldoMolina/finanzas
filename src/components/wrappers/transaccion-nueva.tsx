import { getPlantillasPage } from "@/database/get-data/plantilla"
import { PlantillasMenu } from "../plantillas-menu"

export async function PlantillasMenuWrapper() {
  const { data } = await getPlantillasPage()
  return <PlantillasMenu plantillas={data} />
}
