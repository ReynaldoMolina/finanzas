import { MoreVertical, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { ThemePicker } from "../theme-picker"
import LogoutForm from "../forms/login/logout-form"
import { authClient } from "@/lib/auth-client"

export function AppSidebarFooter() {
  const { setOpenMobile } = useSidebar()

  const { data: session } = authClient.useSession()

  const user = session?.user ?? {
    name: "Usuario",
    email: "usuario@mail.com",
    image: "",
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar>
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback>
                    {user.name.substring(0, 1).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <MoreVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            align="end"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={<Link href="/ajustes" />}
                onClick={() => setOpenMobile(false)}
              >
                <Settings />
                Ajustes
              </DropdownMenuItem>
              <ThemePicker />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <LogoutForm />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
