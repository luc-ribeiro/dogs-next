'use server'

import {  USER_GET } from "@/app/api";
import apiError from "@/functions/api-error";
import { cookies } from "next/headers";

export type User = {
  id: number
  username: string
  email: string
  nome: string
}

export default async function userGet() {
  try {
    const token = cookies().get('token')?.value
    if (!token) throw new Error('Token not found.')

    const { url } = USER_GET()
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      next: {
        revalidate: 60,
      }
    })

    if (!response.ok) {
      throw new Error('Error on fetching user.')
    }

    const data = await response.json() as User

    return { data, ok: true, error: '' }

  } catch (error: unknown) {
    return apiError(error)
  }
}