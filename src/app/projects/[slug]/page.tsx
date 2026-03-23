import Image from 'next/image';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import styles from './page.module.css';

const projectsMeta: Record<string, {
  title: string;
  subtitle: string;   // e.g. "NeoMic GO : 0–1 Product Design"
  year: string;
  isWeb: boolean;
  isUI: boolean;
  isUX: boolean;
  description: string;
  folder: string;
}> = {
  'neomic-go': {
    title: 'NeoMic GO',
    subtitle: 'NeoMic GO : 0–1 Product Design',
    year: '2024',
    isWeb: false,
    isUI: true,
    isUX: true,
    description:
      'NeoMic GO 是面向内容创作者与个人播客用户的无线录音系统，由硬件录音设备与桌面端控制软件组成。项目目标是在"录音质量可控"的前提下，降低专业录音门槛，让没有音频经验的用户也能快速获得可用声音结果。负责信息架构、交互逻辑、UI视觉与开发落地沟通的全流程工作。',
    folder: 'neomic-go',
  },
  'edifier-mall': {
    title: 'EDIFIER Mall',
    subtitle: 'EDIFIER Mall : 0–1 Product Design',
    year: '2023',
    isWeb: true,
    isUI: true,
    isUX: true,
    description:
      '随着品牌战略升级，需要搭建自营商城渠道，实现品牌直连用户、加强会员运营与售后闭环。从0到1搭建官方商城，覆盖商品展示、购物转化、会员体系与多端使用场景。在缺少PM的情况下承担产品向设计角色，构建商城产品结构与购物决策链路，并与开发深度协作保证体验细节还原与交付质量。',
    folder: 'edifier-mall',
  },
  'ric-center': {
    title: 'RIC验配中心',
    subtitle: 'RIC Center : 0–1 Product Design',
    year: '2025',
    isWeb: true,
    isUI: true,
    isUX: true,
    description:
      '这是公司RIC辅听设备的验配支持系统，为听力验配师提供听力评估、参数调节与设备测试的工具。由于项目初期缺少PM角色，我直接对接业务团队，承担了需求拆解、流程结构搭建与核心交互定义工作，并完成全流程UI设计与交付。',
    folder: 'ric-center',
  },
  'meeting-notes': {
    title: '会议记录',
    subtitle: 'Meeting Notes : 0–1 Product Design',
    year: '2024',
    isWeb: false,
    isUI: true,
    isUX: true,
    description:
      '为录音设备配套研发的应用程序，支持会议录音、实时转写与笔记整理功能，帮助用户高效管理会议内容。负责产品功能规划、界面设计与交互流程设计。',
    folder: 'meeting-notes',
  },
};

function getImagesForProject(folder: string): string[] {
  const assetsDir = path.join(process.cwd(), 'public', 'assets', folder);
  if (!fs.existsSync(assetsDir)) return [];
  return fs
    .readdirSync(assetsDir)
    .filter((f) => /\.(png|jpe?g|webp|gif|avif)$/i.test(f))
    .sort()
    .map((f) => `/assets/${folder}/${f}`);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = projectsMeta[slug as keyof typeof projectsMeta];

  if (!meta) notFound();

  const images = getImagesForProject(meta.folder);

  // Build the capability string e.g. "2023/WEB/UI/UX"
  const caps: string[] = [meta.year];
  if (meta.isWeb) caps.push('WEB');
  if (meta.isUI) caps.push('UI');
  if (meta.isUX) caps.push('UX');
  const capLine = caps.join('/');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* ── Project Header ── */}
        <header className={styles.projectHeader}>
          {/* Group 1: title + meta */}
          <div className={styles.titleGroup}>
            <h1 className={styles.projectTitle}>{meta.title}</h1>
            <div className={styles.metaBlock}>
              <p>...</p>
              <p>{capLine}</p>
            </div>
          </div>

          {/* Group 2: badge + description */}
          <div className={styles.labelGroup}>
            <span className={styles.subtitleBadge}>{meta.subtitle.replace(/^.*?: /, '')}</span>
            <p className={styles.description}>{meta.description}</p>
          </div>
        </header>

        {/* ── Image Gallery ── */}
        <div className={styles.contentSection}>
          {images.map((img, index) => (
            <div key={index} className={styles.contentImageWrapper}>
              <Image
                src={img}
                alt={`${meta.title} ${index + 1}`}
                width={1920}
                height={1080}
                className={styles.contentImage}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(projectsMeta).map((slug) => ({ slug }));
}
