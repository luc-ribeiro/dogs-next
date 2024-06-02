import photoGet from "@/actions/photo-get"
import PhotoContent from "../components/photo-content"
import { notFound } from "next/navigation"

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
    <section className="container mainContainer">
      <PhotoContent data={data} single={true} />
    </section>
  )
}