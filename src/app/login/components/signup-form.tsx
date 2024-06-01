'use client'

import styles from './login-form.module.css'
import signUp from '@/actions/signup';
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
        (<Button disabled>Signing up!</Button>) :
        (<Button>Sign Up</Button>)}
    </>
  )
}

export default function SignUpForm() {
  const [state, action] = useFormState(signUp, {
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
    <form action={action} className={styles.form}>
      <Input label="Username" name="username" type='text' />
      <Input label="Email" name="email" type='email' />
      <Input label="Password" name="password" type='password' />
      <ErrorMessage error={state.error} />
      <FormButton />
    </form>
  )
}