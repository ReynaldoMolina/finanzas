import { Button } from "@/components/ui/button"
import { ArrowLeft, Frown } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "No autorizado",
}

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Frown className="w-10" />
      <h2 className="text-xl font-semibold">Lo sentimos</h2>
      <p>Tu usuario no está autorizado.</p>

      <Link href="/auth/login">
        <Button type="button" variant="secondary" className="mt-5">
          <ArrowLeft />
          Regresar
        </Button>
      </Link>
    </main>
  )
}
