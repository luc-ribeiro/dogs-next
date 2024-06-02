'use server'

import { TOKEN_VALIDATE_POST } from "@/app/api"
import apiError from "@/functions/api-error"
import { cookies } from "next/headers"

export default async function validateToken() {
  try {
    const token = cookies().get('token')?.value

    if (!token) {
      throw new Error ('Unauthorized.')
    }

    const { url } = TOKEN_VALIDATE_POST()
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      }
    },)

    if (!response.ok) throw new Error('Error on validate token.')

    const data = await response.json()

    return { data, ok: true, error: '' }
  } catch (error) {
    return apiError(error)
  }
}