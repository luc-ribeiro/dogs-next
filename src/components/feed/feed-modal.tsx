'use client'

import { usePathname, useRouter } from 'next/navigation';

import styles from './feed-modal.module.css'

import type { PhotoData } from "@/actions/photo-get";

import PhotoContent from "@/app/photo/components/photo-content";

export default function FeedModal({ photo }: { photo: PhotoData }) {
  const router = useRouter()
  const pathname = usePathname()

  if (!pathname.includes('photo')) {
    return null;
  }

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      router.back()
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <PhotoContent data={photo} single={false} />
    </div>
  )
}