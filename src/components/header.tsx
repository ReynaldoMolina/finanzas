import { BackButton } from "./back-button"
import { SidebarTrigger } from "./ui/sidebar"

interface SiteHeader {
  title: string
  showBackButton?: boolean
}

export function AppHeader({ title, showBackButton = false }: SiteHeader) {
  return (
    <header className="sticky top-0 inline-flex w-full items-center gap-2 border-b bg-background px-2 py-1">
      {showBackButton ? <BackButton /> : <SidebarTrigger size="icon" />}
      <span>{title}</span>
    </header>
  )
}
