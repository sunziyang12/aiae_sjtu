import { InfoItem } from '../types/index';

export const mockInfoItems: InfoItem[] = [
  {
    id: '1',
    type: '活动',
    subType: '创新创业大赛',
    title: '2024年全国大学生创新创业大赛',
    date: '2024-04-15',
    location: '北京国际会议中心',
    status: 'upcoming',
    capacity: '150/200',
    tags: ['创新', '创业', '竞赛'],
    organizer: '教育部高等教育司',
    contact: 'innovation@edu.cn',
    description: '2024年度全国大学生创新创业大赛，聚焦科技创新与商业模式创新，为优秀项目提供展示平台和创业支持。',
    policyMaterials: []
  },
  {
    id: '2',
    type: '活动',
    subType: '科技竞赛',
    title: '全国大学生人工智能创新大赛',
    date: '2024-05-20',
    location: '上海国际会展中心',
    status: 'upcoming',
    capacity: '200/300',
    tags: ['AI', '创新', '竞赛'],
    organizer: '中国人工智能学会',
    contact: 'ai@caai.cn',
    description: '面向全国高校的人工智能创新大赛，涵盖机器学习、计算机视觉、自然语言处理等多个领域。',
    policyMaterials: []
  },
  {
    id: '3',
    type: '讲座',
    subType: '创业经验分享',
    title: '从0到1：大学生创业经验分享会',
    date: '2024-04-01',
    location: '线上直播',
    status: 'upcoming',
    capacity: '800/1000',
    tags: ['创业', '经验', '分享'],
    organizer: '创业学院',
    contact: 'startup@edu.cn',
    description: '邀请多位成功创业的大学生分享他们的创业历程、经验教训和心得体会。',
    policyMaterials: []
  },
  {
    id: '4',
    type: '讲座',
    subType: '创新技术前沿',
    title: 'AI技术发展趋势与创新应用',
    date: '2024-04-10',
    location: '线上直播',
    status: 'upcoming',
    capacity: '500/600',
    tags: ['AI', '技术', '创新'],
    organizer: '计算机学院',
    contact: 'cs@edu.cn',
    description: '探讨人工智能技术的最新发展趋势，以及在各个领域的创新应用案例。',
    policyMaterials: []
  },
  {
    id: '5',
    type: '政策',
    subType: '国家',
    title: '2024年国家级大学生创新创业训练计划项目申报指南',
    date: '2024-03-25',
    location: '全国范围',
    status: 'ongoing',
    capacity: '名额充足',
    tags: ['创新创业', '项目申报', '国家级'],
    organizer: '教育部高等教育司',
    contact: 'innovation@edu.gov.cn',
    description: '为深入贯彻落实习近平总书记关于科技创新的重要论述，实施创新驱动发展战略，深化高等教育改革，提高创新创业人才培养质量，现面向全国高校开展2024年国家级大学生创新创业训练计划项目申报工作。',
    policyUrl: 'https://www.moe.gov.cn/policy/2024/innovation',
    policyTarget: '全日制在校本科生（2-4年级），原则上要求项目参与学生不少于3人，鼓励跨年级、跨学科组建团队。项目负责人所在年级不得低于第二学年，且在项目结题前不得毕业。',
    requirements: `1. 项目创新性要求：
- 选题新颖，具有创新性和探索性
- 目标明确，研究方案可行
- 预期成果具有实际应用价值

2. 团队要求：
- 团队成员3-5人
- 配备1-2名指导教师
- 跨专业组队加分

3. 申报材料要求：
- 项目申请书（包含可行性分析）
- 经费预算表
- 团队成员简历
- 指导教师推荐信

4. 项目周期：
- 一般项目：1年
- 重点项目：2年`,
    benefits: `1. 项目资助：
- 一般项目：最高20万元
- 重点项目：最高50万元

2. 政策支持：
- 项目经费使用自主权
- 科研仪器设备优先使用
- 实验室资源优先调配

3. 成果转化支持：
- 优先推荐参加"互联网+"大赛
- 专利申请费用资助
- 成果转化绿色通道

4. 其他福利：
- 项目结题证书
- 优秀项目表彰
- 创新学分认定`,
    policyMaterials: [
      {
        title: '2024年国创计划项目申报书',
        type: 'doc',
        url: 'https://example.com/materials/application-2024.doc',
        description: '包含项目基本信息、研究内容、预期成果等'
      },
      {
        title: '项目预算编制说明',
        type: 'pdf',
        url: 'https://example.com/materials/budget-guide-2024.pdf',
        description: '详细的预算编制要求和示例'
      },
      {
        title: '申报材料清单及模板',
        type: 'zip',
        url: 'https://example.com/materials/templates-2024.zip',
        description: '包含所有需要提交的材料模板'
      }
    ]
  },
  {
    id: '6',
    type: '政策',
    subType: '地方',
    title: '北京市大学生创业引导基金申请指南',
    date: '2024-03-20',
    location: '北京市',
    status: 'ongoing',
    capacity: '名额充足',
    tags: ['创业扶持', '资金支持', '北京市'],
    organizer: '北京市科技创新委员会',
    contact: 'startup@beijing.gov.cn',
    description: '为促进北京市大学生创新创业，培育新兴产业发展，激发创新创业活力，特设立大学生创业引导基金。重点支持符合北京市产业发展方向，具有良好发展前景和创新性的创业项目。',
    policyUrl: 'https://www.beijing.gov.cn/policy/2024/startup',
    policyTarget: '在北京市高校就读的全日制在校生（含毕业5年内的毕业生），或在北京市注册成立企业的创业团队（企业注册时间不超过2年，创始人中至少有1名符合上述条件的大学生）。',
    requirements: `1. 企业要求：
- 在北京市注册成立
- 注册资本不低于10万元
- 具有独立法人资格
- 主营业务符合支持方向

2. 团队要求：
- 核心成员中大学生占比不低于50%
- 创始人为全职投入
- 具有相关领域经验或技术背景

3. 项目要求：
- 具有创新性商业模式
- 拥有自主知识产权
- 市场前景良好
- 已有初步用户验证

4. 材料要求：
- 商业计划书
- 财务报表
- 团队履历
- 相关证明材料`,
    benefits: `1. 资金支持：
- 种子轮：最高100万元
- A轮跟投：最高500万元
- 贷款贴息：年化利率50%补贴

2. 场地支持：
- 免费使用创业空间（2年）
- 租金补贴（最高50%）
- 公共服务设施使用

3. 配套服务：
- 创业导师指导
- 投资对接会
- 专业培训课程
- 法律财务咨询

4. 人才支持：
- 创业人才引进补贴
- 社保补贴
- 户口办理支持
- 人才公寓申请`,
    policyMaterials: [
      {
        title: '创业引导基金申请表',
        type: 'doc',
        url: 'https://example.com/materials/fund-application.doc',
        description: '基金申请的主要表格'
      },
      {
        title: '商业计划书模板',
        type: 'doc',
        url: 'https://example.com/materials/business-plan.doc',
        description: '包含商业计划书的详细提纲和要求'
      },
      {
        title: '财务预测表',
        type: 'xls',
        url: 'https://example.com/materials/financial-forecast.xls',
        description: '3年财务预测表格模板'
      }
    ]
  },
  {
    id: '7',
    type: '课程',
    subType: '技能培训',
    title: 'Python数据分析实战课程',
    date: '2024-04-15',
    location: '线上直播',
    status: 'upcoming',
    capacity: '100/200',
    tags: ['Python', '数据分析', '技能培训'],
    organizer: '数据科学学院',
    contact: 'ds@edu.cn',
    description: '本课程将教授Python数据分析的核心技能，包括数据处理、可视化、机器学习等内容。通过实战项目，帮助学员掌握数据分析的全流程。',
    courseOutline: [
      { title: 'Python基础', description: 'Python语法、数据结构、函数等基础知识' },
      { title: '数据处理', description: '使用Pandas进行数据清洗、转换和分析' },
      { title: '数据可视化', description: '使用Matplotlib和Seaborn进行数据可视化' },
      { title: '机器学习基础', description: '常用机器学习算法原理与实践' }
    ],
    courseMaterials: [
      {
        title: '课程讲义',
        description: '包含所有课程内容的详细讲义',
        type: 'pdf',
        url: 'https://example.com/materials/python-course.pdf'
      },
      {
        title: '实战项目',
        description: '课程配套的实战项目资料',
        type: 'zip',
        url: 'https://example.com/materials/project.zip'
      }
    ]
  },
  {
    id: '8',
    type: '课程',
    subType: '创业指导',
    title: '大学生创业实战训练营',
    date: '2024-05-01',
    location: '创业学院',
    status: 'upcoming',
    capacity: '50/100',
    tags: ['创业', '商业计划', '融资'],
    organizer: '创业学院',
    contact: 'startup@edu.cn',
    description: '面向有创业意向的大学生，提供从创意到落地的全方位指导。课程包括商业计划书撰写、融资技巧、团队管理等内容。',
    courseOutline: [
      { title: '创业基础', description: '创业概念、市场分析、商业模式设计' },
      { title: '商业计划', description: '商业计划书撰写、财务预测、风险评估' },
      { title: '融资技巧', description: '融资渠道、投资人沟通、估值方法' },
      { title: '团队管理', description: '团队建设、领导力培养、冲突解决' }
    ],
    courseMaterials: [
      {
        title: '创业指南',
        description: '创业全流程指导手册',
        type: 'pdf',
        url: 'https://example.com/materials/startup-guide.pdf'
      },
      {
        title: '案例集',
        description: '成功创业案例分析',
        type: 'pdf',
        url: 'https://example.com/materials/cases.pdf'
      }
    ]
  },
  {
    id: '9',
    type: '课程',
    subType: '专业课程',
    title: '人工智能前沿技术课程',
    date: '2024-04-20',
    location: '计算机学院',
    status: 'upcoming',
    capacity: '80/150',
    tags: ['AI', '深度学习', '计算机视觉'],
    organizer: '计算机学院',
    contact: 'ai@edu.cn',
    description: '本课程深入讲解人工智能领域的前沿技术，包括深度学习、计算机视觉、自然语言处理等。适合有一定编程基础的学生。',
    courseOutline: [
      { title: '深度学习基础', description: '神经网络原理、反向传播算法、优化方法' },
      { title: '计算机视觉', description: '图像处理、目标检测、图像分割' },
      { title: '自然语言处理', description: '文本分类、情感分析、机器翻译' },
      { title: '强化学习', description: '马尔可夫决策过程、Q学习、策略梯度' }
    ],
    courseMaterials: [
      {
        title: '课程讲义',
        description: '包含所有课程内容的详细讲义',
        type: 'pdf',
        url: 'https://example.com/materials/ai-course.pdf'
      },
      {
        title: '实验指导',
        description: '课程配套实验指导手册',
        type: 'pdf',
        url: 'https://example.com/materials/lab-guide.pdf'
      }
    ]
  }
]; 