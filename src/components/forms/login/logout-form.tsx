"use client"

import { useTransition } from "react"
import { Spinner } from "../../ui/spinner"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/types"

interface LogoutForm {
  user: User | undefined
}

export default function LogoutForm({ user }: LogoutForm) {
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
    <Item variant="outline">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage
            src={user?.image ? user.image : "https://github.com/evilrabbit.png"}
          />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{user ? user.name : "Usuario"}</ItemTitle>
        <ItemDescription>{user ? user.email : "Email"}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={handleLogout}
          aria-label="Salir"
        >
          {isPending && <Spinner />}
          Salir
        </Button>
      </ItemActions>
    </Item>
  )
}
