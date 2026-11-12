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

  const { data: session } = authClient.useSession()

  const user = session?.user ?? {
    name: "Usuario",
    email: "usuario@mail.com",
    image: "",
  }

  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar>
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback>
            {user.name.substring(0, 1).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{user.name}</ItemTitle>
        <ItemDescription>{user.email}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="destructive"
          aria-label="Cerrar sesión"
          onClick={handleLogout}
        >
          <LogOutIcon />
          Salir
        </Button>
      </ItemActions>
    </Item>
  )
}
