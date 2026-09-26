import { cn } from "@/lib/utils"
import React from "react"

interface PageWrapper {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapper) {
  return (
    <div className={cn("flex flex-col gap-2 p-2 md:gap-3 md:p-3", className)}>
      {children}
    </div>
  )
}
