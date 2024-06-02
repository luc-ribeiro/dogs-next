'use server'

import { COMMENT_POST } from "@/app/api";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import type { Comment } from "./photo-get";

export default async function commentPost(state: {}, formData: FormData) {
  const token = cookies().get('token')?.value

  const comment = formData.get('comment') as string | null;
  const id = formData.get('id') as string | null;

  try {
    if (!token || !comment || !id) {
      throw new Error('All fields are required.')
    }

    const { url } = COMMENT_POST(id)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Error posting comment.')
    }

    const data = await response.json() as Comment
    revalidateTag('comment')
    return { data, ok: true, error: '' }
  } catch (error: unknown) {
    return apiError(error)
  }
}