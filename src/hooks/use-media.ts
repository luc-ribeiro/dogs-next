import { useEffect, useState } from 'react';

export default function useMedia (media: string) {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }
    changeMatch();
    window.addEventListener('resize', changeMatch);
    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, [media]);

  return match;
};