"use client"

import { ReactNode, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Spinner } from "@/components/ui/spinner"
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

interface ResponsiveDrawerProps {
  children: ReactNode
  action: "edit" | "create"
  formId: string
  name?: string
  isPending: boolean
  isOpen?: boolean
}

export function ResponsiveDrawer({
  children,
  action,
  formId,
  name,
  isPending = false,
  isOpen = false,
}: ResponsiveDrawerProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(isOpen)
  const title =
    action === "create"
      ? `Crear ${name ? ` ${name}` : ""}`
      : `Editar ${name ? ` ${name}` : ""}`
  const description = `${action === "create" ? "Agrega" : "Edita"} la información.`
  const buttonText = action === "create" ? "Crear" : "Guardar"

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
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">{children}</div>
        <DrawerFooter>
          <Button type="submit" form={formId}>
            {isPending && <Spinner />}
            {buttonText} {name}
          </Button>
          <DrawerClose render={<Button variant="outline" />}>
            Cancelar
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
