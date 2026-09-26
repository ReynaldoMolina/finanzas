import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { MenuOption } from "./app-sidebar"

interface MenuItem {
  option: MenuOption
}

export function MenuItem({ option }: MenuItem) {
  const pathname = usePathname()
  const optionPathname = option.url.split("?")[0]
  const isActive =
    option.url === "/" ? pathname === "/" : pathname.startsWith(optionPathname)

  return (
    <SidebarMenuItem key={option.name}>
      <SidebarMenuButton
        render={<Link href={option.url} />}
        isActive={isActive}
      >
        <option.icon />
        <span className="text-sm">{option.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
