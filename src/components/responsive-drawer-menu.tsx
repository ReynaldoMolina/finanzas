"use client"

import { ReactNode, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

interface ResponsiveDrawerMenuProps {
  children: ReactNode
}

export function ResponsiveDrawerMenu({ children }: ResponsiveDrawerMenuProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      router.back()
    }
  }

  return (
    <Drawer
      showSwipeHandle={isMobile}
      open={open}
      onOpenChange={handleOpenChange}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Crear transacción</DrawerTitle>
          <DrawerDescription>Elige una opción</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">{children}</div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Cerrar
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
