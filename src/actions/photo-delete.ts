'use server'

import { PHOTO_DELETE } from "@/app/api";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function photoDelete(id: string) {
  const token = cookies().get('token')?.value

  try {
    if (!token) {
      throw new Error('Unauthorized.')
    }

    const { url } = PHOTO_DELETE(id)
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    if (!response.ok) {
      throw new Error('Error deleting photo.')
    }
  } catch (error: unknown) {
    return apiError(error)
  }
  revalidateTag('photos')
  redirect('/account')
}