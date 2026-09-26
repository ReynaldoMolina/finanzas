"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { MenuItem } from "./menu-item"
import { ArrowLeftRight, ChartNoAxesCombined, Scale, Tag } from "lucide-react"

export const menuOptions = [
  {
    name: "Resumen",
    url: "/",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Transacciones",
    url: "/transacciones",
    icon: ArrowLeftRight,
  },
  {
    name: "Arqueo",
    url: "/arqueo",
    icon: Scale,
  },
  {
    name: "Cuentas",
    url: "/cuentas",
    icon: Tag,
  },
]

export type MenuOption = (typeof menuOptions)[number]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            {menuOptions.map((item) => (
              <MenuItem key={item.name} option={item}></MenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
