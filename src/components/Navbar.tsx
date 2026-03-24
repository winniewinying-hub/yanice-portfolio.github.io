'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('/');
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      if (!isHome) return; // on subpages, don't track scroll sections

      const scrollPos = window.scrollY + 100;
      const about = document.getElementById('about')?.offsetTop || 0;
      const projects = document.getElementById('projects')?.offsetTop || 0;
      const contact = document.getElementById('contact')?.offsetTop || 0;

      if (contact > 0 && scrollPos >= contact - 200) {
        setActiveHash('#contact');
      } else if (projects > 0 && scrollPos >= projects - 200) {
        setActiveHash('#projects');
      } else if (about > 0 && scrollPos >= about - 200) {
        setActiveHash('#about');
      } else {
        setActiveHash('/');
      }
    };

    // Reset active state when navigating to a non-home page
    if (!isHome) setActiveHash('');

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.brand}>
        YanicePortoflio
      </Link>
      
      {/* Desktop Links */}
      <div className={styles.links}>
        <Link href="/" className={`${styles.link} ${activeHash === '/' ? styles.linkActive : ''}`}>Home</Link>
        <Link href="/#about" className={`${styles.link} ${activeHash === '#about' ? styles.linkActive : ''}`}>About</Link>
        <Link href="/#projects" className={`${styles.link} ${activeHash === '#projects' ? styles.linkActive : ''}`}>Projects</Link>
        <Link href="/#contact" className={`${styles.link} ${activeHash === '#contact' ? styles.linkActive : ''}`}>Get In Touch</Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <button 
        className={styles.hamburger} 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`${styles.bar} ${mobileMenuOpen ? styles.barOpenTop : ''}`} />
        <div className={`${styles.bar} ${mobileMenuOpen ? styles.barOpenMid : ''}`} />
        <div className={`${styles.bar} ${mobileMenuOpen ? styles.barOpenBot : ''}`} />
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/#about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/#projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
          <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
