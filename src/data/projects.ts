export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  isWeb: boolean;
  isUI: boolean;
  isUX: boolean;
  description: string;
  folder: string;
  imageSrc: string;
  tags: string[];
  bgColor: string;
}

export const projects: Project[] = [
  {
    slug: 'ric-center',
    title: 'RIC验配中心',
    subtitle: 'RIC Center : 0–1 Product Design',
    year: '2025',
    isWeb: true,
    isUI: true,
    isUX: true,
    description: '这是公司RIC辅听设备的验配支持系统，为听力验配师提供听力评估、参数调节与设备测试的工具。由于项目初期缺少PM角色，我直接对接业务团队，承担了需求拆解、流程结构搭建与核心交互定义工作，并完成全流程UI设计与交付。',
    folder: 'ric-center',
    imageSrc: '/project_ric.png',
    tags: ['B端业务系统', '医疗辅助设备', '网页'],
    bgColor: '#D3E1FA'
  },
  {
    slug: 'meeting-notes',
    title: 'AI会议记录',
    subtitle: 'Meeting Notes : 0–1 Product Design',
    year: '2025',
    isWeb: false,
    isUI: true,
    isUX: true,
    description: '为AI录音耳机配套研发的应用程序，支持会议录音、实时转写与笔记整理功能，帮助用户高效管理会议内容。负责产品功能规划、界面设计与交互流程设计。',
    folder: 'meeting-notes',
    imageSrc: '/project_meeting.png',
    tags: ['AI录音耳机', '应用程序'],
    bgColor: '#DDF0FF'
  },
  {
    slug: 'neomic-go',
    title: 'NeoMic Go',
    subtitle: 'NeoMic GO : 0–1 Product Design',
    year: '2024',
    isWeb: false,
    isUI: true,
    isUX: true,
    description: 'NeoMic GO 是面向内容创作者与个人播客用户的无线录音 system，由硬件录音设备与桌面端控制软件组成。项目目标是在"录音质量可控"的前提下，降低专业录音门槛，让没有音频经验的用户也能快速获得可用声音结果。负责信息架构、交互逻辑、UI视觉与开发落地沟通的全流程工作。',
    folder: 'neomic-go',
    imageSrc: '/project_neomic.png',
    tags: ['智能硬件', '上位机'],
    bgColor: '#FFEED1'
  },
  {
    slug: 'edifier-mall',
    title: '漫步者商城',
    subtitle: 'EDIFIER Mall : 0–1 Product Design',
    year: '2023',
    isWeb: true,
    isUI: true,
    isUX: true,
    description: '随着品牌战略升级，需要搭建自营商城渠道，实现品牌直连用户、加强会员运营与售后闭环。从0到1搭建官方商城，覆盖商品展示、购物转化、会员体系与多端使用场景。在缺少PM的情况下承担产品向设计角色，构建商城产品结构与购物决策链路，并与开发深度协作保证体验细节还原与交付质量。',
    folder: 'edifier-mall',
    imageSrc: '/project_edifier.png',
    tags: ['品牌', '应用程序', '网页'],
    bgColor: '#FFD1D4'
  }
];
