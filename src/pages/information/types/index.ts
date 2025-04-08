/**
 * 信息管理模块类型定义
 * 
 * 功能描述：
 * 1. 定义信息管理模块所需的所有类型
 * 2. 提供类型检查和代码提示
 * 3. 确保类型安全
 * 
 * 主要类型：
 * 1. InfoItem - 信息项基础类型
 * 2. FilterOptions - 过滤选项类型
 * 3. RegistrationForm - 报名表单类型
 * 4. SubscriptionForm - 订阅表单类型
 * 
 * 类型关系：
 * 1. InfoItem 作为基础类型，被其他组件和功能使用
 * 2. FilterOptions 用于信息过滤功能
 * 3. RegistrationForm 用于报名功能
 * 4. SubscriptionForm 用于订阅功能
 * 
 * 类型扩展：
 * 1. 可以根据需要添加新的类型
 * 2. 可以扩展现有类型的属性
 * 3. 可以创建类型组合
 * 
 * 注意事项：
 * 1. 保持类型定义的清晰和简洁
 * 2. 确保类型定义的完整性
 * 3. 避免类型定义的冗余
 * 4. 保持类型命名的一致性
 */

// 定义SubCategory类型，用于存储子分类信息
export interface SubCategory {
  id: string;
  name: string;
}

// 定义Category类型，用于存储分类信息
export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

// 定义Categories类型，用于存储所有分类信息
export interface Categories {
  [key: string]: Category;
}

// 定义InfoItem类型，用于存储信息条目信息
export interface InfoItem {
  id: string;
  title: string;
  type: string;
  subType: string;
  date: string;
  capacity: string;
  image?: string;
  description: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  isFavorited?: boolean;
  registrationDeadline?: string;
  schedule?: Array<{ time: string; title: string }>;
  tags?: string[];
  organizer?: string;
  contact?: string;
  policyMaterials?: Material[];
  policyUrl?: string;
  policyTarget?: string;
  requirements?: string;
  benefits?: string;
  courseOutline?: CourseOutlineItem[];
  courseMaterials?: CourseMaterial[];
  speakers?: Array<{
    name: string;
    title: string;
    avatar?: string;
    bio?: string;
  }>;
}

// 定义FilterOptions类型，用于存储过滤选项信息
export interface FilterOptions {
  searchText: string;
  selectedType: string;
  selectedSubType: string;
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: 'date' | 'capacity';
}

// 定义RegistrationForm类型，用于存储注册表单信息
export interface RegistrationForm {
  name: string;
  phone: string;
  email: string;
  organization?: string;
  remark?: string;
}

// 定义ActionResponse类型，用于存储操作响应信息
export interface ActionResponse {
  success: boolean;
  message: string;
}

// Mock 用户收藏列表
export const userFavorites = new Set<string>();

// Mock 用户报名列表
export const userRegistrations = new Set<string>();

// 定义categories常量，用于存储所有分类信息   
export const categories: Categories = {
  activity: {
    id: 'activity',
    name: '活动',
    subCategories: [
      { id: 'competition', name: '竞赛' },
      { id: 'workshop', name: '工作坊' },
      { id: 'meetup', name: '交流会' }
    ]
  },
  lecture: {
    id: 'lecture',
    name: '讲座',
    subCategories: [
      { id: 'technology', name: '技术' },
      { id: 'business', name: '商业' },
      { id: 'innovation', name: '创新' }
    ]
  },
  course: {
    id: 'course',
    name: '课程',
    subCategories: [
      { id: 'skill', name: '技能培训' },
      { id: 'entrepreneurship', name: '创业指导' },
      { id: 'professional', name: '专业课程' }
    ]
  },
  policy: {
    id: 'policy',
    name: '政策',
    subCategories: [
      { id: 'national', name: '国家政策' },
      { id: 'local', name: '地方政策' },
      { id: 'university', name: '高校政策' }
    ]
  }
};

export interface Material {
  title: string;
  type: string;
  url: string;
  description?: string;
}

export interface Speaker {
  name: string;
  title: string;
  avatar: string;
  bio?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
}

export interface CourseOutlineItem {
  title: string;
  description: string;
}

export interface CourseMaterial {
  title: string;
  description: string;
  type: string;
  url: string;
} 