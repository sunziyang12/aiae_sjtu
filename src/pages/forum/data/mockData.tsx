import { Post, Comment, Category, SortOption, ShareOption } from '../types';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

// 模拟帖子数据
export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: '人工智能在医疗领域的应用前景',
    content: '随着人工智能技术的不断发展，其在医疗领域的应用也越来越广泛。从医学影像诊断到药物研发，AI技术正在改变着传统医疗模式...',
    author: {
      id: '101',
      name: '张三',
      avatar: 'https://i.pravatar.cc/150?img=1',
      title: '大一新生',
      isFollowing: false,
    },
    createdAt: '2024-04-05',
    tags: ['人工智能', '医疗', '创新'],
    likes: 128,
    comments: 32,
    shares: 16,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: '2',
    title: '如何提高实验室研究效率？',
    content: '在实验室工作中，提高研究效率是每个科研人员都关心的问题。以下是我的一些经验和建议...',
    author: {
      id: '102',
      name: '李博士',
      avatar: 'https://i.pravatar.cc/150?img=2',
      title: '实验室主任',
      isFollowing: true,
    },
    category: '经验分享',
    tags: ['实验室管理', '效率提升', '科研方法'],
    likes: 95,
    comments: 18,
    shares: 7,
    createdAt: '2023-03-28',
    isBookmarked: false,
    isLiked: true,
  },
  {
    id: '3',
    title: '新型材料在能源存储中的应用',
    content: '随着能源需求的增长，高效能源存储技术变得越来越重要。新型材料的发展为这一领域带来了新的可能...',
    author: {
      id: '103',
      name: '王研究员',
      avatar: 'https://i.pravatar.cc/150?img=3',
      title: '材料科学家',
      isFollowing: false,
    },
    category: '研究前沿',
    tags: ['新材料', '能源存储', '可持续发展'],
    likes: 156,
    comments: 24,
    shares: 12,
    createdAt: '2023-03-25',
    isBookmarked: true,
    isLiked: false,
  },
  {
    id: '4',
    title: '跨学科合作的重要性与挑战',
    content: '在当今复杂的科研环境中，跨学科合作已成为解决复杂问题的关键。然而，这种合作也面临着诸多挑战...',
    author: {
      id: '104',
      name: '陈教授',
      avatar: 'https://i.pravatar.cc/150?img=4',
      title: '跨学科研究专家',
      isFollowing: false,
    },
    category: '学术交流',
    tags: ['跨学科', '合作', '科研管理'],
    likes: 87,
    comments: 19,
    shares: 8,
    createdAt: '2023-03-20',
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: '5',
    title: '如何撰写高质量的研究论文',
    content: '撰写高质量的研究论文是每个科研人员的必备技能。本文将分享一些实用的技巧和注意事项...',
    author: {
      id: '105',
      name: '赵博士',
      avatar: 'https://i.pravatar.cc/150?img=5',
      title: '期刊编辑',
      isFollowing: true,
    },
    category: '学术写作',
    tags: ['论文写作', '学术发表', '研究技巧'],
    likes: 210,
    comments: 45,
    shares: 23,
    createdAt: '2023-03-15',
    isBookmarked: true,
    isLiked: true,
  }
];

// 添加模拟评论数据
export const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    content: '这篇文章写得很好，对人工智能在医疗领域的应用分析得很透彻。',
    author: {
      id: '201',
      name: '李医生',
      avatar: 'https://i.pravatar.cc/150?img=6',
      isFollowing: false,
    },
    createdAt: '2024-04-05 14:30',
    likes: 12,
    isLiked: false,
    isEdited: false,
    replies: [
      {
        id: '1-1',
        content: '同意，特别是关于AI辅助诊断的部分很有启发性。',
        author: {
          id: '202',
          name: '王研究员',
          avatar: 'https://i.pravatar.cc/150?img=3',
          isFollowing: false,
        },
        createdAt: '2024-04-05 15:00',
        likes: 5,
        isLiked: false,
        isEdited: false,
      },
    ],
  },
  {
    id: '2',
    content: '希望能看到更多具体的应用案例。',
    author: {
      id: '203',
      name: '张教授',
      avatar: 'https://i.pravatar.cc/150?img=1',
      isFollowing: true,
    },
    createdAt: '2024-04-05 16:20',
    likes: 8,
    isLiked: true,
    isEdited: false,
  },
];

// 分类数据
export const CATEGORIES: Category[] = [
  { id: 'all', name: '全部' },
  { id: 'ai', name: '人工智能' },
  { id: 'medical', name: '医疗健康' },
  { id: 'material', name: '新材料' },
  { id: 'energy', name: '能源环境' },
  { id: 'cross', name: '跨学科研究' }
];

// 排序选项
export const SORT_OPTIONS: SortOption[] = [
  { id: 'latest', name: '最新发布' },
  { id: 'hot', name: '最热门' },
  { id: 'most_commented', name: '评论最多' }
];

export const HOT_TAGS = [
  '人工智能',
  '医疗',
  '新材料',
  '能源',
  '跨学科',
  '实验室',
  '论文写作',
  '项目申请',
  '数据分析',
  '创新方法'
];

export const ACTIVE_USERS = [
  { id: '101', name: '张教授', avatar: 'https://i.pravatar.cc/150?img=1', posts: 42, isFollowing: false },
  { id: '102', name: '李博士', avatar: 'https://i.pravatar.cc/150?img=2', posts: 38, isFollowing: true },
  { id: '103', name: '王研究员', avatar: 'https://i.pravatar.cc/150?img=3', posts: 35, isFollowing: false },
  { id: '104', name: '陈教授', avatar: 'https://i.pravatar.cc/150?img=4', posts: 31, isFollowing: false },
  { id: '105', name: '赵博士', avatar: 'https://i.pravatar.cc/150?img=5', posts: 28, isFollowing: true }
];

// 分享选项
export const SHARE_OPTIONS: ShareOption[] = [
  { id: 'facebook', name: 'Facebook', icon: <FacebookIcon /> },
  { id: 'twitter', name: 'Twitter', icon: <TwitterIcon /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <LinkedInIcon /> },
  { id: 'whatsapp', name: 'WhatsApp', icon: <WhatsAppIcon /> },
  { id: 'email', name: '电子邮件', icon: <EmailIcon /> },
  { id: 'link', name: '复制链接', icon: <LinkIcon /> },
]; 