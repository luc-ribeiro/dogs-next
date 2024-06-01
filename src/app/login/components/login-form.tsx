'use client'

import styles from './login-form.module.css'
import login from "@/actions/login";
import Button from "@/components/button/button";
import ErrorMessage from "@/components/helper/error-message";
import Input from "@/components/input/input";
import Link from "next/link";
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
      <form action={action} className={styles.form}>
        <Input label="Username" name="username" type='text' />
        <Input label="Password" name="password" type='password'/>
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <Link className={styles.lost} href="/login/lost-password">Forgot your password?</Link>
      <div className={styles.signup}>
        <h2 className={styles.subtitle}>Sign Up</h2>
        <p>Don&apos;t have an account yet?</p>
        <Link className='button' href="/login/create-account">Sign Up</Link>
      </div>
    </>
  )
}