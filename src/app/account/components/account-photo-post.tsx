'use client'

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import styles from './account-photo-post.module.css'

import photoPost from "@/actions/photo-post";

import Button from "@/components/button/button";
import ErrorMessage from "@/components/helper/error-message";
import Input from "@/components/input/input";

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ?
        (<Button disabled>Posting...</Button>) :
        (<Button>Post</Button>)}
    </>
  )
}

export default function AccountPhotoPost() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: '',
    data: null
  })

  const [img, setImg] = useState('')
  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]))
      console.log(target.files)
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label="Name" name="nome" type='text' />
        <Input label="Weight" name="peso" type='number' />
        <Input label="Age" name="idade" type='number' />
        <input onChange={handleImgChange} type="file" name="img" id="img" className={styles.file} />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div>
        <div className={styles.preview} style={{ backgroundImage: `url(${img})` }}></div>
      </div>
    </section>
  )
}