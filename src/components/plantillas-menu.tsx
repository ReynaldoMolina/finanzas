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
      <DrawerContent className="h-96vh">
        <DrawerHeader>
          <DrawerTitle>Crear transacción</DrawerTitle>
          <DrawerDescription>Elige una plantilla</DrawerDescription>
        </DrawerHeader>

        <Tabs
          defaultValue="Gasto"
          className="h-[96vh] scroll-fade overflow-y-auto p-4"
        >
          <TabsList className="w-full">
            <TabsTrigger value="Gasto">Gasto</TabsTrigger>
            <TabsTrigger value="Ingreso">Ingreso</TabsTrigger>
            <TabsTrigger value="Transferencia">Transferencia</TabsTrigger>
          </TabsList>
          {plantillas.map((item) => (
            <TabsContent
              key={item.tipo}
              value={item.tipo}
              className="flex flex-col gap-1"
            >
              <LinkButton
                variant="secondary"
                className="w-full font-normal"
                size="sm"
                href={`/transaccion/crear?tipo=${item.tipo}`}
                onClick={() => setIsOpen(false)}
              >
                En blanco
                <ChevronRightIcon className="ml-auto" />
              </LinkButton>
              {item.items.map((i) => (
                <LinkButton
                  key={i.nombre}
                  variant="secondary"
                  className="w-full font-normal"
                  size="sm"
                  href={`/transaccion/crear?tipo=${item.tipo}&monto=${Number(i.monto) === 0 ? "" : i.monto}&origen=${i.id_cuenta_origen}&destino=${i.id_cuenta_destino}&descripcion=${i.descripcion}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="truncate">{i.nombre}</span>
                  <ChevronRightIcon className="ml-auto" />
                </LinkButton>
              ))}
            </TabsContent>
          ))}
        </Tabs>
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
