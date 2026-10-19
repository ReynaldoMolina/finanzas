import { PageWrapperType } from "@/types"
import { getPlantillas } from "@/database/get-data/plantilla"
import { PlantillaTabla } from "../table/plantilla-table"

export default async function PlantillaWrapper({
  searchParams,
}: PageWrapperType) {
  const { data } = await getPlantillas(searchParams)

  return <PlantillaTabla data={data} />
}
