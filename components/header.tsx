import { SidebarTrigger } from "./ui/sidebar"

interface SiteHeader {
  title: string
}

export function AppHeader({ title }: SiteHeader) {
  return (
    <header className="inline-flex w-full items-center gap-2 border-b px-2 py-1">
      <SidebarTrigger size="icon" />
      <span>{title}</span>
    </header>
  )
}
