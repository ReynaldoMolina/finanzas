import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar"
import { MenuItemType } from "./app-sidebar"

interface MenuItemProps {
  item: MenuItemType
}

export function MenuItem({ item }: MenuItemProps) {
  const { setOpenMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarMenuItem key={item.name}>
      <SidebarMenuButton
        render={<Link href={item.url} />}
        onClick={() => setOpenMobile(false)}
        isActive={item.url === pathname}
        size="lg"
      >
        <item.icon />
        <span className="text-sm">{item.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
