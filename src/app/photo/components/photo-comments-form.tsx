'use client'

import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { useFormState, useFormStatus } from "react-dom"
import styles from './photo-comments-form.module.css'
import SendIcon from "@/components/icons/send-icon"
import ErrorMessage from "@/components/helper/error-message"
import type { Comment } from "@/actions/photo-get"
import commentPost from "@/actions/comment-post"

type PropTypes = {
  single: boolean
  id: number
  setComments: Dispatch<SetStateAction<Comment[]>>
}

function FormButton() {
  const { pending } = useFormStatus()
  return <button type="submit" className={styles.button} disabled={pending}>
    <SendIcon />
  </button>
}

export default function PhotoCommentsForm({ single, id, setComments }: PropTypes) {
  const [comment, setComment] = useState('')

  const [state, action] = useFormState(commentPost, {
    ok: false,
    error: '',
    data: null
  })

  useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data])
      setComment('')
    }
  }, [state])

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} action={action}>
      <input type="hidden" name="id" id="id" value={id} />
      <textarea className={styles.textarea} name="comment" id="comment" placeholder="Type something" value={comment} onChange={({ target }) => setComment(target.value)}></textarea>

      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  )
}