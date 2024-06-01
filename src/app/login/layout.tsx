import styles from './login.module.css'

interface LayoutProps {
  children: React.ReactNode
}

export default async function LoginLayout({children}: LayoutProps) {
  return (
    <div className={styles.login}>
      <div className={styles.forms}>
      {children}
      </div>
    </div>
  )
}