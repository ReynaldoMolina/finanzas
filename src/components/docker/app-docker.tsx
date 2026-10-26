"use client"

import { menuItems } from "../side-bar/app-sidebar"
import { LinkButton } from "../link-button"
import { usePathname } from "next/navigation"

export function AppDocker() {
  const pathname = usePathname()

  return (
    <div className="sticky bottom-0 mx-auto flex w-fit gap-2 rounded-tl-lg rounded-tr-lg bg-sidebar p-2 ring-1 ring-sidebar-border md:hidden">
      {menuItems.map((item) => {
        const isActive =
          item.url === "/" ? pathname === "/" : pathname.startsWith(item.url)

        return (
          <LinkButton
            key={item.name}
            href={item.url}
            variant={isActive ? "outline" : "ghost"}
            size="icon-lg"
          >
            {<item.icon />}
          </LinkButton>
        )
      })}
    </div>
  )
}
