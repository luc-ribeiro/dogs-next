import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot password | Dogs",
  description: 'Recover your password.'
}

export default async function LostPasswordPage() {
  return (
  <main>
    <h1>LostPasswordPage</h1>
  </main>
  )
}