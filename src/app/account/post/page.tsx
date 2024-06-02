import AccountPhotoPost from "../components/account-photo-post"
import type { Metadata } from "next"

// export const runtime = 'edge'

export const metadata: Metadata = {
  title: "Post | My Account",
}

export default async function PostPage() {
  return (
    <AccountPhotoPost />
  )
}