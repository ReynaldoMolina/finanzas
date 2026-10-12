import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toast"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/side-bar/app-sidebar"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: {
    template: "Finanzas - %s",
    default: "Finanzas",
  },
  description: "Aplicación de gestión de finanzas personales.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider defaultTheme="system">
          <SidebarProvider>
            <AppSidebar />
            <main className="w-dvw text-sm">{children}</main>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
