import type { Metadata } from "next"
import ResetPasswordForm from "../components/reset-password-form"

export const metadata: Metadata = {
  title: "Reset password | Dogs",
  description: 'Reset your password.'
}

type ResetSearchParams = {
  searchParams: {
    key: string;
    login: string
  }
}

export default async function ResetPasswordPage({ searchParams }: ResetSearchParams) {
  return (
    <div className="animeLeft">
      <h1 className="title">Reset Password</h1>
      <ResetPasswordForm keyToken={searchParams.key} login={searchParams.login} />
    </div>
  )
}