import type { Photo } from "@/actions/photos-get";
import FeedPhotos from "./feed-photos";

interface Props {
  photos: Photo[]
}

export default function Feed({ photos }: Props) {
  return (
    <div >
      <FeedPhotos photos={photos} />
    </div>
  );
}
