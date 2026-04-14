import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { projects } from '@/data/projects';
import styles from './page.module.css';

type MediaEntry = { src: string; isVideo: boolean; stem: string };

function getMediaForProject(folder: string): MediaEntry[] {
  const assetsDir = path.join(process.cwd(), 'public', 'assets', folder);
  if (!fs.existsSync(assetsDir)) return [];

  const files = fs.readdirSync(assetsDir);

  // Collect all images and videos, keyed by stem (filename without extension)
  const map = new Map<string, MediaEntry>();

  // First pass: images
  files
    .filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f))
    .forEach((f) => {
      const stem = f.replace(/\.[^.]+$/, '');
      map.set(stem, { src: `/assets/${folder}/${f}`, isVideo: false, stem });
    });

  // Second pass: MP4s override same-stem images
  files
    .filter((f) => /\.mp4$/i.test(f))
    .forEach((f) => {
      const stem = f.replace(/\.[^.]+$/, '');
      map.set(stem, { src: `/assets/${folder}/${f}`, isVideo: true, stem });
    });

  // Sort by leading number in filename, then alphabetically
  return Array.from(map.values()).sort((a, b) => {
    const numA = parseInt(a.stem.match(/\d+/)?.[0] ?? '0', 10);
    const numB = parseInt(b.stem.match(/\d+/)?.[0] ?? '0', 10);
    return numA !== numB ? numA - numB : a.stem.localeCompare(b.stem);
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) notFound();

  const media = getMediaForProject(project.folder);
  const otherProjects = projects.filter(p => p.slug !== slug).slice(0, 3);

  // Build the capability string e.g. "2023/WEB/UI/UX"
  const caps: string[] = [project.year];
  if (project.isWeb) caps.push('WEB');
  if (project.isUI) caps.push('UI');
  if (project.isUX) caps.push('UX');
  const capLine = caps.join('/');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* ── Project Header ── */}
        <header className={styles.projectHeader}>
          {/* Group 1: title + meta */}
          <div className={styles.titleGroup}>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <div className={styles.metaBlock}>
              <p>...</p>
              <p>{capLine}</p>
            </div>
          </div>

          {/* Group 2: badge + description */}
          <div className={styles.labelGroup}>
            <span className={styles.subtitleBadge}>{project.subtitle.replace(/^.*?: /, '')}</span>
            <p className={styles.description}>{project.description}</p>
          </div>
        </header>

        {/* ── Media Gallery ── */}
        <div className={styles.contentSection}>
          {media.map((entry, index) => (
            <div key={index} className={styles.contentImageWrapper}>
              {entry.isVideo ? (
                <video
                  src={entry.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.contentImage}
                />
              ) : (
                <Image
                  src={entry.src}
                  alt={`${project.title} ${index + 1}`}
                  width={1920}
                  height={1080}
                  className={styles.contentImage}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Other Projects ── */}
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>查看其他项目</h2>
          <div className={styles.relatedGrid}>
            {otherProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImageWrapper}>
                  <Image
                    src={p.imageSrc}
                    alt={p.title}
                    width={400}
                    height={250}
                    className={styles.relatedImage}
                  />
                </div>
                <h3 className={styles.relatedCardTitle}>{p.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
