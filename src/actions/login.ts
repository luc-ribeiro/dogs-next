'use server'

import { LOGIN } from "@/app/api";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";

interface StateType {
  ok: boolean
  error: string
  data?: null
}

export default async function login(state: StateType, formData: FormData) {
  const username = formData.get('username') as string | null;
  const password = formData.get('password') as string | null;

  try {
    if (!username || !password) {
      throw new Error('Username and password are required')
    }

    const { url } = LOGIN()
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Invalid credentials.')
    }

    const data = await response.json()

    cookies().set('token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 1 day
    })

    return { data: null, ok: true, error: '' }

  } catch (error: unknown) {
    return apiError(error)
  }
}