'use server'

import { PHOTO_POST } from "@/app/api";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface StateType {
  ok: boolean
  error: string
  data: null
}

export default async function photoPost(state: StateType, formData: FormData) {
  const token = cookies().get('token')?.value

  const nome = formData.get('nome') as string | null;
  const idade = formData.get('idade') as string | null;
  const peso = formData.get('peso') as string | null;
  const img = formData.get('img') as File;

  try {
    if (!token || !nome || !idade || !peso || img.size === 0) {
      throw new Error('All fields are required.')
    }

    const { url } = PHOTO_POST()
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Email or username already exists.')
    }
  } catch (error: unknown) {
    return apiError(error)
  }
  revalidateTag('photos')
  redirect('/account')
}