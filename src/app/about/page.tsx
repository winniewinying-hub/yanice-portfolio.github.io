import Link from 'next/link';
import styles from './page.module.css';

const experience = [
  {
    company: '深圳漫步者科技有限公司',
    role: 'UI设计师',
    period: '2021.09 – 2025.04',
    highlights: [
      '负责智能硬件与核心业务线的界面设计与视觉规范建设',
      '主导 NeoMic GO、漫步者商城、RIC验配中心 等多个 0-1 项目',
      '建立统一设计规范与组件库，提升团队协作效率与界面一致性',
      '在需求不完整的情况下独立整理需求，推进设计落地并与硬件 PM / 开发团队保持高效协作',
    ],
  },
  {
    company: '深圳有术科技有限公司',
    role: 'UI设计师',
    period: '2020.10 – 2021.07',
    highlights: [
      '负责公司供应链业务 App 的界面设计与版本改版',
      '参与产品结构梳理与页面布局优化，提升信息展示效率',
      '根据业务需求设计活动页、运营专题及促销页面',
    ],
  },
  {
    company: '深圳智策科技有限公司',
    role: 'UI设计师',
    period: '2019.08 – 2020.09',
    highlights: [
      '参与区块链金融钱包 App 的功能界面设计',
      '与产品经理协作完成需求页面设计与版本迭代',
      '根据既定产品方向输出移动端 UI 方案，与开发配合完成设计交付',
    ],
  },
];

const skills = [
  { label: '智能硬件 UI', desc: 'Smart Hardware UI' },
  { label: 'C端应用', desc: 'Consumer Apps' },
  { label: 'B端系统', desc: 'B2B Systems' },
  { label: '网页设计', desc: 'Web Design' },
];

export default function About() {
  return (
    <main className={styles.main}>

      {/* ── Header ── */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <p className={styles.headerLabel}>关于我 / About</p>
          <h1 className={styles.headerName}>
            <span className={styles.nameZh}>陈晓颖</span>
            <span className={styles.nameEn}>HiuwingChan</span>
          </h1>
        </div>
        <div className={styles.headerBio}>
          <p className={styles.bioPrimary}>
            跨领域 UIUX 设计师，独立负责智能硬件产品及核心业务线的 UI 设计与规范搭建，
            主导多款 0-1 项目与设计体系落地，在团队中承担关键视觉与交互设计职责。
          </p>
          <p className={styles.bioSecondary}>
            能够在缺少软件 PD 的情况下完成需求拆解与全流程设计；
            具备视觉化与跨团队协作引导经验。
          </p>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span lang="zh">专业方向</span>
          <span className={styles.sectionTitleEn}> / Specializations</span>
        </h2>
        <div className={styles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill.label} className={styles.skillItem}>
              <p className={styles.skillLabel}>{skill.label}</p>
              <p className={styles.skillDesc}>{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span lang="zh">工作经历</span>
          <span className={styles.sectionTitleEn}> / Experience</span>
        </h2>
        <div className={styles.expList}>
          {experience.map((job, i) => (
            <div key={i} className={styles.expItem}>
              <div className={styles.expHeader}>
                <div>
                  <h3 className={styles.expCompany}>{job.company}</h3>
                  <p className={styles.expRole}>{job.role}</p>
                </div>
                <span className={styles.expPeriod}>{job.period}</span>
              </div>
              <ul className={styles.expHighlights}>
                {job.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <p className={styles.ctaText}>有合作意向？欢迎联系。</p>
        <p className={styles.ctaTextEn}>Open to new opportunities and collaborations.</p>
        <div className={styles.ctaLinks}>
          <a href="mailto:hello@hiuwingchan.com" className={styles.ctaBtn}>
            hello@hiuwingchan.com ↗
          </a>
          <Link href="/" className={styles.ctaSecondary}>
            ← 回到作品集 / Back to Work
          </Link>
        </div>
      </section>

    </main>
  );
}
