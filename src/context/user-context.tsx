'use client'

import logout from "@/actions/logout";
import validateToken from "@/actions/validate-token";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = {
  id: number
  nome: string
  username: string
  email: string
}

type IUserContext = {
  user: User | null
  setUser: (user: User | null) => void
}

type IUserContextProvider = {
  children: ReactNode
  user: User | null
}

const UserContext = createContext<IUserContext | null>(null)

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === null) {
    throw new Error('useContext must be used within a UserContextProvider')
  }

  return context
}

export function UserContextProvider({ children, user }:
  IUserContextProvider) {
  const [userState, setUser] = useState<User | null>(user)

  useEffect(() => {
    async function validate() {
      const { ok } = await validateToken()

      if (!ok) await logout()
    }
    if (userState) validate()
  }, [userState])

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  )
}