import { ButtonNotFoundBack } from "@/components/button-not-found-back"
import { Frown } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2">
      <Frown className="w-10" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>No pudimos encontrar la página.</p>
      <Link href="/">
        <ButtonNotFoundBack />
      </Link>
    </main>
  )
}
