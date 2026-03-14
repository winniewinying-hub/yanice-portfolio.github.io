import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        © 2025 <span className={styles.nameCn}>陈晓颖</span>
        <span className={styles.sep}> · </span>
        HiuwingChan
      </p>
      <div className={styles.links}>
        <a href="mailto:hello@hiuwingchan.com" className={styles.link}>Email ↗</a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn ↗
        </a>
      </div>
    </footer>
  );
}
