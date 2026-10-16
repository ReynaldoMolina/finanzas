"use client"

import { useTransition } from "react"
import { LogOut } from "lucide-react"
import { Spinner } from "../../ui/spinner"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LogoutForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login")
          },
        },
      })
    })
  }

  return (
    <Button disabled={isPending} onClick={handleLogout}>
      {isPending ? <Spinner /> : <LogOut />}
      Cerrar sesión
    </Button>
  )
}
