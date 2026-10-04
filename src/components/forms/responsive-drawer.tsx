"use client"

import { act, ReactNode, useState } from "react"
import { useIsMobile } from "@/src/hooks/use-mobile"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { Pencil, Plus } from "lucide-react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Spinner } from "@/components/ui/spinner"

interface ResponsiveDrawerProps {
  children: ReactNode
  action: "edit" | "create"
  formId: string
  name?: string
  isPending: boolean
}

export function ResponsiveDrawer({
  children,
  action,
  formId,
  name,
  isPending = false,
}: ResponsiveDrawerProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const title =
    action === "create"
      ? `Crear ${name ? ` - ${name}` : ""}`
      : `Editar ${name ? ` - ${name}` : ""}`
  const description = `${action === "create" ? "Agrega" : "Edita"} la información.`
  const buttonText = action === "create" ? "Crear" : "Guardar"

  if (isMobile)
    return (
      <Drawer showSwipeHandle open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<Button variant="outline" size="icon-sm" />}>
          {action === "create" ? <Plus /> : <Pencil />}
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">{children}</div>
          <DrawerFooter>
            <Button type="submit" form={formId} onClick={() => setOpen(false)}>
              {isPending && <Spinner />}
              {buttonText}
            </Button>
            <DrawerClose render={<Button variant="outline" />}>
              Cancelar
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon-sm">
            {action === "create" ? <Plus /> : <Pencil />}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button type="submit" form={formId} onClick={() => setOpen(false)}>
            {isPending && <Spinner />}
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
