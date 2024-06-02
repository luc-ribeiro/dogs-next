'use client'

import { useUser } from "@/context/user-context"

export default function AccountPage() {
  const { user } = useUser()

  return (
    <main>
      <h1>Conta: {user?.nome}</h1>
    </main>
  )
}