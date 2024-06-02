import { notFound } from "next/navigation"

import photoGet from "@/actions/photo-get"

import FeedModal from "@/components/feed/feed-modal"

type PageParams = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageParams) {
  const { data } = await photoGet(params.id)

  if (!data) return { title: 'Photos' }

  return {
    title: `${data.photo.title} | Dogs`
  }
}

export default async function PhotoIdPage({ params }: PageParams) {
  const { data } = await photoGet(params.id)

  if (!data) return notFound()
  return (
    <FeedModal photo={data} />
  )
}