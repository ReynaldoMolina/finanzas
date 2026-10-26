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

interface ResponsiveDrawer {
  children: ReactNode
  title: string
}

export function ResponsiveDrawer({ children, title }: ResponsiveDrawer) {
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
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>Edita la información.</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  )
}

interface ResponsiveDrawerFooter {
  formId: string
  isPending: boolean
}

export function ResponsiveDrawerFooter({
  formId,
  isPending,
}: ResponsiveDrawerFooter) {
  return (
    <DrawerFooter>
      <Button type="submit" form={formId}>
        {isPending && <Spinner />}
        Guardar
      </Button>
      <DrawerClose render={<Button variant="outline" />}>Cancelar</DrawerClose>
    </DrawerFooter>
  )
}
