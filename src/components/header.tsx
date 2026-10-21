import { ReactNode } from "react"
import { BackButton } from "./back-button"
import { SidebarTrigger } from "./ui/sidebar"

interface SiteHeader {
  children?: ReactNode
  title: string
  createUrl?: string
  showBackButton?: boolean
}

export function AppHeader({
  children,
  title,
  showBackButton = false,
}: SiteHeader) {
  return (
    <header className="sticky top-0 z-5 flex w-full items-center gap-2 border-b bg-background px-2 py-1">
      {showBackButton ? <BackButton /> : <SidebarTrigger size="icon" />}
      <span>{title}</span>
      {children && <div className="ml-auto">{children}</div>}
    </header>
  )
}
