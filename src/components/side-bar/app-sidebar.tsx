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
} from "@/src/components/ui/sidebar"
import { MenuItem } from "./menu-item"
import {
  MoveDownRight,
  MoveUpRight,
  Coins,
  UserRoundPlus,
  UserRoundMinus,
  ArrowLeftRight,
  List,
  DollarSign,
  Settings,
} from "lucide-react"

export const menuOptions = [
  {
    name: "Cuentas",
    url: "/",
    icon: List,
  },
  {
    name: "Arqueo",
    url: "/arqueo",
    icon: Coins,
  },
  {
    name: "Gastos",
    url: "/gastos",
    icon: MoveDownRight,
  },
  {
    name: "Ingresos",
    url: "/ingresos",
    icon: MoveUpRight,
  },
  {
    name: "Por cobrar",
    url: "/por-cobrar",
    icon: UserRoundPlus,
  },
  {
    name: "Por pagar",
    url: "/por-pagar",
    icon: UserRoundMinus,
  },
  {
    name: "Transferencias",
    url: "/transferencias",
    icon: ArrowLeftRight,
  },
  {
    name: "Configuración",
    url: "/configuracion",
    icon: Settings,
  },
]

export type MenuOption = (typeof menuOptions)[number]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex aspect-square size-6 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
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
              {menuOptions.map((item) => (
                <MenuItem key={item.name} option={item}></MenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
