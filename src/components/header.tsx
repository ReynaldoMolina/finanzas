import { ReactNode } from "react"

interface SiteHeader {
  children?: ReactNode
  title: string
  createUrl?: string
}

export function AppHeader({ children, title }: SiteHeader) {
  return (
    <header className="sticky top-0 z-20 flex w-full items-center gap-2 border-b bg-background px-2 py-3 md:px-3">
      <span>{title}</span>
      {children && <div className="ml-auto">{children}</div>}
    </header>
  )
}
