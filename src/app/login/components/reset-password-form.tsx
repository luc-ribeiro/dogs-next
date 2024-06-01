'use client'

import lostPassword from '@/actions/lost-password';
import styles from './login-form.module.css'
import Button from "@/components/button/button";
import ErrorMessage from "@/components/helper/error-message";
import Input from "@/components/input/input";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import resetPassword from '@/actions/reset-password';

type ResetSearchParams = {
  keyToken: string;
  login: string
}

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ?
        (<Button disabled>Reseting...</Button>) :
        (<Button>Reset Password</Button>)}
    </>
  )
}

export default function ResetPasswordForm({ keyToken, login }: ResetSearchParams) {
  const [state, action] = useFormState(resetPassword, {
    ok: false,
    error: '',
    data: null
  })

  return (
    <form action={action} className={styles.form}>
      <Input label="New Password" name="password" type='password' />
      <input type='hidden' name='login' value={login} />
      <input type='hidden' name='key' value={keyToken} />
      <ErrorMessage error={state.error} />
      <FormButton />
    </form>
  )
}