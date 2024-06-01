import type { Metadata } from "next"
import SignUpForm from "../components/signup-form"

export const metadata: Metadata = {
  title: "Sign Up",
  description: 'Create your account on Dogs website.'
}

export default async function CreatePage() {
  return (
  <div className="animeLeft">
    <h1 className="title">Sign Up</h1>
    <SignUpForm />
  </div>
  )
}