'use server'

import { LOST_PASSWORD } from "@/app/api";
import apiError from "@/functions/api-error";

interface StateType {
  ok: boolean
  error: string
  data: null
}

export default async function lostPassword(state: StateType, formData: FormData) {
  const login = formData.get('login') as string | null;
  const urlLost = formData.get('url') as string | null;

  try {
    if (!login) {
      throw new Error('Field is required.')
    }

    const { url } = LOST_PASSWORD()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, url: urlLost }),
    })

    if (!response.ok) {
      throw new Error('Email or username does not exist.')
    }

    return { data: null, ok: true, error: '' }

  } catch (error: unknown) {
    return apiError(error)
  }
}