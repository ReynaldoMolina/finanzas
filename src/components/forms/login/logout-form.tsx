"use client"

import { useTransition } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"

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
    <DropdownMenuGroup>
      <DropdownMenuItem variant="destructive" onClick={handleLogout}>
        <LogOutIcon />
        Cerrar sesión
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}
