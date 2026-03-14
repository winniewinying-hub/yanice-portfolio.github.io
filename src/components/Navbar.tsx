'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.brand}>
        <span className={styles.brandEn}>HiuwingChan</span>
        <span className={styles.brandZh}>陈晓颖</span>
      </Link>
      <div className={styles.links}>
        <Link href="/#work" className={styles.link}>Work</Link>
        <Link href="/about" className={styles.link}>About</Link>
        <a
          href="mailto:hello@hiuwingchan.com"
          className={`${styles.link} ${styles.linkContact}`}
        >
          Contact ↗
        </a>
      </div>
    </nav>
  );
}
