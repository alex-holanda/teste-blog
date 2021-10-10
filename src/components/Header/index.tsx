import { ActiveLink } from '../ActiveLink';

import Link from 'next/link';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <span>Logo</span>

        <nav>
          <ActiveLink activeClassName={styles.active} href={'/'}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink activeClassName={styles.active} href={'/posts'}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  );
}
