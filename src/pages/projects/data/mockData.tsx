import { Project, Comment } from '../types';

// 模拟项目数据
export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI智能客服系统',
    shortDescription: '基于自然语言处理的智能客服解决方案',
    description: '本项目旨在开发一个基于深度学习的智能客服系统，能够理解用户意图并提供准确的回答。系统采用最新的NLP技术，支持多轮对话和情感分析。',
    image: '/images/projects/ai-customer-service.jpg',
    type: 'research',
    industry: 'ai_application',
    stage: 'prototype',
    tags: ['NLP', '深度学习', '智能客服'],
    team: {
      size: 5,
      members: [
        { name: '张三', role: '技术负责人', avatar: '/images/avatars/avatar1.jpg' },
        { name: '李四', role: '产品经理', avatar: '/images/avatars/avatar2.jpg' }
      ],
      status: 'recruiting',
      description: '我们是一支由5名成员组成的团队，专注于AI技术研发。'
    },
    location: '北京',
    progress: 60,
    resourceNeeds: ['tech', 'funding'],
    contact: {
      name: '张三',
      email: 'contact@example.com',
      phone: '13800138000',
      wechat: 'zhangsan'
    }
  },
  {
    id: 2,
    title: 'AI教育平台',
    shortDescription: '个性化AI学习助手',
    description: '开发一个基于AI的个性化学习平台，通过分析学生的学习行为和能力，提供定制化的学习内容和建议。',
    image: '/images/projects/ai-education.jpg',
    type: 'student',
    industry: 'ai_education',
    stage: 'innovation',
    tags: ['教育科技', '个性化学习', 'AI助手'],
    team: {
      size: 3,
      members: [
        { name: '王五', role: '创始人', avatar: '/images/avatars/avatar3.jpg' }
      ],
      status: 'tech_needed',
      description: '我们是一个3人创业团队，致力于教育科技创新。'
    },
    location: '上海',
    progress: 30,
    resourceNeeds: ['tech', 'operation'],
    contact: {
      name: '李四',
      email: 'contact2@example.com',
      phone: '13900139000',
      wechat: 'lisi'
    }
  }
];

// 模拟评论数据
export const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    user: {
      id: 101,
      name: '评论者1',
      avatar: '/images/avatars/avatar4.jpg'
    },
    content: '这个项目很有前景，期待看到更多进展！',
    time: '2024-03-15 10:30',
    likes: 5
  },
  {
    id: 2,
    user: {
      id: 102,
      name: '评论者2',
      avatar: '/images/avatars/avatar5.jpg'
    },
    content: '对AI教育很感兴趣，希望能了解更多细节。',
    time: '2024-03-15 11:45',
    likes: 3
  }
]; 