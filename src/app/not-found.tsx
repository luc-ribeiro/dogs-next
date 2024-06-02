'use client'

import Link from "next/link"

export default function NotFound() {
  return (
    <section className="container">
      <h1 className="title">Page not found.</h1>
      <Link className="button" style={{ marginBottom: '1rem', display: 'inline-block' }} href="/">Go back</Link>
    </section>
  )
}