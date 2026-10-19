"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MenuItem } from "./menu-item"
import {
  Coins,
  ArrowLeftRight,
  List,
  DollarSign,
  Settings,
  ZapIcon,
} from "lucide-react"

export const menuItems = [
  {
    name: "Cuentas",
    url: "/",
    icon: List,
  },
  {
    name: "Transacciones",
    url: "/transaccion",
    icon: ArrowLeftRight,
  },
  {
    name: "Arqueo",
    url: "/arqueo",
    icon: Coins,
  },
  {
    name: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
]

export type MenuItemType = (typeof menuItems)[number]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-6 items-center justify-center rounded bg-sidebar-primary text-white">
                <DollarSign />
              </div>
              <span className="text-sm">Finanzas</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <MenuItem key={item.name} item={item}></MenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
