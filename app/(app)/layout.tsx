import { AppSidebar } from "@/components/side-bar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-dvw text-sm">{children}</main>
    </SidebarProvider>
  )
}
