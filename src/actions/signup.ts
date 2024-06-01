'use server'

import { SIGNUP } from "@/app/api";
import apiError from "@/functions/api-error";
import login from "./login";

interface StateType {
  ok: boolean
  error: string
  data: null
}

export default async function signUp(state: StateType, formData: FormData) {
  const username = formData.get('username') as string | null;
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  try {
    if (!username || !email || !password) {
      throw new Error('All fields are required.')
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.')
    }

    const { url } = SIGNUP()
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Email or username already exists.')
    }

    const { ok } = await login({ ok: true, error: '' }, formData)

    if (!ok) {
      throw new Error('Login error.')
    }

    return { data: null, ok: true, error: '' }

  } catch (error: unknown) {
    return apiError(error)
  }
}