"use client"

import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item"
import { ZapIcon, ChevronRightIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { PlantillaPage } from "@/types"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { TRANSACCION_TIPO } from "@/lib/tipos"
import { LinkButton } from "./link-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface PlantillasMenu {
  plantillas: PlantillaPage[]
}

export function PlantillasMenu({ plantillas }: PlantillasMenu) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger
        render={
          <Button>
            <PlusIcon />
            Nuevo
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Crear transacción</DrawerTitle>
          <DrawerDescription>Elige una plantilla</DrawerDescription>
        </DrawerHeader>
        <div className="scroll-fade overflow-y-auto p-4">
          <Tabs defaultValue="Gasto">
            <TabsList className="w-full">
              <TabsTrigger value="Gasto">Gasto</TabsTrigger>
              <TabsTrigger value="Ingreso">Ingreso</TabsTrigger>
              <TabsTrigger value="Transferencia">Transferencia</TabsTrigger>
            </TabsList>
            {plantillas.map((item) => (
              <TabsContent value={item.tipo} className="flex flex-wrap gap-1">
                <LinkButton
                  variant="secondary"
                  href={`/transaccion/crear?tipo=${item.tipo}`}
                  onClick={() => setIsOpen(false)}
                >
                  En blanco
                </LinkButton>
                {item.items.map((i) => (
                  <LinkButton
                    variant="secondary"
                    key={i.nombre}
                    href={`/transaccion/crear?tipo=${item.tipo}&monto=${Number(i.monto) === 0 ? "" : i.monto}&origen=${i.id_cuenta_origen}&destino=${i.id_cuenta_destino}&descripcion=${i.descripcion}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {i.nombre}
                  </LinkButton>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <DrawerFooter>
          <Item
            variant="outline"
            size="xs"
            render={<Link href="/ajustes/plantilla" />}
          >
            <ItemMedia variant="icon">
              <ZapIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Editar plantillas</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon size="16" />
            </ItemActions>
          </Item>
          <DrawerClose
            onClick={() => setIsOpen(false)}
            render={<Button variant="outline" />}
          >
            Cerrar
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
