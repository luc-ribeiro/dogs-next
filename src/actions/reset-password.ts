'use server'

import { RESET_PASSWORD } from "@/app/api";
import apiError from "@/functions/api-error";
import { redirect } from "next/navigation";

interface StateType {
  ok: boolean
  error: string
  data: null
}

export default async function resetPassword(state: StateType, formData: FormData) {
  const login = formData.get('login') as string | null;
  const key = formData.get('key') as string | null;
  const password = formData.get('password') as string | null;

  try {
    if (!login || !key || !password) {
      throw new Error('All fields are required.')
    }

    const { url } = RESET_PASSWORD()
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Unauthorized.')
    }

  } catch (error: unknown) {
    return apiError(error)
  }
  redirect('/login')
}