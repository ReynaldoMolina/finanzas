"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { menuItems } from "../side-bar/app-sidebar"
import { LinkButton } from "../link-button"
import { usePathname } from "next/navigation"

export function AppDocker() {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  if (isMobile)
    return (
      <div className="sticky bottom-0 mx-auto flex w-fit gap-2 rounded-lg bg-sidebar p-2">
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

  return null
}
