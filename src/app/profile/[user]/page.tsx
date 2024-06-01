interface PageParams {
  params: {
    user: string
  }
}

export default async function ProfileUserPage({ params }: PageParams) {
  return (
  <main>
    <h1>User: {params.user}</h1>
  </main>
  )
}