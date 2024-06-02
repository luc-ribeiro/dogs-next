import AccountHeader from "./components/account-header"

type LayoutProps = {
  children: React.ReactNode
}

export default async function AccountLayout({ children }: LayoutProps) {
  return (
    <div className='container'>
      <AccountHeader />
      {children}
    </div>
  )
}