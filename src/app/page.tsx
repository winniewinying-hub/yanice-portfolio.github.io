import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const projects = [
  {
    slug: 'neomic-go',
    number: '01',
    title: 'NeoMic GO',
    titleZh: '硬件产品 + 配套系统界面',
    tags: ['智能硬件', '硬件产品', '上位机'],
    date: '2024–2025',
    status: '已上线',
    imageSrc: '/assets/extracted/page_4_img_1.jpeg',
    description: '面向内容创作者的无线录音系统，涵盖硬件录音设备 UI 与桌面端配套软件。',
  },
  {
    slug: 'edifier-mall',
    number: '02',
    title: '漫步者官方商城',
    titleZh: '从0到1构建品牌直连自营电商',
    tags: ['C端项目', '移动端', 'Web端'],
    date: '2023–2024',
    status: '已上线',
    imageSrc: '/assets/extracted/page_22_img_1.jpeg',
    description: '从零搭建的品牌自营商城，覆盖商品展示、购物转化与会员体系，移动端 + Web 双端。',
  },
  {
    slug: 'ric-center',
    number: '03',
    title: 'RIC验配中心',
    titleZh: '为线下听力服务场景打造的专业验配工具',
    tags: ['B端系统', '医疗辅助设备', '任务导向设计'],
    date: '2025',
    status: '待上线',
    imageSrc: '/assets/extracted/page_37_img_1.jpeg',
    description: '听力验配师专用的 B 端业务系统，支持客户档案、听力评估与参数精调全流程。',
  },
  {
    slug: 'edifier-connect',
    number: '04',
    title: 'EDIFIER CONNECT',
    titleZh: '移动端设备管理 App',
    tags: ['移动端', '信息架构优化', '多端设计'],
    date: '2021–2022',
    status: '已上线',
    imageSrc: '/assets/extracted/page_49_img_1.jpeg',
    description: '面向蓝牙耳机与音箱产品的设备管理 App，统一管理多款设备的连接、音效与固件升级。',
  },
];

export default function Home() {
  return (
    <main className={styles.main}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.heroGreeting}>你好 / Hello</p>
          <h1 className={styles.heroName}>陈晓颖</h1>
          <p className={styles.heroHandle}>HiuwingChan (AKA Yanice)</p>
        </div>

        <div className={styles.heroRight}>
          <p className={styles.heroRole}>UX / UI Designer</p>
          <p className={styles.heroBio}>
            跨领域 UIUX 设计师，独立负责智能硬件产品及核心业务线的 UI 设计与规范搭建，
            主导多款 0-1 项目与设计体系落地。
          </p>
          <div className={styles.heroMeta}>
            <span>深圳漫步者科技</span>
            <span className={styles.heroDot}>·</span>
            <span>2021–2025</span>
          </div>
          <div className={styles.heroTags}>
            <span>智能硬件 UI</span>
            <span>C端应用</span>
            <span>B端系统</span>
            <span>网页设计</span>
          </div>
        </div>

        <div className={styles.heroScroll}>
          <span>↓</span>
          <span className={styles.heroScrollLabel}>Scroll</span>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" className={styles.work}>
        <div className={styles.workHeader}>
          <span className={styles.workLabel}>
            <span lang="zh">精选作品</span>
            <span className={styles.workLabelSep}> · </span>
            Selected Work
          </span>
          <span className={styles.workCount}>{projects.length} Projects</span>
        </div>

        <div className={styles.projectList}>
          {projects.map((project, i) => {
            const reverse = i % 2 !== 0;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`${styles.projectRow} ${reverse ? styles.projectRowReverse : ''}`}
              >
                <div className={styles.projectImage}>
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className={styles.projectImg}
                    sizes="(max-width: 768px) 100vw, 58vw"
                    priority={i === 0}
                  />
                </div>

                <div className={styles.projectContent}>
                  <span className={styles.projectNumber}>{project.number}</span>
                  <div className={styles.projectInfo}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className={styles.projectTitleZh}>{project.titleZh}</p>
                    <p className={styles.projectDesc}>{project.description}</p>
                    <div className={styles.projectTags}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.projectTag}>{tag}</span>
                      ))}
                    </div>
                    <div className={styles.projectMeta}>
                      <span>{project.date}</span>
                      <span className={styles.projectMetaDot}>·</span>
                      <span className={styles.projectStatus}>{project.status}</span>
                    </div>
                    <span className={styles.projectCta}>查看案例 / View Case →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── About teaser ── */}
      <section className={styles.aboutTeaser}>
        <div className={styles.aboutTeaserInner}>
          <p className={styles.aboutTeaserLabel}>关于我 / About</p>
          <p className={styles.aboutTeaserText}>
            在深圳漫步者科技工作了 4 年，主导了从智能硬件到电商到 B 端系统等多类型产品的全流程设计。
            擅长在缺少 PM 的情况下独立完成需求拆解与全流程交付。
          </p>
          <Link href="/about" className={styles.aboutTeaserLink}>
            了解更多 / Learn more →
          </Link>
        </div>
      </section>

    </main>
  );
}
