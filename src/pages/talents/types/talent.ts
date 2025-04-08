export interface Talent {
  id: number;
  name: string;
  avatar: string;
  title: string;
  skills: string[];
  status: TalentStatus;
  education: string;
  location: string;
  description: string;
  achievements: string[];
  contact: {
    email: string;
    phone: string;
  };
  isCollected?: boolean;
}

export type SkillTag =
  | '商业运营'
  | '嵌入式开发'
  | '机械建模'
  | '软件开发'
  | '人工智能'
  | '产品设计'
  | '市场营销'
  | '项目管理';

export type TalentStatus =
  | '找项目中'
  | '可加入新团队'
  | '在校-本科生'
  | '在校-硕士生'
  | '在校-博士生'
  | '已有项目'
  | '已就业';

export interface TalentFilter {
  skills: SkillTag[];
  status: TalentStatus | '';
}

export interface Message {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
} 