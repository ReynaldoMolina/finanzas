"use client"

import Link from "next/link"
import { menuItems } from "./app-sidebar"
import { usePathname } from "next/navigation"
import { cn } from "cn"

export function AppDock() {
  const pathname = usePathname()
  return (
    <div className="sticky bottom-0 flex flex-row justify-evenly border-t border-sidebar-border bg-sidebar p-1 md:hidden">
      {menuItems.map((item) => {
        const isActive =
          item.url === "/" ? pathname === "/" : pathname.startsWith(item.url)
        return (
          <Link
            key={item.name}
            href={item.url}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={cn(
                isActive && "bg-primary",
                "flex w-12 justify-center rounded-md p-1"
              )}
            >
              <item.icon size={17} />
            </div>
            <span className={cn(isActive && "font-semibold", "text-xs")}>
              {item.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
