interface PageParams {
  params: {
    id: number
  }
}

export default async function PhotoIdPage({ params }: PageParams) {
  const { id } = params
  return (
    <main>
      <h1>Photo ID: {id}</h1>
    </main>
  )
}