import type { Metadata } from "next"
import LostPasswordForm from "../components/lost-password-form"

export const metadata: Metadata = {
  title: "Forgot password | Dogs",
  description: 'Recover your password.'
}

export default async function LostPasswordPage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Lost Password?</h1>
      <LostPasswordForm />
    </div>
  )
}