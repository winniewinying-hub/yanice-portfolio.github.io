import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

const projectsData = {
  'neomic-go': {
    title: 'NeoMic GO',
    titleZh: '硬件产品 + 配套系统界面',
    role: '核心设计师（主导 UX + UI 设计）',
    duration: '2024.06 – 2025.01',
    place: 'Shenzhen, China',
    status: '已上线',
    tags: ['智能硬件', '硬件产品', '上位机'],
    description: 'NeoMic GO 是面向内容创作者与个人播客用户的无线录音系统，由硬件录音设备与桌面端控制软件组成。项目目标是在"录音质量可控"的前提下，降低专业录音门槛，让没有音频经验的用户也能快速获得可用声音结果。负责信息架构、交互逻辑、UI视觉与开发落地沟通的全流程工作。',
    coverImage: '/assets/extracted/page_4_img_1.jpeg',
    contentImages: [
      '/assets/extracted/page_5_img_1.jpeg',
      '/assets/extracted/page_6_img_1.jpeg',
      '/assets/extracted/page_7_img_1.jpeg',
      '/assets/extracted/page_8_img_1.jpeg',
      '/assets/extracted/page_9_img_1.jpeg',
      '/assets/extracted/page_10_img_1.jpeg',
      '/assets/extracted/page_11_img_1.jpeg',
      '/assets/extracted/page_12_img_1.jpeg',
      '/assets/extracted/page_13_img_1.jpeg',
      '/assets/extracted/page_14_img_1.jpeg',
      '/assets/extracted/page_15_img_1.jpeg',
      '/assets/extracted/page_16_img_1.jpeg',
      '/assets/extracted/page_17_img_1.jpeg',
      '/assets/extracted/page_18_img_1.jpeg',
      '/assets/extracted/page_19_img_1.jpeg',
      '/assets/extracted/page_20_img_1.jpeg',
    ],
  },
  'edifier-mall': {
    title: '漫步者官方商城',
    titleZh: '从0到1构建品牌直连自营电商',
    role: '独立设计师（UX流程设计 + UI设计 + 需求整理）',
    duration: '2023.01 – 2024.05',
    place: 'Shenzhen, China',
    status: '已上线',
    tags: ['C端项目', '移动端', 'Web端'],
    description: '随着品牌战略升级，需要搭建自营商城渠道，实现品牌直连用户、加强会员运营与售后闭环。从0到1搭建官方商城，覆盖商品展示、购物转化、会员体系与多端使用场景。在缺少PM的情况下承担产品向设计角色，构建商城产品结构与购物决策链路，并与开发深度协作保证体验细节还原与交付质量。',
    coverImage: '/assets/extracted/page_22_img_1.jpeg',
    contentImages: [
      '/assets/extracted/page_23_img_1.jpeg',
      '/assets/extracted/page_24_img_1.jpeg',
      '/assets/extracted/page_25_img_1.jpeg',
      '/assets/extracted/page_26_img_1.jpeg',
      '/assets/extracted/page_27_img_1.jpeg',
      '/assets/extracted/page_28_img_1.jpeg',
      '/assets/extracted/page_29_img_1.jpeg',
      '/assets/extracted/page_30_img_1.jpeg',
      '/assets/extracted/page_31_img_1.jpeg',
      '/assets/extracted/page_32_img_1.jpeg',
      '/assets/extracted/page_33_img_1.jpeg',
      '/assets/extracted/page_34_img_1.jpeg',
      '/assets/extracted/page_35_img_1.jpeg',
    ],
  },
  'ric-center': {
    title: 'RIC验配中心',
    titleZh: '为线下听力服务场景打造的专业验配工具',
    role: '独立设计师（UX流程设计 + UI设计 + 需求整理）',
    duration: '2025.01 – 2025.02',
    place: 'Shenzhen, China',
    status: '已交付测试，待上线',
    tags: ['B端业务系统', '医疗辅助设备', '任务导向设计'],
    description: '这是公司RIC辅听设备的验配支持系统，为听力验配师提供听力评估、参数调节与设备测试的工具。由于项目初期缺少PM角色，我直接对接业务团队，承担了需求拆解、流程结构搭建与核心交互定义工作，并完成全流程UI设计与交付。',
    coverImage: '/assets/extracted/page_37_img_1.jpeg',
    contentImages: [
      '/assets/extracted/page_38_img_1.jpeg',
      '/assets/extracted/page_39_img_1.jpeg',
      '/assets/extracted/page_40_img_1.jpeg',
      '/assets/extracted/page_41_img_1.jpeg',
      '/assets/extracted/page_42_img_1.jpeg',
      '/assets/extracted/page_43_img_1.jpeg',
      '/assets/extracted/page_44_img_1.jpeg',
      '/assets/extracted/page_45_img_1.jpeg',
      '/assets/extracted/page_46_img_1.jpeg',
      '/assets/extracted/page_47_img_1.jpeg',
    ],
  },
  'edifier-connect': {
    title: 'EDIFIER CONNECT',
    titleZh: '移动端设备管理 App',
    role: 'UI设计师',
    duration: '2021.09 – 2022.12',
    place: 'Shenzhen, China',
    status: '已上线',
    tags: ['信息架构优化', '移动端', '多端设计'],
    description: 'EDIFIER Connect 是面向蓝牙耳机与音箱产品的移动端设备管理 App，支持设备连接、音效调节与固件升级等功能，为多设备用户提供统一的控制体验。我负责应用的界面体系重构与设计规范升级，通过优化信息架构与交互路径，提升多款设备在同一平台下的使用一致性与扩展性。',
    coverImage: '/assets/extracted/page_49_img_1.jpeg',
    contentImages: [
      '/assets/extracted/page_50_img_1.jpeg',
      '/assets/extracted/page_51_img_1.jpeg',
      '/assets/extracted/page_52_img_1.jpeg',
    ],
  },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData[slug as keyof typeof projectsData];

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.coverWrapper}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className={styles.coverImage}
          priority
        />
      </div>

      <div className={styles.container}>
        <div className={styles.intro}>
          {/* Left: title + tags */}
          <div className={styles.introLeft}>
            <p className={styles.titleZh}>{project.titleZh}</p>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Right: metadata + description */}
          <div className={styles.introRight}>
            <div className={styles.metadataRow}>
              <div className={styles.metadataCol}>
                <h6><span lang="zh">职位</span> / Role</h6>
                <p>{project.role}</p>
              </div>
              <div className={styles.metadataCol}>
                <h6><span lang="zh">时间</span> / Duration</h6>
                <p>{project.duration}</p>
              </div>
              <div className={styles.metadataCol}>
                <h6><span lang="zh">状态</span> / Status</h6>
                <p>{project.status}</p>
              </div>
            </div>
            <p className={styles.description}>{project.description}</p>
          </div>
        </div>

        <div className={styles.contentSection}>
          {project.contentImages.map((img, index) => (
            <div key={index} className={styles.contentImageWrapper}>
              <Image
                src={img}
                alt={`${project.title} detail ${index + 1}`}
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
  return Object.keys(projectsData).map((slug) => ({ slug }));
}
