'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      if (!isHome) return;

      const windowHeight = window.innerHeight;
      const scrollPos = window.scrollY + (windowHeight / 3);
      const documentHeight = document.documentElement.scrollHeight;
      
      const about = document.getElementById('about')?.offsetTop || 0;
      const projects = document.getElementById('projects')?.offsetTop || 0;
      // const contact = document.getElementById('contact')?.offsetTop || 0;

      // Force contact active if at the very bottom
      // if (window.scrollY + windowHeight >= documentHeight - 100) {
      //   setActiveHash('#contact');
      // } else if (contact > 0 && scrollPos >= contact) {
      //   setActiveHash('#contact');
      if (about > 0 && scrollPos >= about - 100) {
        setActiveHash('#about');
      } else if (projects > 0 && scrollPos >= projects - 100) {
        setActiveHash('#projects');
      } else {
        setActiveHash('');
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
      <div className={styles.navContainer}>
        <Link href="/#hero" className={styles.brand}>
          YANICEPORTFOLIO
        </Link>
        
        {/* Desktop Links */}
        <div className={styles.links}>
          <Link href="/#projects" className={`${styles.link} ${activeHash === '#projects' ? styles.linkActive : ''}`}>Projects</Link>
          <Link href="/#about" className={`${styles.link} ${activeHash === '#about' ? styles.linkActive : ''}`}>About Me</Link>
          {/* <Link href="/#contact" className={`${styles.link} ${activeHash === '#contact' ? styles.linkActive : ''}`}>Get In Touch</Link> */}
          
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Action Group (Toggle + Hamburger) */}
        <div className={styles.mobileActions}>
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line>
              </svg>
            )}
          </button>

          <button 
            className={styles.hamburger} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`${styles.bar} ${mobileMenuOpen ? styles.barOpenTop : ''}`} />
            <div className={`${styles.bar} ${mobileMenuOpen ? styles.barOpenMid : ''}`} />
            <div className={`${styles.bar} ${mobileMenuOpen ? styles.barOpenBot : ''}`} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/#projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
            <Link href="/#about" onClick={() => setMobileMenuOpen(false)}>About Me</Link>
            {/* <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link> */}
          </div>
        )}
      </div>
    </nav>
  );
}
