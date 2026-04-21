'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import styles from './page.module.css';

import { projects } from '@/data/projects';

export default function Home() {
  const { theme } = useTheme();
  const [virtualIndex, setVirtualIndex] = useState(0);
  const projectsRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const virtualIndexRef = useRef(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Derived state
  const total = projects.length;
  const activeIndex = ((virtualIndex % total) + total) % total;

  useEffect(() => {
    virtualIndexRef.current = virtualIndex;
  }, [virtualIndex]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      // If predominantly vertical scroll, allow natural page scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;

      const containerEl = containerRef.current;
      if (!containerEl) return;

      const rect = containerEl.getBoundingClientRect();
      // Intercept horizontal wheel (trackpad swipe) if mouse is over carousel
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      if (Math.abs(e.deltaX) > 10) {
        e.preventDefault(); 
        if (!isScrolling) {
          isScrolling = true;
          if (e.deltaX > 0) setVirtualIndex(v => v + 1);
          else setVirtualIndex(v => v - 1);
          setTimeout(() => (isScrolling = false), 400); // Debounce
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Observer to hide scroll indicator at contact section
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollIndicator(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const contactEl = document.getElementById('contact');
    if (contactEl) observer.observe(contactEl);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (index: number) => {
    // Determine shortest path
    const currentActive = ((virtualIndex % total) + total) % total;
    let distance = index - currentActive;
    if (distance > total / 2) distance -= total;
    else if (distance < -total / 2) distance += total;
    
    setVirtualIndex(v => v + distance);
  };

  const handleScrollNext = () => {
    const aboutEl = document.getElementById('about');
    const projectsEl = document.getElementById('projects');
    const contactEl = document.getElementById('contact');
    
    if (!aboutEl || !projectsEl || !contactEl) return;

    const scrollPos = window.scrollY;
    const aboutTop = aboutEl.offsetTop - 100;
    const projectsTop = projectsEl.offsetTop - 100;
    const contactTop = contactEl.offsetTop - 100;

    if (scrollPos < projectsTop) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    } else if (scrollPos < aboutTop) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    } else if (scrollPos < contactTop - 100) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
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
          <h2 className={styles.heroRole}>
            是一名<span className={styles.specialText}>UI/UX</span>设计师。
          </h2>
          

        </motion.div>
      </section>

      {/* ── Projects (Infinite Horizontal Swiper) ── */}
      <section 
        id="projects" 
        className={styles.projects}
        ref={projectsRef}
      >
        <div className={styles.projectsContainer} ref={containerRef}>
          
          <div className={styles.cardsDisplayWrapper}>
            <div className={styles.projectCardArea}>
              {projects.map((project, i) => {
                // Minimum relative offset for infinite wrap-around
                let diff = i - activeIndex;
                if (diff < -1) diff += total;
                if (diff > 1) diff -= total;

                const isActive = diff === 0;

                return (
                <motion.div 
                  key={project.slug}
                  className={styles.absoluteCard}
                  style={{
                    backgroundColor: project.bgColor,
                    cursor: isActive ? 'pointer' : 'grab',
                  }}
                  drag={!isActive ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -40) setVirtualIndex(v => v + 1);
                    else if (offset.x > 40) setVirtualIndex(v => v - 1);
                  }}
                  onClick={() => {
                    if (!isActive) handleNavClick(i);
                  }}
                  initial={false}
                  animate={{
                    x: `calc(${diff * 95}% + ${diff * 25}px)`, // Ensure precisely 20-30px gap without overlapping
                    scale: isActive ? 1 : 0.85,
                    opacity: Math.abs(diff) > 1 ? 0 : (isActive ? 1 : 0.6),
                    zIndex: isActive ? 10 : (Math.abs(diff) === 1 ? 5 : 0),
                    boxShadow: isActive 
                      ? (theme === 'dark' 
                          ? `0 20px 80px -10px rgba(0, 0, 0, 0.7)` 
                          : `0 20px 60px -15px ${project.bgColor}`)
                      : '0 10px 30px rgba(0,0,0,0.05)'
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className={isActive ? '' : styles.disabledLink} style={{ pointerEvents: isActive ? 'auto' : 'none' }}>
                    <Link 
                      href={`/projects/${project.slug}`}
                      style={{ textDecoration: 'none', display: 'block' }}
                      draggable={false}
                    >
                      <div className={styles.cardInner}>
                        <div className={styles.cardImageWrapper}>
                          <div className={styles.cardImageInner}>
                            <Image
                              src={project.imageSrc}
                              alt={project.title}
                              fill
                              draggable={false}
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
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </div>
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
      
      {/* ── Contact Section ── */}
      <section id="contact" className={styles.contactSection}>
        <motion.div 
          className={styles.contactWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
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
      
      {/* ── Fixed Scroll Indicator ── */}
      <motion.div
        className={styles.heroScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        onClick={handleScrollNext}
        style={{ pointerEvents: showScrollIndicator ? 'auto' : 'none' }}
      >
        <span className={styles.scrollIcon}>↓</span> Scroll for more
      </motion.div>
    </>
  );
}
