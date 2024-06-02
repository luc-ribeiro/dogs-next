'use client'

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import styles from './account-header.module.css';

import logout from '@/actions/logout';

import useMedia from '@/hooks/use-media';

import FeedIcon from '@/components/icons/feed-icon';
import StatisticsIcon from '@/components/icons/statistics-icon';
import AddIcon from '@/components/icons/add-icon';
import LogoutIcon from '@/components/icons/logout-icon';
import { useUser } from '@/context/user-context';

function getTitle(pathname: string) {
  switch (pathname) {
    case '/account/post':
      return 'Post your photo';
    case '/account/statistics':
      return 'Statistics';
    default:
      return 'My Account';
  }
}

export default function AccountHeader () {
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const { setUser } = useUser()
  async function handleLogout() {
    await logout()
    setUser(null)
  }

  return (
    <header className={styles.header}>
      <h1 className='title'>{getTitle(pathname)}</h1>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <Link href="/account" className={pathname === '/account' ? 'active' : ''}>
          <FeedIcon />
          {mobile && 'My photos'}
        </Link>
        <Link href="/account/statistics" className={pathname === '/account/statistics' ? 'active' : ''}>
          <StatisticsIcon />
          {mobile && 'Statistics'}
        </Link>
        <Link href="/account/post" className={pathname === '/account/post' ? 'active' : ''}>
          <AddIcon />
          {mobile && 'Add photo'}
        </Link>
        <button onClick={handleLogout}>
          <LogoutIcon />
          {mobile && 'Sair'}
        </button>
      </nav>
    </header>
  );
};