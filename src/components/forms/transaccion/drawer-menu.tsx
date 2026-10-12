"use client"

import { ReactNode, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer"
import { Plus } from "lucide-react"
import { Button } from "../../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"

interface DrawerProps {
  children: ReactNode
  name: string
}

export function DrawerMenu({ children, name }: DrawerProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const title = `Nuevo${name ? ` ${name}` : ""}`
  const description = "Selecciona una opción."

  if (isMobile)
    return (
      <Drawer showSwipeHandle open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<Button variant="outline" />}>
          <Plus />
          Nuevo
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-4 p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline">
            <Plus />
            Nuevo
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
