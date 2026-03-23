'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import styles from './page.module.css';

const projects = [
  {
    slug: 'neomic-go',
    title: 'NeoMic Go',
    tags: ['智能硬件', '上位机'],
    imageSrc: '/project_neomic.png',
    bgColor: '#FFEED1'
  },
  {
    slug: 'edifier-mall',
    title: '漫步者商城',
    tags: ['品牌', '应用程序', '网页'],
    imageSrc: '/project_edifier.png',
    bgColor: '#FFD1D4'
  },
  {
    slug: 'ric-center',
    title: 'RIC验配中心',
    tags: ['B端业务系统', '医疗辅助设备', '网页'],
    imageSrc: '/project_ric.png',
    bgColor: '#D3E1FA'
  },
  {
    slug: 'meeting-notes',
    title: '会议记录',
    tags: ['录音设备', '应用程序'],
    imageSrc: '/project_meeting.png',
    bgColor: '#DDF0FF'
  }
];

export default function Home() {
  const [activeProject, setActiveProject] = useState(projects[0].slug);
  const projectsRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = projects.findIndex(p => p.slug === activeProject);
  }, [activeProject]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return;

    const projectsEl = projectsRef.current;
    if (!projectsEl) return;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const currentIndex = activeIndexRef.current;
      const total = projects.length;

      // Only intercept while the card container is "docked" near the navbar
      const isDocked = containerRect.top > -40 && containerRect.top < 160;
      if (!isDocked) return;

      const snapY = window.scrollY + containerRect.top - 88;

      if (e.deltaY > 0 && currentIndex < total - 1) {
        // Scroll down → next card
        e.preventDefault();
        window.scrollTo({ top: snapY, behavior: 'instant' });
        if (!isScrolling) {
          isScrolling = true;
          setActiveProject(projects[currentIndex + 1].slug);
          setTimeout(() => (isScrolling = false), 600);
        }
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up → previous card
        e.preventDefault();
        window.scrollTo({ top: snapY, behavior: 'instant' });
        if (!isScrolling) {
          isScrolling = true;
          setActiveProject(projects[currentIndex - 1].slug);
          setTimeout(() => (isScrolling = false), 600);
        }
      }
      // else: at boundary (first↑ or last↓) → don't preventDefault → natural scroll continues
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const handleNavClick = (index: number) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setActiveProject(projects[index].slug);
      return;
    }
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + rect.top - 88, behavior: 'smooth' });
    }
    setActiveProject(projects[index].slug);
  };


  return (
    <main className={styles.main}>
      
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.heroHello}>HELLO,</h1>
          <h1 className={styles.heroNameZh}>我是陈晓颖。</h1>
          <h2 className={styles.heroRole}>是一名UI/UX设计师。</h2>
          
          <motion.a 
            href="#about"
            className={styles.heroScroll}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className={styles.scrollIcon}>↓</span> Scroll for more
          </motion.a>
        </motion.div>
      </section>

      {/* ── About Snippet ── */}
      <section id="about" className={styles.about}>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className={styles.aboutGrid}
        >
          <h2 className={styles.aboutTitle}>ABOUT <br/> ME</h2>

          <div className={styles.aboutImageCol}>
            <div className={styles.avatarWrapper}>
              <Image 
                src="/assets/avatar.jpg"
                alt="Personal Avatar"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className={styles.aboutTextCol}>
            <p className={styles.aboutText}>
              跨领域UIUX设计师，<strong>独立负责</strong>智能硬件产品及核心业务线的<strong>UI设计</strong>与<strong>规范搭建</strong>，主导<strong>多款0-1项目</strong>与设计体系落地，在团队中承担关键视觉与交互设计职责。<br/><br/>
              能够在<strong>缺少软件PD</strong>的情况下完成需求拆解与<strong>全流程设计</strong>；具备视觉优化与跨团队协作引导经验。
            </p>
            <div className={styles.aboutTags}>
              <span>智能硬件UI</span>
              <span>C端应用</span>
              <span>B端系统</span>
              <span>网页设计</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Projects (In-Place Scrolljacking) ── */}
      <section 
        id="projects" 
        className={styles.projects}
        ref={projectsRef}
      >
        <h2 className={styles.projectsSectionTitle}>PROJECTS</h2>
        <div className={styles.projectsContainer} ref={containerRef}>
          
          <div className={styles.cardsDisplayWrapper}>
            <div className={styles.projectCardArea}>
              {projects.map((project) => {
                const isActive = project.slug === activeProject;

                return (
                <motion.div 
                  key={project.slug}
                  className={styles.absoluteCard}
                  style={{
                    zIndex: isActive ? 10 : 0,
                    backgroundColor: project.bgColor,
                    transformOrigin: 'center center',
                    cursor: 'pointer'
                  }}
                  initial={false}
                  animate={{
                    y: isActive ? 0 : 20,
                    scale: isActive ? 1 : 0.98,
                    opacity: isActive ? 1 : 0,
                    boxShadow: isActive ? `0 20px 60px -15px ${project.bgColor}` : '0 10px 30px rgba(0,0,0,0.05)'
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Link 
                    href={`/projects/${project.slug}`}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div className={styles.cardInner}>
                      <div className={styles.cardImageWrapper}>
                        <div className={styles.cardImageInner}>
                          <Image
                            src={project.imageSrc}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className={styles.projectImage}
                          />
                        </div>
                      </div>
                      
                      <div className={styles.cardInfo}>
                        <div className={styles.titleRow}>
                          <h3 className={styles.cardTitle}>{project.title}</h3>
                          <div className={styles.cardTags}>
                            {project.tags.map(tag => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div className={styles.cardFooter}>
                          <span className={styles.dots}>● ○</span>
                          <span className={styles.footerText}>UI/UX</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
                );
              })}
            </div>
          </div>

          <div className={styles.projectsSidebar}>
             <div className={styles.stickySpy}>
               <ul className={styles.spyList}>
                 {projects.map((project, i) => {
                   const isActive = project.slug === activeProject;
                   return (
                    <li key={project.slug} className={styles.spyItemWrapper}>
                      <div 
                        className={`${styles.spyItem} ${isActive ? styles.spyActive : ''}`}
                        onClick={() => handleNavClick(i)}
                      >
                        <div className={styles.spyDash} />
                        <span className={styles.spyName}>{project.title}</span>
                      </div>
                      {i < projects.length - 1 && (
                        <div className={styles.spyDots}>
                          <div className={styles.spySolidDash} />
                          <div className={styles.spySolidDash} />
                          <div className={styles.spySolidDash} />
                        </div>
                      )}
                    </li>
                 )})}
               </ul>
             </div>
          </div>

        </div>
      </section>
      
      {/* ── Contact Section ── */}
      <section id="contact" className={styles.contactSection}>
        <motion.div 
          className={styles.contactWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.contactHeader}>
            Contact<br/>
            Information
          </h2>
          
          <div className={styles.contactCard}>
            <div className={styles.infoLeft}>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>电子邮件</span>
                <span className={styles.infoValue}>winnie.winying@gmail.com</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.infoLabel}>电话号码</span>
                <span className={styles.infoValue}>+86 18319192613</span>
              </div>
            </div>
            
            <div className={styles.infoRight}>
              <span className={styles.qrLabel}>微信</span>
              <div className={styles.qrCodeBox}>
                <div className={styles.qrPlaceholder}>
                  <Image 
                    src="/wechat-qr.png"
                    alt="WeChat QR Code"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
