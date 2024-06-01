import type { Photo } from "@/actions/photos-get";
import Image from "next/image";
import Link from "next/link";
import styles from './feed.module.css'

interface Props {
  photos: Photo[]
}

export default function FeedPhotos({ photos }: Props) {
  return (
    <ul className={`${styles.feed} animeLeft`}>
      {photos.map((photo, i) => (
        <li className={styles.photo} key={photo.id + i}>
          <Link href={`/photo/${photo.id}`} scroll={false}>
            <Image
              src={photo.src}
              width={1500}
              height={1500}
              alt={photo.title}
              sizes="80vw"
            />
            <span className={styles.views}>{photo.acessos}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
