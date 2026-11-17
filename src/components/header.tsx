"use client"

import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import Link from "next/link"
import { SettingsIcon } from "lucide-react"
import { ThemePicker } from "./theme-picker"
import LogoutForm from "./forms/login/logout-form"

interface SiteHeader {
  title: string
  createUrl?: string
}

export function AppHeader({ title }: SiteHeader) {
  const { data: session } = authClient.useSession()

  const user = session?.user ?? {
    name: "Usuario",
    email: "usuario@mail.com",
    image: "",
  }

  return (
    <header className="sticky top-0 z-20 flex w-full items-center gap-2 border-b bg-background px-3 py-2">
      <span>{title}</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton={false}
          render={
            <Avatar size="sm" className="ml-auto">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback>
                {user.name.substring(0, 1).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          }
        />
        <DropdownMenuContent className="w-fit">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback>
                {user.name.substring(0, 1).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem render={<Link href="/ajustes" />}>
              <SettingsIcon />
              Ajustes
            </DropdownMenuItem>
            <ThemePicker />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <LogoutForm />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
