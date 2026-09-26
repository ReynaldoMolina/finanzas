import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Layout({
  children,
}: React.ComponentProps<"div">) {
  return (
    <div className="flex min-h-svh flex-col justify-between">
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
