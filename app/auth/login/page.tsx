import { LoginForm } from "@/components/forms/login/login-form"
import { Suspense } from "react"

export const metadata = {
  title: "Iniciar sesión - Jahaira Store",
}

export default function Page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
