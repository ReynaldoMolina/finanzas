import { AppSidebar } from "@/src/components/side-bar/app-sidebar"
import { SidebarProvider } from "@/src/components/ui/sidebar"

export default async function Layout({
  children,
}: React.ComponentProps<"div">) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-dvw text-sm">{children}</main>
    </SidebarProvider>
  )
}
