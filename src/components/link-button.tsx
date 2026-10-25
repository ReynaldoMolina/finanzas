import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { VariantProps } from "class-variance-authority"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LinkButton extends React.ComponentProps<typeof Link> {
  href: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  children?: ReactNode
  className?: string
}

export function LinkButton({
  href,
  variant = "default",
  size = "default",
  children,
  className,
  ...props
}: LinkButton) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, size, className }),
        "cursor-default"
      )}
      {...props}
    >
      {children && children}
    </Link>
  )
}
