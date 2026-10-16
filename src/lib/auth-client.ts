import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { auth } from "./auth"

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: 'http://localhost:3000',
  plugins: [nextCookies(), inferAdditionalFields<typeof auth>()],
})
