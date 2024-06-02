import type { Metadata } from "next"
import Feed from "@/components/feed/feed"
import photosGet from "@/actions/photos-get"
import userGet from "@/actions/user-get"
import Link from "next/link"

export const metadata: Metadata = {
  title: "My Account",
}

export default async function AccountPage() {
  const { data: user } = await userGet()
  const { data } = await photosGet({ user: user?.username })

  return (
    <section>
      {data?.length ? <Feed photos={data} /> :
        (<div>
          <p
            style={{
              color: '#444',
              fontSize: '1.25rem',
              marginBottom: '1rem'
            }}>
            No photos yet
          </p>
          <Link href='/account/post' className="button" style={{ display: 'inline-block' }}>Post Photo</Link>
        </div>
        )}
    </section>
  )
}