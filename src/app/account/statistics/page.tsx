import statsGet from "@/actions/stats-get"
import type { Metadata } from "next"
import dynamic from "next/dynamic"

const AccountStats = dynamic(() => import('./components/account-stats'), { 
  loading: () => <p>Loading...</p>,
  ssr: false 
})

export const metadata: Metadata = {
  title: "Statistics | My Account",
}

export default async function StatisticsPage() {
  const { data } = await statsGet()

  if (!data) return null
  return (
    <section>
      <AccountStats data={data} />
    </section>
  )
}