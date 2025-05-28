import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  LinearProgress,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Divider,
  Link,
  Button,
  Avatar,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EventIcon from '@mui/icons-material/Event';
import PublicIcon from '@mui/icons-material/Public';
import WavesIcon from '@mui/icons-material/Waves';
import EngineeringIcon from '@mui/icons-material/Engineering';
import NatureIcon from '@mui/icons-material/Nature';
import DescriptionIcon from '@mui/icons-material/Description';
import ScienceIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import DnsIcon from '@mui/icons-material/Dns';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Project status type
type ProjectStatus = 'ongoing' | 'completed' | 'pending';

// Project information interface
interface ProjectInfo {
  id: string;
  title: string;
  description: string;
  labName: string;
  timeRange: { start: string; end: string };
  progress: number;
  status: ProjectStatus;
  tags: string[];
  teamSize: number;
  media: { type: 'image' | 'video'; url: string; thumbnail?: string };
  leader: { name: string; title: string; avatar: string; bio: string };
  views: number;
  likes: number;
  introduction: { overview: string; standards: string[] };
  college: string;
  milestones: { period: string; description: string; status: 'completed' | 'ongoing' | 'pending' }[];
  researchResults: { title: string; publication: string; date: string; doi: string }[];
  funding: { amount: string; source: string };
  application: string;
  cooperation: { title: string; details: string[] };
  contact: string;
  filterTags: string[]; // 新增：用于筛选的标签
}

// Lab information interface
interface LabInfo {
  id: string;
  title: string;
  description: string;
  teamName: string;
  location: string;
  status: 'open' | 'successful' | 'planning';
  tags: string[];
  metrics: { label1: string; value1: string; label2: string; value2: string };
  badge: { icon: React.ReactNode; text: string };
  media: { url: string };
  leader: { name: string; title: string };
  basicInfo: { openHours: string; email: string };
  researchFocus: string;
  members: { researchers: number; students: number; engineers: number };
  equipment: { name: string; status: 'available' | 'in-use' }[];
  achievements: { type: 'award' | 'patent' | 'paper'; title: string; year: string; description: string }[];
  cooperation: { title: string; details: string[]; invitation: string };
  cooperationMethods: string[];
  recruitment: { description: string; email: string };
  filterTags: string[]; // 新增：用于筛选的标签
}

// Filter categories
const FILTER_CATEGORIES = {
  application: [
    { id: 'all', name: '全部' },
    { id: 'it', name: '新一代信息技术' },
    { id: 'manufacturing', name: '高端装备制造' },
    { id: 'materials', name: '新材料' },
    { id: 'bio', name: '生物产业' },
    { id: 'new_energy', name: '新能源' },
    { id: 'energy_saving', name: '节能环保' },
    { id: 'digital_creative', name: '数字创意' },
    { id: 'related_services', name: '相关服务业' },
  ],
  innovation: [
    { id: 'all', name: '全部' },
    { id: 'principle', name: '原理创新' },
    { id: 'technical', name: '技术创新' },
    { id: 'application', name: '应用创新' },
    { id: 'integrated', name: '集成创新' },
    { id: 'business_model', name: '商业模式创新' },
  ],
  maturity: [
    { id: 'all', name: '全部' },
    { id: 'concept', name: '概念验证' },
    { id: 'prototype', name: '原型样机' },
    { id: 'engineering', name: '工程样机' },
    { id: 'pilot', name: '中试(原型机)' },
    { id: 'industrialization', name: '产业化' },
  ],
  cooperation: [
    { id: 'all', name: '全部' },
    { id: 'equity_financing', name: '股权融资' },
    { id: 'tech_transfer', name: '技术转让' },
    { id: 'tech_development', name: '技术开发' },
    { id: 'commissioned_development', name: '委托开发' },
    { id: 'incubation', name: '落地孵化' },
    { id: 'other', name: '其他' },
  ],
  labDirection: [
    { id: 'all', name: '全部' },
    { id: 'advanced_manufacturing', name: '先进制造' },
    { id: 'electronics', name: '电子信息' },
    { id: 'biomedical', name: '生物医工' },
    { id: 'agriculture', name: '农业生产' },
    { id: 'materials_chemical', name: '材料化工' },
    { id: 'cultural_innovation', name: '文化创新' },
    { id: 'other', name: '其他' },
  ],
};

// Sample project data
const projects: ProjectInfo[] = [
  {
    id: '1',
    title: '智能机器人控制系统研发',
    description: '开发新一代智能机器人控制系统，实现高精度运动控制和环境感知，应用于工业自动化和物流场景。',
    labName: '张教授团队',
    timeRange: { start: '2023-01', end: '2024-12' },
    progress: 75,
    status: 'ongoing',
    tags: ['机器人技术', '控制系统', '人工智能'],
    teamSize: 8,
    media: {
      type: 'image',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1pgZGOEOU2sq9PrXRdy61tMwYTuF640kxKlQwqAUe17GQnkD0RaIYQElkOy2WQK_XyCWAs6MZDHoUMUeqlZICPVoT6kuxJVnkOT74Nj5ZdMzi0QcJm9ckW-xwmKh9tQDOzc4r2AOsMtt2Xc5xN7MsUTYAyOypTJ_7vm26I36edJMJmiaSUYAXnB2vES_iRGpb8IbdIkGwAn8zTGzR4ZBfUhcEPNX63drJLNHOhOa0QRJBhvz6xhFuSektdctPx3kzODz6d4xh-lVt',
    },
    leader: {
      name: '张教授',
      title: '研究员',
      avatar: '/avatars/leader1.jpg',
      bio: '清华大学教授，机器人与自动化领域专家。发表100余篇顶级期刊论文，获国家科技进步奖二等奖。',
    },
    views: 328,
    likes: 56,
    introduction: {
      overview: '开发高精度机器人控制系统，集成AI算法与传感器技术，提升工业自动化和物流效率。',
      standards: [
        '算法设计：优化运动规划算法，适应复杂工业环境。',
        '硬件集成：开发嵌入式控制模块，支持多传感器融合。',
        '测试验证：在10家企业试点，验证系统稳定性。',
        '数据处理：收集100TB实时数据，优化控制模型。',
      ],
    },
    college: '机械工程学院',
    milestones: [
      { period: '2023-Q1', description: '系统架构设计', status: 'completed' },
      { period: '2023-Q3', description: '算法优化与测试', status: 'ongoing' },
      { period: '2024-Q2', description: '企业试点部署', status: 'pending' },
      { period: '2024-Q4', description: '系统优化与交付', status: 'pending' },
    ],
    researchResults: [
      {
        title: '高精度机器人运动规划算法',
        publication: 'IEEE Transactions on Robotics',
        date: '2023',
        doi: '10.1109/TRO.2023.1234567',
      },
    ],
    funding: { amount: '80万元', source: '国家自然科学基金' },
    application: '应用于智能制造流水线和无人仓储物流，缩短生产周期20%，提升效率15%。',
    cooperation: {
      title: '技术合作模式',
      details: [
        '技术转让：提供控制系统授权，费用50万-100万元。',
        '合作开发：与企业联合开发定制化解决方案，费用面议。',
        '技术咨询：提供系统优化建议，收费10万-30万元。',
      ],
    },
    contact: 'robotics@tsinghua.edu.cn',
    filterTags: [
      '新一代信息技术', '高端装备制造', '原理创新', '技术创新', '应用创新', '原型样机', '工程样机', '技术转让', '技术开发', '委托开发', '先进制造', '电子信息'
    ],
  },
  {
    id: '2',
    title: '医学影像AI辅助诊断系统',
    description: '利用深度学习技术开发医学影像智能分析系统，实现对X光、CT和MRI等影像的自动识别和分析，提高诊断准确率。',
    labName: '李博士团队',
    timeRange: { start: '2023-03', end: '2025-02' },
    progress: 45,
    status: 'ongoing',
    tags: ['医疗AI', '深度学习', '计算机视觉'],
    teamSize: 12,
    media: {
      type: 'image',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKy7DjMHnqznYR9qgqD2I0HphAZcpjPIADlWvy6cieuPIlBlo9qk2HOHBrYR-YymEqk6ZxdGJudsTUTpFZbkBHVjxBtSFlyxLa_yzusuwnRuDegQnWaFJIM1YJ1lozsoozy55m9qfVV1vPDJ4j-hA55L2NJhyUZkXqu4kfE41of6y-dV39aBX3YKH_WfJ1-t7W51HQ2XNB9EB6_U6aLN_Kh3RKyIRoLjezRzRsj7sat6yLQE3cSJUZ8q0opFwkV7VVG2qPOp90jF_g',
    },
    leader: {
      name: '李博士',
      title: '研究员',
      avatar: '/avatars/leader2.jpg',
      bio: '医学影像AI领域专家，发表50余篇顶级期刊论文，主持国家重点研发计划项目。',
    },
    views: 276,
    likes: 42,
    introduction: {
      overview: '利用深度学习分析医学影像，实现疾病快速诊断和病灶定位。',
      standards: [
        '算法设计：针对医学影像开发高效算法。',
        '模型开发：基于深度学习模型，提供诊断支持。',
        '数据处理：处理2万份影像数据。',
        '临床验证：在3家医院测试，覆盖5000例。',
      ],
    },
    college: '生物医学工程学院',
    milestones: [
      { period: '2023-Q3', description: '数据收集与预处理', status: 'completed' },
      { period: '2023-Q4', description: '模型开发与训练', status: 'ongoing' },
      { period: '2024-Q2', description: '临床验证', status: 'pending' },
      { period: '2024-Q3', description: '系统部署', status: 'pending' },
    ],
    researchResults: [
      {
        title: '基于深度学习的胸部CT图像分析',
        publication: 'Medical Image Analysis',
        date: '2023',
        doi: '10.1016/j.media.2023.123456',
      },
    ],
    funding: { amount: '50万元', source: '国家重点研发计划' },
    application: '应用于基层医疗机构，提升诊断效率，降低漏诊率。',
    cooperation: {
      title: '合作模式',
      details: [
        '技术服务：提供诊断系统咨询，收费20万-50万元。',
        '技术许可：授权算法使用，费用30万-80万元。',
        '联合开发：与医院合作开发定制工具，费用面议。',
      ],
    },
    contact: 'medicalai@lab.com',
    filterTags: [
      '生物产业', '新一代信息技术', '应用创新', '技术创新', '概念验证', '原型样机', '技术服务', '技术许可', '联合开发', '生物医工'
    ],
  },
  {
    id: '3',
    title: '智能工厂控制系统',
    description: '开发面向智能制造的新一代工业控制系统，集成物联网、大数据和AI技术，提升生产效率和产品质量。',
    labName: '王博士团队',
    timeRange: { start: '2023-06', end: '2024-12' },
    progress: 60,
    status: 'ongoing',
    tags: ['控制系统', '工业自动化', '物联网'],
    teamSize: 6,
    media: {
      type: 'image',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy0yVeripczxsMYObH57GLBiZIloGXrVOK9Ust2yz_HpEz8w3cb4z8uvFaMfc55l6ELhN_Vxq5gTlewnOL7JjOm0-Io3JsyPWIN9ZfqwYfAFgtigzfnDQsXsMNSqJUVSwHWDWockGdmFAS8ZYGh_VwRr58WBdGqk2tzK6wMZp1rMmeOqD7Guegx47v26PLbcggZgadv8zuFFyqf6ocE6otbbtb9cfQR_kUONOiB4qVAwtU9Co71d9nkRm4RNrLtasoAZfk5EeYBKvM',
    },
    leader: {
      name: '王博士',
      title: '研究员',
      avatar: '/avatars/leader3.jpg',
      bio: '智能制造领域专家，主持多项国家级项目，获国家发明专利10项。',
    },
    views: 312,
    likes: 49,
    introduction: {
      overview: '开发智能工厂控制系统，实现生产过程的实时监控和优化。',
      standards: [
        '系统设计：支持多设备互联，兼容工业4.0标准。',
        '数据分析：处理50TB工业数据，优化生产流程。',
        '验证测试：在5家工厂试点，提升效率10%。',
        '安全性：集成网络安全模块，防止数据泄露。',
      ],
    },
    college: '工业工程学院',
    milestones: [
      { period: '2023-Q2', description: '系统架构设计', status: 'completed' },
      { period: '2023-Q4', description: '数据分析模块开发', status: 'ongoing' },
      { period: '2024-Q1', description: '工厂试点测试', status: 'pending' },
      { period: '2024-Q4', description: '系统全面部署', status: 'pending' },
    ],
    researchResults: [
      {
        title: '物联网在智能制造中的应用',
        publication: 'Journal of Manufacturing Systems',
        date: '2023',
        doi: '10.1016/j.jmsy.2023.123456',
      },
    ],
    funding: { amount: '60万元', source: '国家重点研发计划' },
    application: '应用于智能制造生产线，减少停机时间30%，提升产品质量5%。',
    cooperation: {
      title: '合作模式',
      details: [
        '技术许可：提供控制系统使用权，费用30万-80万元。',
        '联合开发：与企业合作定制系统，费用面议。',
        '技术服务：提供系统维护支持，收费15万-40万元。',
      ],
    },
    contact: 'smartfactory@cas.ac.cn',
    filterTags: [
      '高端装备制造', '新一代信息技术', '技术创新', '集成创新', '工程样机', '中试(原型机)', '技术许可', '联合开发', '技术服务', '先进制造'
    ],
  },
  {
    id: '4',
    title: '新能源汽车电池管理系统',
    description: '研发高效、安全的电池管理系统，提升新能源汽车续航里程和电池寿命，已成功应用于多款车型。',
    labName: '刘工团队',
    timeRange: { start: '2022-01', end: '2023-05' },
    progress: 100,
    status: 'completed',
    tags: ['新能源', '电池技术', '嵌入式系统'],
    teamSize: 10,
    media: {
      type: 'image',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHnttkMOsh5x5LSw5tBeMVhwTmIEfMV63yAUApYUcn1nasQ3YHRFlw2UiT5a7ZfVc8_PmFd8hM5d6NQNLlmfMD9nSIQJAl9I7sH5Zzsq2HkSFa34a-g4buiR7692EGphsvtF83WPHvue2m-UdJQY_jUMrXTsyMReckvolVgXI2IQ4nyQ5Oo9LQh5L1f4-CDNmAi2K-gnJUNvpaXtY9mm_FrEb2PEGF3DVWE1RWQeRSBzF0thovpDEtNAuQIE4KJGNrnaA6CQ2mzll2',
    },
    leader: {
      name: '刘工',
      title: '高级工程师',
      avatar: '/avatars/leader4.jpg',
      bio: '新能源汽车领域资深工程师，拥有20年电池管理经验，获国家科技进步奖。',
    },
    views: 540,
    likes: 120,
    introduction: {
      overview: '研发高效电池管理系统，优化电池性能，延长使用寿命，适用于多种新能源汽车。',
      standards: [
        '系统设计：支持高密度电池组，兼容多种车型。',
        '性能优化：提升续航里程15%，电池寿命延长20%。',
        '安全测试：通过1000次循环测试，确保系统稳定性。',
        '量产验证：在3款车型上成功应用。',
      ],
    },
    college: '能源与动力工程学院',
    milestones: [
      { period: '2022-Q1', description: '系统设计与开发', status: 'completed' },
      { period: '2022-Q3', description: '实验室测试', status: 'completed' },
      { period: '2023-Q1', description: '量产验证', status: 'completed' },
      { period: '2023-Q2', description: '市场推广', status: 'completed' },
    ],
    researchResults: [
      {
        title: '高效电池管理算法研究',
        publication: 'Journal of Power Sources',
        date: '2022',
        doi: '10.1016/j.jpowsour.2022.123456',
      },
    ],
    funding: { amount: '100万元', source: '国家新能源汽车专项' },
    application: '应用于新能源汽车，提升续航里程和电池安全性，减少充电时间10%。',
    cooperation: {
      title: '技术合作',
      details: [
        '技术转让：提供BMS技术授权，费用80万-150万元。',
        '技术服务：提供系统优化支持，收费20万-50万元。',
        '联合开发：与车企合作定制BMS，费用面议。',
      ],
    },
    contact: 'bms@energy.edu.cn',
    filterTags: [
      '新能源', '高端装备制造', '应用创新', '集成创新', '产业化', '技术转让', '技术服务', '联合开发', '材料化工'
    ],
  },
  {
    id: '5',
    title: '虚拟现实教育平台',
    description: '构建沉浸式虚拟现实教育平台，提供互动式学习体验，应用于K12教育和职业培训领域。',
    labName: '赵老师团队',
    timeRange: { start: '2023-09', end: '2024-08' },
    progress: 15,
    status: 'pending',
    tags: ['虚拟现实', '教育科技', '内容开发'],
    teamSize: 7,
    media: {
      type: 'image',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnF77xmS4YiAOHSRQWlOeSH3kKsbga7dlBxEZGPsxzbVCmfO1bU_nLssBwnCRs_r_rNhoCzXJiMnNjzT587KlPhqNgO0AMlT1xfdNVw8VfL5GlQNURv3Yao_92cVWkMJDzUt6O2whuHr9oo3w3BRLhl8O9kBHdAo61gi0RRV3hRIKYbm5YJgb67uPClzu96pyhLanDZL51EbUVQ_Hw_tT-RiAdHbUmQxZMnx9YhwkZYc48zEowFdq-9XiokAI7mZN5kIb4kv4JIc22',
    },
    leader: {
      name: '赵老师',
      title: '副教授',
      avatar: '/avatars/leader5.jpg',
      bio: '教育技术领域专家，专注于VR/AR应用，发表50余篇论文，主持国家教育科技项目。',
    },
    views: 150,
    likes: 25,
    introduction: {
      overview: '开发沉浸式VR教育平台，提供互动学习体验，覆盖K12和职业培训。',
      standards: [
        '内容开发：设计100个VR教育场景，覆盖多学科。',
        '技术实现：基于Unity和VR设备，优化交互体验。',
        '用户测试：在10所学校试点，收集用户反馈。',
        '平台部署：支持云端和本地部署，兼容多平台。',
      ],
    },
    college: '教育技术学院',
    milestones: [
      { period: '2023-Q3', description: '平台原型设计', status: 'ongoing' },
      { period: '2023-Q4', description: '内容开发', status: 'pending' },
      { period: '2024-Q2', description: '学校试点', status: 'pending' },
      { period: '2024-Q3', description: '平台上线', status: 'pending' },
    ],
    researchResults: [],
    funding: { amount: '30万元', source: '教育部教育技术专项' },
    application: '应用于K12课堂和职业培训，提供沉浸式学习体验，提高学生参与度30%。',
    cooperation: {
      title: '合作模式',
      details: [
        '内容授权：提供VR教育内容，费用10万-30万元。',
        '技术服务：提供平台维护支持，收费5万-15万元。',
        '联合开发：与学校合作开发定制课程，费用面议。',
      ],
    },
    contact: 'vreducation@edu.cn',
    filterTags: [
      '数字创意', '相关服务业', '应用创新', '商业模式创新', '概念验证', '原型样机', '内容授权', '技术服务', '联合开发', '文化创新'
    ],
  },
  {
    id: '6',
    title: '智慧农业物联网解决方案',
    description: '基于物联网和传感器技术，开发智慧农业解决方案，实现精准灌溉、智能施肥和病虫害预警。',
    labName: '孙研究员团队',
    timeRange: { start: '2023-04', end: '2024-10' },
    progress: 30,
    status: 'ongoing',
    tags: ['智慧农业', '物联网', '传感器'],
    teamSize: 9,
    media: {
      type: 'image',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaO7DcVcxN5idl8HPhijsmUz731m9BIIW-bvcpnLgz-Qo9IyYr-LG3suiE7IHcfw1J7qy1VWVOjrgq2hjlqD8NR4Clw6p_N9kWzkYrI_Ki3-QrAMDPyZhmSKYpsTou8iWNLfWgwPxBsWxMQ4dNb-i183WtLEnpsFPFhebqmNn3ypPpCDj1AjVUhdAEgaFSIOf6fdGx7qZp34yy0C84N0H5Ua1oHENNYFTF70ObIVRLXufKv4_JGgMX0KGzx3o9UoB9LcG_rwZbz8oY',
    },
    leader: {
      name: '孙研究员',
      title: '研究员',
      avatar: '/avatars/leader6.jpg',
      bio: '农业物联网专家，主持多项国家级农业科技项目，获国家科技进步奖。',
    },
    views: 210,
    likes: 35,
    introduction: {
      overview: '开发智慧农业物联网系统，实现精准农业管理，提升农作物产量和质量。',
      standards: [
        '传感器部署：覆盖1000亩农田，实时监测环境数据。',
        '数据分析：处理50TB农业数据，优化灌溉和施肥。',
        '系统测试：在5个农场试点，验证系统效果。',
        '平台开发：支持移动端和PC端，方便农民操作。',
      ],
    },
    college: '农业工程学院',
    milestones: [
      { period: '2023-Q2', description: '传感器部署', status: 'completed' },
      { period: '2023-Q4', description: '数据分析平台开发', status: 'ongoing' },
      { period: '2024-Q2', description: '农场试点', status: 'pending' },
      { period: '2024-Q3', description: '系统优化', status: 'pending' },
    ],
    researchResults: [
      {
        title: '物联网在精准农业中的应用',
        publication: 'Computers and Electronics in Agriculture',
        date: '2023',
        doi: '10.1016/j.compag.2023.123456',
      },
    ],
    funding: { amount: '40万元', source: '国家农业科技专项' },
    application: '应用于现代农业，实现精准灌溉和施肥，减少资源浪费20%，提升产量15%。',
    cooperation: {
      title: '技术合作',
      details: [
        '技术转让：提供物联网系统授权，费用30万-60万元。',
        '技术服务：提供系统维护支持，收费10万-25万元。',
        '联合开发：与农业企业合作定制解决方案，费用面议。',
      ],
    },
    contact: 'smartagriculture@lab.com',
    filterTags: [
      '农业生产', '新材料', '应用创新', '技术创新', '原型样机', '中试(原型机)', '技术转让', '技术服务', '联合开发', '农业生产'
    ],
  },
];


const labs: LabInfo[] = [
  {
    id: '1',
    title: 'Intelligent Systems Laboratory',
    description: '专注于研发新一代智能机器人控制系统，致力于实现高精度运动控制和环境感知，应用于工业自动化和物流场景。',
    teamName: '张教授团队',
    location: '科研楼A区3层',
    status: 'open',
    tags: ['机器人技术', '人工智能', '自动化'],
    metrics: { label1: '研究人员', value1: '15人', label2: '成果转化', value2: '8项' },
    badge: { icon: <StarIcon fontSize="small" />, text: '国家重点实验室' },
    media: { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATY2gsV-LhEYZlIWKu28l7ZKHHTio3FyIrzCwQDa9K-Akaq3fZbKC0f3-F3lIr2EFXNPbC-5nGXqQ53nFiHV_4XOv8_y9ujXq04SWhmVh64P6mX6Zyjw3y2WzLmpG5nEbFU0WRNEOYoLrI0' },
    leader: { name: '张教授', title: '研究员' },
    basicInfo: { openHours: '周一至周五 9:00-17:00', email: 'robot@lab.com' },
    researchFocus: '张教授及其团队专注于机器人学习、计算机视觉以及人机交互等领域。研究方向包括但不限于：基于深度学习的机器人自主导航与避障，复杂环境下的目标识别与跟踪，以及自然语言处理在机器人指令理解中的应用。实验室致力于开发能够适应动态环境并与人类安全高效协作的智能机器人系统。',
    members: { researchers: 5, students: 15, engineers: 3 },
    equipment: [
      { name: '工业机器人臂', status: 'available' },
      { name: '运动捕捉系统', status: 'in-use' },
      { name: '高性能计算集群', status: 'available' },
    ],
    achievements: [
      { type: 'award', title: '国家自然科学基金重点项目', year: '2024', description: '荣获国家级重点项目支持，推动前沿技术研究。' },
      { type: 'patent', title: '智能控制算法专利', year: '2023', description: '核心控制算法获得国家发明专利授权。' },
      { type: 'paper', title: 'IEEE Robotics 论文发表', year: '2023', description: '研究成果在国际顶级机器人期刊发表。' },
    ],
    cooperation: {
      title: '项目合作',
      details: [
        '专利许可费：入门费（专利价值的10%-30%）+ 销售佣金（2%-5%）。',
        '独家许可：对于医疗器械专利，5年独家许可费为500-1000万人民币。',
        '交叉许可：互补专利的相互许可，成本低或无成本。',
      ],
      invitation: '我们欢迎与企业和研究机构在智能系统和机器人技术领域开展各种形式的合作。请联系我们探讨潜在的合作机会。',
    },
    cooperationMethods: ['全部', '技术转让', '技术开发', '委托开发', '股权融资', '落地孵化', '其他'],
    recruitment: {
      description: '实验室长期招聘博士后、研究助理和访问学者，致力于智能机器人和人工智能领域的研究。如果您对我们的研究方向感兴趣，并具备相关的学术背景和研究经验，欢迎将您的简历和研究计划发送至以下邮箱：',
      email: 'hr-robotlab@lab.com',
    },
    filterTags: [
      '先进制造', '新一代信息技术', '机器人技术', '技术转让', '技术开发', '委托开发', '股权融资', '落地孵化', '其他'
    ],
  },
  {
    id: '2',
    title: '医学影像与AI诊断实验室',
    description: '结合医学影像学与人工智能技术，研发智能诊断系统，提高疾病早期筛查和诊断的准确性与效率。',
    teamName: '李博士团队',
    location: '科研楼B区502室',
    status: 'successful',
    tags: ['医疗AI', '医学影像', '深度学习'],
    metrics: { label1: '核心期刊论文', value1: '30+篇', label2: '合作医院', value2: '5家' },
    badge: { icon: <VerifiedIcon fontSize="small" />, text: '省级重点实验室' },
    media: { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyBQAopGyV6FsbXDodAp3V66NupzXfsawawR2hBcAL4Yvtgx7IMvQ_bX2gEbJ8C6aAWhPx0YBIbR0v_F_k3fbD7nm39yAiuP52uW2vJ1WbyJ-JI9P-IJpfuNSq99' },
    leader: { name: '李博士', title: '研究员' },
    basicInfo: { openHours: '周一至周五 8:30-17:30', email: 'medical-ai@lab.com' },
    researchFocus: '李博士团队专注于医学影像处理、深度学习算法和可解释性AI技术。研究方向包括基于CNN和Transformer的算法影像分析、疾病早期检测模型开发、以及AI辅助诊断系统的临床验证。实验室目标是为基层医疗机构提供高效、低成本的智能诊断解决方案。',
    members: { researchers: 6, students: 10, engineers: 4 },
    equipment: [
      { name: '高分辨率CT扫描仪', status: 'available' },
      { name: 'GPU计算集群', status: 'in-use' },
      { name: '医学影像分析工作站', status: 'available' },
    ],
    achievements: [
      { type: 'paper', title: 'Medical Image Analysis 论文发表', year: '2023', description: '研究成果在国际顶级医学影像期刊发表中。' },
      { type: 'award', title: '国家科技进步奖', year: '2024', description: '因AI诊断系统研发荣获国家级奖项。' },
    ],
    cooperation: {
      title: '合作模式',
      details: [
        '技术服务：提供AI诊断系统咨询，收费20万-50万元。',
        '技术许可：授权影像分析算法，费用30万-80万元。',
        '联合开发：与医院合作开发定制化诊断工具，费用面议。',
      ],
      invitation: '我们欢迎与医疗机构和科技企业在医学影像AI领域展开合作，共同推动精准医疗发展。',
    },
    cooperationMethods: ['全部', '技术委托', '技术开发', '技术转让', '其他'],
    recruitment: {
      description: '实验室招聘计算机视觉、医学影像处理领域的博士后和研究助理。欢迎有深度学习或医学背景的学者加入我们，简历请发送至：',
      email: 'hr-medicalai@lab.com',
    },
    filterTags: [
      '生物医工', '新一代信息技术', '医疗AI', '技术委托', '技术开发', '技术转让', '其他'
    ],
  },
  {
    id: '3',
    title: '智能制造与工业物联网实验室',
    description: '研究智能工厂架构、工业大数据分析、设备预测性维护等技术，推动制造业向智能化、网络化转型。',
    teamName: '王博士团队',
    location: '科研楼C区101-105室',
    status: 'open',
    tags: ['智能制造', '工业物联网', '大数据'],
    metrics: { label1: '专利数量', value1: '20+项', label2: '合作企业', value2: '10+家' },
    badge: { icon: <BusinessCenterIcon fontSize="small" />, text: '产学研合作基地' },
    media: { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW4GVbJy0uobLTM_WN8-Dt4A2sg0k3m9FtQwQCluAvfmF4VdvAQsh8cGbwK69eRGNokgUMCVJmu3F7LOTbArT4VKCEKQW4vOp' },
    leader: { name: '王博士', title: '研究员' },
    basicInfo: { openHours: '周一至周六 9:00-17:00', email: 'smart-mfg@lab.com' },
    researchFocus: '王博士团队专注于工业物联网、边缘计算和大数据分析技术。研究方向包括智能工厂控制系统开发、设备健康管理模型、以及生产过程优化算法。实验室目标是提升制造业效率，降低运营成本。',
    members: { researchers: 4, students: 12, engineers: 5 },
    equipment: [
      { name: '工业物联网网关', status: 'available' },
      { name: '高精度传感器阵列', status: 'in-use' },
      { name: '大数据处理服务器', status: 'available' },
    ],
    achievements: [
      { type: 'patent', title: '工业物联网优化算法专利', year: '2023', description: '获得国家发明专利授权。' },
      { type: 'paper', title: 'Journal of Manufacturing Systems 论文', year: '2023', description: '研究成果在国际期刊发表' },
    ],
    cooperation: {
      title: '合作模式',
      details: [
        '技术转让：提供物联网控制系统授权，费用50万-100万元。',
        '技术服务：提供工厂数字化转型咨询，收费20万-60万元。',
        '联合开发：与企业合作开发智能制造解决方案，费用面议。',
      ],
      invitation: '我们欢迎制造企业与我们合作，共同推动工业4.0技术落地。',
    },
    cooperationMethods: ['全部', '技术转让', '落地孵化', '技术开发', '股权融资'],
    recruitment: {
      description: '实验室招聘工业物联网、大数据分析领域的博士后和工程师。欢迎有经验的人才加入，简历请发送至：',
      email: 'hr-smartmfg@lab.com',
    },
    filterTags: [
      '先进制造', '高端装备制造', '智能制造', '技术转让', '落地孵化', '技术开发', '股权融资'
    ],
  },
  {
    id: '4',
    title: '先进材料设计与制备实验室',
    description: '致力于新型功能材料、高性能结构材料的计算设计、可控制备及性能表征，探索材料在新能源、航空航天等领域的应用。',
    teamName: '刘研究员团队',
    location: '科研楼D区',
    status: 'planning',
    tags: ['材料科学', '计算材料学', '纳米技术'],
    metrics: { label1: '预期研究项目', value1: '5个', label2: '设备投资', value2: '1000万元' },
    badge: { icon: <EventIcon fontSize="small" />, text: '筹建中' },
    media: { url: 'https://lh3.googleusercontent.com/aida-public/AB6FXuCLQzEp0MtPtCMcAFdfMaVuMwyISBukbt8gM4J8g3Vo8nU0vE' },
    leader: { name: '刘研究员', title: '研究员' },
    basicInfo: { openHours: '筹建中', email: 'materials@lab.com' },
    researchFocus: '研究新型材料的开发与应用，包括纳米材料和复合材料，服务于新能源和航空航天领域。',
    members: { researchers: 0, students: 0, engineers: 0 },
    equipment: [],
    achievements: [],
    cooperation: {
      title: '合作机会',
      details: [
        '技术开发：与企业合作开发新型材料，费用面议。',
        '技术咨询：提供材料设计建议，收费10万-30万元。',
      ],
      invitation: '欢迎新能源企业与我们合作，共同开发先进材料。',
    },
    cooperationMethods: ['全部', '技术开发', '技术咨询', '其他'],
    recruitment: {
      description: '实验室计划招聘材料科学领域的博士后和研究人员。欢迎申请，简历请发送至：',
      email: 'hr-materials@lab.com',
    },
    filterTags: [
      '新材料', '材料化工', '技术开发', '技术咨询', '其他'
    ],
  },
  {
    id: '5',
    title: '智慧城市与大数据实验室',
    description: '研究城市大数据分析、智能交通、公共安全、环境监测等技术，为智慧城市建设提供解决方案。',
    teamName: '城市科技研究所',
    location: '科研楼E区',
    status: 'open',
    tags: ['智慧城市', '大数据', '物联网'],
    metrics: { label1: '国家级项目', value1: '5项', label2: '技术报告', value2: '12份' },
    badge: { icon: <PublicIcon fontSize="small" />, text: '国际合作项目' },
    media: { url: 'https://via.placeholder.com/400x225?text=Smart+City+Lab' },
    leader: { name: '陈研究员', title: '研究员' },
    basicInfo: { openHours: '周一至周五 9:00-17:00', email: 'smartcity@lab.com' },
    researchFocus: '研究城市大数据分析和智能交通系统，优化城市管理和资源分配。',
    members: { researchers: 7, students: 15, engineers: 3 },
    equipment: [
      { name: '交通数据采集系统', status: 'available' },
      { name: '大数据分析集群', status: 'in-use' },
      { name: '环境传感器网络', status: 'available' },
    ],
    achievements: [
      { type: 'paper', title: 'IEEE Transactions on Smart Cities 论文', year: '2023', description: '智能交通优化算法发表。' },
      { type: 'award', title: '城市创新奖', year: '2024', description: '因智慧城市解决方案获评。' },
    ],
    cooperation: {
      title: '合作模式',
      details: [
        '技术开发：开发大数据平台，费用50万-120万元。',
        '技术服务：提供数据分析咨询，收费15万-40万元。',
        '联合项目：与政府合作开发智慧城市方案，费用面议。',
      ],
      invitation: '欢迎政府和企业合作，构建智慧城市生态。',
    },
    cooperationMethods: ['全部', '技术开发', '技术服务', '股权融资', '其他'],
    recruitment: {
      description: '实验室招聘大数据分析、智慧城市领域的博士后和研究助理。欢迎申请，简历请发送至：',
      email: 'hr-smartcity@lab.com',
    },
    filterTags: [
      '智慧城市', '大数据', '物联网', '技术开发', '技术服务', '股权融资', '其他'
    ],
  },
  {
    id: '6',
    title: '海洋环境与技术开发实验室',
    description: '关注海洋资源开发、环境保护及可持续发展技术，研发海洋工程与监测系统。',
    teamName: '海洋科技研究所',
    location: '科研楼F区',
    status: 'successful',
    tags: ['海洋科技', '环境保护', '可持续发展'],
    metrics: { label1: '科研人员', value1: '25人', label2: '国际合作', value2: '3项' },
    badge: { icon: <WavesIcon fontSize="small" />, text: '海洋技术中心' },
    media: { url: 'https://via.placeholder.com/400x225?text=Ocean+Tech+Lab' },
    leader: { name: '孙海洋', title: '研究员' },
    basicInfo: { openHours: '周一至周五 8:00-17:00', email: 'ocean@lab.com' },
    researchFocus: '研究海洋工程技术与生态保护，开发深海探测与污染治理系统。',
    members: { researchers: 8, students: 12, engineers: 5 },
    equipment: [
      { name: '深海探测仪', status: 'available' },
      { name: '水下机器人', status: 'in-use' },
      { name: '海洋数据处理中心', status: 'available' },
    ],
    achievements: [
      { type: 'patent', title: '深海探测技术专利', year: '2023', description: '获得国家发明专利授权。' },
      { type: 'award', title: '海洋环保技术奖', year: '2024', description: '因海洋污染治理技术获评。' },
    ],
    cooperation: {
      title: '合作模式',
      details: [
        '技术转让：海洋探测技术授权，费用60万-120万元。',
        '技术服务：提供海洋环保咨询，收费20万-50万元。',
        '联合开发：开发海洋技术装备，费用面议。',
      ],
      invitation: '欢迎海洋企业和科研机构合作，推动海洋技术创新。',
    },
    cooperationMethods: ['全部', '技术转让', '技术开发', '委托开发', '其他'],
    recruitment: {
      description: '实验室招聘海洋工程、生态保护领域的博士后和工程师。欢迎申请，简历发送至：',
      email: 'hr-ocean@lab.com',
    },
    filterTags: [
      '海洋科技', '环境保护', '可持续发展', '技术转让', '技术开发', '委托开发', '其他'
    ],
  },
];


const ResearchProjectsPage: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    application: 'all',
    innovation: 'all',
    maturity: 'all',
    cooperation: 'all',
    labDirection: 'all',
  });
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);
  const [selectedLab, setSelectedLab] = useState<LabInfo | null>(null);
  const [selectedCooperationMethod, setSelectedCooperationMethod] = useState<string>('all');
  // 新增tab状态
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // 可选：切换Tab时重置筛选
    // setSelectedFilters({
    //   application: 'all',
    //   innovation: 'all',
    //   maturity: 'all',
    //   cooperation: 'all',
    //   labDirection: 'all',
    // });
  };

  const handleFilterClick = (category: keyof typeof selectedFilters, id: string) => {
    setSelectedFilters((prev) => ({ ...prev, [category]: id }));
  };

  const handleCooperationMethodClick = (method: string) => {
    setSelectedCooperationMethod(method);
  };

  const renderFilterSection = (
    title: string,
    category: keyof typeof selectedFilters,
    options: { id: string; name: string }[]
  ) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#1f2937' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map((option) => (
          <Chip
            key={option.id}
            label={option.name}
            onClick={() => handleFilterClick(category, option.id)}
            variant={selectedFilters[category] === option.id ? 'filled' : 'outlined'}
            sx={{
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              '&.MuiChip-filled': {
                backgroundColor: '#2563eb',
                color: '#fff',
                '&:hover': { backgroundColor: '#1d4ed8' },
              },
              '&.MuiChip-outlined': {
                backgroundColor: '#f3f4f6',
                color: '#374151',
                borderColor: '#d1d5db',
                '&:hover': { backgroundColor: '#e5e7eb' },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );

  const renderProjectCard = (project: ProjectInfo) => (
    <Paper
      elevation={0}
      onClick={() => setSelectedProject(project)}
      sx={{
        borderRadius: 2,
        backgroundColor: '#fff',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: `0 4px 6px -1px ${alpha('#000', 0.1)}, 0 2px 4px -2px ${alpha('#000', 0.1)}`,
        },
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
        <Box
          component="img"
          src={project.media.url}
          alt={project.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        />
        <Chip
          label={project.status === 'ongoing' ? '进行中' : project.status === 'completed' ? '已完成' : '待发布'}
          color={project.status === 'ongoing' ? 'primary' : project.status === 'completed' ? 'success' : 'warning'}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            fontWeight: 500,
            backgroundColor: (theme) =>
              alpha(
                project.status === 'ongoing'
                  ? theme.palette.primary.main
                  : project.status === 'completed'
                  ? theme.palette.success.main
                  : theme.palette.warning.main,
                0.8
              ),
          }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: '#1f2937' }}>
          {project.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#6b7280' }}>
          <CalendarTodayIcon sx={{ fontSize: 16, mr: 1 }} />
          <Typography variant="body2">{`${project.timeRange.start} - ${project.timeRange.end}`}</Typography>
          <GroupIcon sx={{ fontSize: 16, ml: 2, mr: 1 }} />
          <Typography variant="body2">{project.labName}</Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.description}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">项目进度</Typography>
            <Typography variant="body2" color="primary">{project.progress}%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                backgroundColor: (theme) =>
                  project.status === 'ongoing'
                    ? theme.palette.primary.main
                    : project.status === 'completed'
                    ? theme.palette.success.main
                    : theme.palette.warning.main,
              },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            <VisibilityIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2">{project.views}</Typography>
            <ThumbUpIcon sx={{ fontSize: 16, ml: 1, mr: 0.5 }} />
            <Typography variant="body2">{project.likes}</Typography>
          </Box>
          <Chip label="查看详情" color="primary" size="small" />
        </Box>
      </Box>
    </Paper>
  );

  const renderLabCard = (lab: LabInfo) => (
    <Paper
      elevation={0}
      onClick={() => setSelectedLab(lab)}
      sx={{
        borderRadius: '12px',
        backgroundColor: 'white',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#f3f4f6' }}>
        <Box
          component="img"
          src={lab.media.url}
          alt={lab.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        />
        <Chip
          label={lab.status === 'open' ? '开放中' : lab.status === 'successful' ? '成果丰硕' : '筹建中'}
          color={lab.status === 'open' ? 'primary' : lab.status === 'successful' ? 'success' : 'warning'}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            fontWeight: 600,
            backgroundColor: (theme) =>
              alpha(
                lab.status === 'open'
                  ? theme.palette.primary.main
                  : lab.status === 'successful'
                  ? theme.palette.success.main
                  : theme.palette.warning.main,
                0.8
              ),
          }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: '#1f2937' }}>
          {lab.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#6b7280' }}>
          <LocationOnIcon sx={{ fontSize: 16, mr: 1 }} />
          <Typography variant="body2">{lab.location}</Typography>
          <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
            {lab.teamName.includes('张教授') ? (
              <GroupIcon sx={{ fontSize: 16 }} />
            ) : lab.teamName.includes('李博士') ? (
              <GroupIcon sx={{ fontSize: 16}} />
            ) : lab.teamName.includes('王博士') ? (
              <EngineeringIcon sx={{ fontSize: 16 }} />
            ) : lab.teamName.includes('刘研究员') ? (
              <NatureIcon sx={{ fontSize: 16 }} />
            ) : lab.teamName.includes('城市科技') ? (
              <DirectionsCarIcon sx={{ fontSize: 16 }} />
            ) : (
              <WavesIcon sx={{ fontSize: 16 }} />
            )}
            <Typography variant="body2" sx={{ ml: 1 }}>{lab.teamName}</Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {lab.description}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">{lab.metrics.label1}</Typography>
            <Typography variant="body2" color="text.secondary">{lab.metrics.label2}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="primary">{lab.metrics.value1}</Typography>
            <Typography variant="body2" color="primary">{lab.metrics.value2}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {lab.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            {lab.badge.icon}
            <Typography variant="body2" sx={{ ml: 1 }}>{lab.badge.text}</Typography>
          </Box>
          <Chip label="了解详情" color="primary" size="small" />
        </Box>
      </Box>
    </Paper>
  );
  

// Props 接口
interface Props {
  selectedProject: ProjectInfo | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectInfo | null>>;
}


const renderProjectDialog: React.FC<Props> = ({ selectedProject, setSelectedProject }) => (
  <Dialog open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} maxWidth="lg" fullWidth>
    {selectedProject && (
      <>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
              {selectedProject.title}
            </Typography>
            <IconButton onClick={() => setSelectedProject(null)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ maxWidth: '1000px', mx: 'auto', py: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1f2937' }}>
                {selectedProject.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#4b5563' }}>
                {selectedProject.description}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DescriptionIcon sx={{ mr: 2, color: '#4b7280' }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                      项目简介
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 2, color: '#374151' }}>
                    <strong>概述:</strong> {selectedProject.introduction.overview}
                  </Typography>
                  <Typography sx={{ mb: 1, color: '#374151' }}><strong>标准:</strong></Typography>
                  <Box component="ul" sx={{ pl: 4, listStyleType: 'disc', color: '#374151' }}>
                    {selectedProject.introduction.standards.map((standard: string, index: number) => (
                      <Box component="li" key={index} sx={{ mb: 0.5 }}>
                        {standard}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      component="img"
                      src={selectedProject.media.url}
                      alt={selectedProject.title}
                      sx={{ width: '100%', borderRadius: '8px' }}
                    />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                      项目信息
                    </Typography>
                   </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1, color: '#4b5563' }}>
                          <strong>负责人:</strong> {selectedProject.leader.name}
                        </Typography>
                        <Typography sx={{ mb: 1, color: '#4b5563' }}>
                          <strong>学院:</strong> {selectedProject.college}
                        </Typography>
                        <Typography sx={{ mb: 1, color: '#4b5563' }}>
                          <strong>资助:</strong> {selectedProject.funding.amount} ({selectedProject.funding.source})
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1, color: '#4b5563' }}>
                          <strong>团队规模:</strong> {selectedProject.teamSize} 人
                        </Typography>
                        <Typography sx={{ mb: 1, color: '#4b5563' }}>
                          <strong>浏览量:</strong> {selectedProject.views}
                        </Typography>
                        <Typography sx={{ mb: 1, color: '#4b5563' }}>
                          <strong>点赞:</strong> {selectedProject.likes}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
             <Grid item xs={12}>
                  <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', minHeight: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ fontWeight: 'bold', color: '#1f2937' }} variant="body1">
                        里程碑
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {selectedProject.milestones.map((milestone: ProjectInfo['milestones'][number], index: number) => (
                        <Chip
                          key={index}
                          label={`${milestone.period}: ${milestone.description}`}
                          color={milestone.status === 'completed' ? 'success' : milestone.status === 'ongoing' ? 'primary' : 'warning'}
                          size="small"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                      研究成果
                    </Typography>
                  </Box>
                  {selectedProject.researchResults.length > 0 ? (
                    selectedProject.researchResults.map((result: ProjectInfo['researchResults'][number], index: number) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="#374151">
                          <strong>{result.title}</strong> ({result.publication}, {result.date})
                        </Typography>
                        <Link href={`https://doi.org/${result.doi}`} target="_blank" sx={{ color: '#2563eb' }}>
                          查看DOI
                        </Link>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">暂无成果</Typography>
                  )}
                </Paper>
              </Grid>
             <Grid item xs={12}>
                  <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', minHeight: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <DirectionsCarIcon sx={{ mr: 2, color: '#4b7280' }} />
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                        应用场景
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#374151' }}>
                      {selectedProject.application}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', minHeight: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <HandshakeIcon sx={{ mr: 2, color: '#4b7280' }} />
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                        {selectedProject.cooperation.title}
                      </Typography>
                    </Box>
                    <Box component="ul" sx={{ pl: 4, listStyleType: 'disc', color: '#374151' }}>
                      {selectedProject.cooperation.details.map((detail: string, index: number) => (
                        <Box component="li" key={index} sx={{ mb: 0.5 }}>
                          {detail}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', minHeight: 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <EmailIcon sx={{ mr: 2, color: '#4b7280' }} />
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                        联系方式
                      </Typography>
                    </Box>
                    <Typography sx={{ color: '#374151' }}>
                      {selectedProject.contact}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
      </>
    )}
  </Dialog>
);

const renderLabDialog = () => (
  <Dialog open={Boolean(selectedLab)} onClose={() => setSelectedLab(null)} maxWidth="lg" fullWidth>
    {selectedLab && (
      <>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
              {selectedLab.title}
            </Typography>
            <IconButton onClick={() => setSelectedLab(null)}>
              <CloseIcon />
                       </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ maxWidth: '1000px', mx: '24px', py: '24px' }}>
            <Box sx={{ mb: 3 }}>
              <Box
                component="img"
                src={selectedLab.media.url}
                alt={selectedLab.title}
                sx={{
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2,
                  backgroundColor: '#f3f4f6',
                }}
              />
            </Box>
            <Box sx={{ mb: '24px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                  {selectedLab.title}
                </Typography>
              </Box>
            </Box>

            <section style={{ marginBottom: '24px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1f2937' }}>
                  基本信息
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 48, height: 48, backgroundColor: '#e5e7eb', mr: 2 }}>
                      <PersonOutlineIcon sx={{ fontSize: 32, color: '#6b7280' }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                        {selectedLab.leader.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {selectedLab.leader.title}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
                    {selectedLab.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: '#6b7280' }} />
                    <Typography variant="body2" sx={{ color: '#374151' }}>
                      开放时间: {selectedLab.basicInfo.openHours}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 16, mr: 1, color: '#6b7280' }} />
                    <Typography variant="body2" sx={{ color: '#374151' }}>
                      位置: {selectedLab.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ fontSize: 16, mr: 1, color: '#6b7280' }} />
                    <Typography variant="body2" sx={{ color: '#374151' }}>
                      联系方式: {selectedLab.basicInfo.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </section>

            <Divider sx={{ my: 4, borderColor: '#e5e7eb' }} />

            <section style={{ marginBottom: '24px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScienceIcon sx={{ mr: 2, color: '#6b7280' }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1f2937' }}>
                  研究重点
                </Typography>
              </Box>
              <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', minHeight: 'auto' }}>
                <Typography variant="body1" sx={{ color: '#374151', mb: 1 }}>
                  <strong>核心研究方向:</strong> {selectedLab.researchFocus}
                </Typography>
                <Typography variant="body2" sx={{ color: '#374151' }}>
                  <strong>技术目标:</strong> {selectedLab.title.includes('Intelligent Systems') 
                    ? '开发具有自主学习能力的机器人系统，结合多模态感知技术，推动工业4.0和智能物流发展。' 
                    : selectedLab.title.includes('医学影像') 
                    ? '构建高精度、可解释的AI诊断模型，覆盖多种影像类型，助力精准医疗落地。' 
                    : selectedLab.title.includes('智能制造') 
                    ? '实现生产过程的数字化转型，开发基于边缘计算的实时监控系统，提升制造效率。' 
                    : selectedLab.title.includes('先进材料') 
                    ? '探索纳米材料在能源存储和航空航天中的应用，开发高性能复合材料。' 
                    : selectedLab.title.includes('智慧城市') 
                    ? '优化城市资源管理，开发智能交通和环境监测系统，提升城市可持续性。' 
                    : '研发深海探测技术与海洋生态保护方案，推动海洋资源可持续利用。'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#374151', mt: 1 }}>
                  <strong>未来规划:</strong> 在未来3-5年内，实验室计划与行业领军企业合作，推进技术产业化，申请10项以上国家专利，并发表20篇以上高水平论文。
                </Typography>
              </Paper>
            </section>

            <Divider sx={{ my: 4, borderColor: '#e5e7eb' }} />

            <section style={{ marginBottom: '24px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon sx={{ mr: 2, color: '#6b7280' }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1f2937' }}>
                  实验室成员
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', textAlign: 'center', minHeight: 'auto' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
                      {selectedLab.members.researchers}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#6b7280' }}>
                      研究员
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', textAlign: 'center', minHeight: 'auto' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
                      {selectedLab.members.students}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#6b7280' }}>
                      学生
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', textAlign: 'center', minHeight: 'auto' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
                      {selectedLab.members.engineers}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#6b7280' }}>
                      工程师
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </section>

            <Divider sx={{ my: 4, borderColor: '#e5e7eb' }} />

            <section style={{ marginBottom: '24px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BuildIcon sx={{ mr: 2, color: '#6b7280' }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1f2937' }}>
                  实验室设备
                </Typography>
              </Box>
              <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', minHeight: 'auto' }}>
                {selectedLab.equipment.length > 0 ? (
                  <Grid container spacing={2}>
                    {selectedLab.equipment.map((equip, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip
                            label={equip.status === 'available' ? '可用' : '使用中'}
                            color={equip.status === 'available' ? 'success' : 'warning'}
                            size="small"
                            sx={{ mr: 2 }}
                          />
                          <Typography variant="body2" sx={{ color: '#374151' }}>
                            {equip.name}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    暂无设备信息
                  </Typography>
                )}
              </Paper>
            </section>

            <Divider sx={{ my: 4, borderColor: '#e5e7eb' }} />

            <section style={{ marginBottom: '24px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmojiEventsIcon sx={{ mr: 2, color: '#6b7280' }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1f2937' }}>
                  研究成果与荣誉
                </Typography>
              </Box>
              <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', minHeight: 'auto' }}>
                {selectedLab.achievements.length > 0 ? (
                  <Grid container spacing={2}>
                    {selectedLab.achievements.map((achievement, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#374151' }}>
                            {achievement.title} ({achievement.year})
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            {achievement.description}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#2563eb', mt: 0.5 }}>
                            类型: {achievement.type === 'award' ? '奖项' : achievement.type === 'patent' ? '专利' : '论文'}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    暂无成果
                  </Typography>
                )}
              </Paper>
            </section>

            <Divider sx={{ my: 4, borderColor: '#e5e7eb' }} />

            <section style={{ marginBottom: '24px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HandshakeIcon sx={{ mr: 2, color: '#6b7280' }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1f2937' }}>
                  {selectedLab.cooperation.title}
                </Typography>
              </Box>
              <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', minHeight: 'auto' }}>
                <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
                  {selectedLab.cooperation.invitation}
                </Typography>
                <Box component="ul" sx={{ pl: 4, listStyleType: 'disc', color: '#374151' }}>
                  {selectedLab.cooperation.details.map((detail, index) => (
                    <Box component="li" key={index} sx={{ mb: 0.5 }}>
                      {detail}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </section>

            <Divider sx={{ my: 4, borderColor: '#e5e7eb' }} />

            <section style={{ marginBottom: '24px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonAddIcon sx={{ mr: 2, color: '#6b7280' }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#1f2937' }}>
                  人才招聘
                </Typography>
              </Box>
              <Paper sx={{ p: 2, borderRadius: '12px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)', minHeight: 'auto' }}>
                <Typography variant="body1" sx={{ mb: 1, color: '#374151' }}>
                  {selectedLab.recruitment.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon sx={{ fontSize: 16, mr: 1, color: '#6b7280' }} />
                  <Typography variant="body2" sx={{ color: '#374151' }}>
                    联系邮箱: <Link href={`mailto:${selectedLab.recruitment.email}`}>{selectedLab.recruitment.email}</Link>
                  </Typography>
                </Box>
              </Paper>
            </section>
          </Box>
        </DialogContent>
      </>
    )}
  </Dialog>
);

  const filteredProjects = projects.filter((project) => {
    const matchesApplication =
      selectedFilters.application === 'all' ||
      project.filterTags.includes(FILTER_CATEGORIES.application.find((a) => a.id === selectedFilters.application)?.name || '');
    const matchesInnovation =
      selectedFilters.innovation === 'all' ||
      project.filterTags.includes(FILTER_CATEGORIES.innovation.find((i) => i.id === selectedFilters.innovation)?.name || '');
    const matchesMaturity =
      selectedFilters.maturity === 'all' ||
      project.filterTags.includes(FILTER_CATEGORIES.maturity.find((m) => m.id === selectedFilters.maturity)?.name || '');
    const matchesCooperation =
      selectedFilters.cooperation === 'all' ||
      project.filterTags.includes(FILTER_CATEGORIES.cooperation.find((c) => c.id === selectedFilters.cooperation)?.name || '');
    const matchesLabDirection =
      selectedFilters.labDirection === 'all' ||
      project.filterTags.includes(FILTER_CATEGORIES.labDirection.find((d) => d.id === selectedFilters.labDirection)?.name || '');
    return matchesApplication && matchesInnovation && matchesMaturity && matchesCooperation && matchesLabDirection;
  });

  const filteredLabs = labs.filter((lab) => {
    const matchesLabDirection =
      selectedFilters.labDirection === 'all' ||
      lab.filterTags.includes(FILTER_CATEGORIES.labDirection.find((d) => d.id === selectedFilters.labDirection)?.name || '');
    const matchesCooperation =
      selectedFilters.cooperation === 'all' ||
      lab.filterTags.includes(FILTER_CATEGORIES.cooperation.find((c) => c.id === selectedFilters.cooperation)?.name || '');
    return matchesLabDirection && matchesCooperation;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1f2937' }}>
        科研项目与实验室
      </Typography>

      {/* 顶部Tab切换 */}
      <Box sx={{ mb: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="实验室信息" />
          <Tab label="研究项目展示" />
        </Tabs>
      </Box>

      {/* 根据Tab显示不同的筛选条件 */}
      <Box sx={{ mb: 8 }}>
        {activeTab === 1 && (
          <>
            {renderFilterSection('应用领域', 'application', FILTER_CATEGORIES.application)}
            {renderFilterSection('创新类型', 'innovation', FILTER_CATEGORIES.innovation)}
            {renderFilterSection('成熟度', 'maturity', FILTER_CATEGORIES.maturity)}
            {renderFilterSection('合作方式', 'cooperation', FILTER_CATEGORIES.cooperation)}
          </>
        )}
        {activeTab === 0 && (
          <>
            {renderFilterSection('实验室方向', 'labDirection', FILTER_CATEGORIES.labDirection)}
            {renderFilterSection('合作方式', 'cooperation', FILTER_CATEGORIES.cooperation)}
          </>
        )}
      </Box>

      {activeTab === 1 && (
        <>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1f2937' }}>
            科研项目
          </Typography>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  {renderProjectCard(project)}
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                  没有符合条件的项目
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}

      {activeTab === 0 && (
        <>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1f2937' }}>
            实验室
          </Typography>
          <Grid container spacing={3}>
            {filteredLabs.length > 0 ? (
              filteredLabs.map((lab) => (
                <Grid item xs={12} sm={6} md={4} key={lab.id}>
                  {renderLabCard(lab)}
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                  没有符合条件的实验室
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}

      {renderProjectDialog({ selectedProject, setSelectedProject })}
      {renderLabDialog()}
      
    </Container>
  );
};

export default ResearchProjectsPage;