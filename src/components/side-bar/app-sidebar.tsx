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
import { Coins, ArrowLeftRight, List, DollarSign } from "lucide-react"
import { AppSidebarFooter } from "./footer"

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
    name: "Arqueos",
    url: "/arqueo",
    icon: Coins,
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
              <div className="flex size-6 items-center justify-center bg-sidebar-primary text-white">
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
      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  )
}
