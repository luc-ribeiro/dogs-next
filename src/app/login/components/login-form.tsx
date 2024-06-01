'use client'

import login from "@/actions/login";
import Button from "@/components/button/button";
import ErrorMessage from "@/components/helper/error-message";
import Input from "@/components/input/input";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ?
        (<Button disabled>Logging in...</Button>) :
        (<Button>Login</Button>)}
    </>
  )
}

export default function LoginForm() {
  const [state, action] = useFormState(login, {
    ok: false,
    error: '',
    data: null
  })

  useEffect(() => {
    if (state.ok) {
      window.location.href = '/account'
    }
  }, [state.ok])

  return (
    <>
      <form action={action}>
        <Input label="Username" name="username" type='text' />
        <Input label="Password" name="password" type='password'/>
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
    </>
  )
}