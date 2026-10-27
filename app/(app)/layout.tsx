import { AppDocker } from "@/components/docker/app-docker"
import { AppSidebar } from "@/components/side-bar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <div className="relative">
    <SidebarProvider>
      <AppSidebar />
      <main className="w-dvw text-sm">{children}</main>
    </SidebarProvider>
    //   <AppDocker />
    // </div>
  )
}
