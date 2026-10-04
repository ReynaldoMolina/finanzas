import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/src/components/theme-provider"
import { cn } from "@/src/lib/utils"
import { Toaster } from "@/src/components/ui/toast"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: {
    template: "%s",
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
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
