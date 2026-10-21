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
import { useEffect, useState } from "react"
import { TRANSACCION_TIPO } from "@/lib/tipos"
import { LinkButton } from "./link-button"

interface PlantillasMenu {
  plantillas: PlantillaPage[]
}

export function PlantillasMenu({ plantillas }: PlantillasMenu) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "n" &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger
        render={
          <Button variant="secondary">
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
        <div className="scroll-fade gap-3 space-y-4 overflow-y-auto p-4">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">En blanco</span>
            <div className="flex flex-wrap gap-1">
              {TRANSACCION_TIPO.map((item) => (
                <LinkButton
                  variant="secondary"
                  label={item}
                  key={item}
                  href={`/transaccion/crear?tipo=${item}`}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </div>
          {plantillas.map((item) => (
            <div key={item.tipo} className="flex flex-col gap-2">
              <span className="text-muted-foreground">{item.tipo}s</span>
              <div className="flex flex-wrap gap-1">
                {item.items.map((i) => (
                  <LinkButton
                    variant="secondary"
                    key={i.nombre}
                    label={i.nombre}
                    href={`/transaccion/crear?tipo=${item.tipo}&monto=${Number(i.monto) === 0 ? "" : i.monto}&origen=${i.id_cuenta_origen}&destino=${i.id_cuenta_destino}&descripcion=${i.descripcion}`}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
          <Item
            variant="outline"
            render={<Link href="/configuracion/plantilla" />}
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
        </div>
        <DrawerFooter>
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
