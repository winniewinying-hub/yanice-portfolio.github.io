import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  subtitle?: string;
  date: string;
  slug: string;
  imageSrc: string;
  featured?: boolean;
  priority?: boolean;
}

export default function ProjectCard({
  title,
  subtitle,
  date,
  slug,
  imageSrc,
  featured = false,
  priority = false,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className={styles.cardLink}>
      <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
        <div className={styles.imageContainer}>
          <Image
            src={imageSrc}
            alt={`${title} project showcase`}
            fill
            className={styles.image}
            sizes={featured ? '100vw' : '(max-width: 960px) 100vw, 50vw'}
            priority={priority}
          />
        </div>
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <span className={styles.date}>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
