'use client'

import lostPassword from '@/actions/lost-password';
import styles from './login-form.module.css'
import Button from "@/components/button/button";
import ErrorMessage from "@/components/helper/error-message";
import Input from "@/components/input/input";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ?
        (<Button disabled>Sending...</Button>) :
        (<Button>Send email</Button>)}
    </>
  )
}

export default function LostPasswordForm() {
  const [state, action] = useFormState(lostPassword, {
    ok: false,
    error: '',
    data: null
  })

  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href.replace('lost', 'reset'))
  }, [])

  return (
    <form action={action} className={styles.form}>
      <Input label="Email / Username" name="login" type='text' />
      <input type="hidden" name="url" value={url} />
      <ErrorMessage error={state.error} />
      {state.ok ? <p style={{ color: '#4c1' }}>Check your email.</p> : (
        <FormButton />
      )}
    </form>
  )
}