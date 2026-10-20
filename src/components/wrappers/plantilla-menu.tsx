import { getPlantillasPage } from "@/database/get-data/plantilla"
import { Button } from "../ui/button"
import Link from "next/link"

export async function PlantillaMenuWrapper() {
  const { data: transaccionesFrecuentes } = await getPlantillasPage()

  return (
    <>
      {transaccionesFrecuentes.map((item) => (
        <div key={item.tipo} className="flex flex-col gap-2">
          <span className="text-muted-foreground">{item.tipo}s</span>
          <div className="flex flex-wrap gap-1">
            {item.items.map((i) => (
              <Link
                key={i.nombre}
                href={`/transaccion/crear?tipo=${item.tipo}&monto=${Number(i.monto) === 0 ? "" : i.monto}&origen=${i.id_cuenta_origen}&destino=${i.id_cuenta_destino}&descripcion=${i.descripcion}`}
              >
                <Button variant="secondary">{i.nombre}</Button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
