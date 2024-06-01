import type { Metadata } from "next";
import LoginForm from "./components/login-form";

export const metadata: Metadata = {
  title: "Login | Dogs",
  description: 'Login on Dogs website.'
}

export default async function LoginPage() {
  return (
  <section className="animeLeft">
    <h1 className="title">Login</h1>
    <LoginForm />
  </section>
  )
}