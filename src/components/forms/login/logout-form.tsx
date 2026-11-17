"use client"

import { useTransition } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function LogoutForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/login")
          },
        },
      })
    })
  }

  return (
    <DropdownMenuItem
      variant="destructive"
      aria-label="Cerrar sesión"
      onClick={handleLogout}
    >
      <LogOutIcon />
      Salir
    </DropdownMenuItem>
  )
}
