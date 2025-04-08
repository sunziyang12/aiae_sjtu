import { Investor, InvestorType } from '../types/investor';

export const mockInvestors: Investor[] = [
  {
    id: 1,
    name: '王投资',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    type: InvestorType.GOVERNMENT,
    organization: '国家科技创新基金',
    title: '投资总监',
    stages: ['pre-a', 'a', 'b'],
    areas: ['ai', 'biotech', 'enterprise'],
    sizes: ['500-2000', '2000+'],
    location: '北京',
    description: '专注于科技创新领域的国家级投资基金，重点支持人工智能、生物科技等战略性新兴产业。',
    advantages: [
      '国家级投资平台',
      '资金规模大',
      '产业资源丰富',
      '政策支持力度强'
    ],
    portfolio: [
      {
        name: '智能芯片科技有限公司',
        stage: 'b',
        amount: '5000万',
        date: '2023-06'
      },
      {
        name: '生物医药研发中心',
        stage: 'a',
        amount: '3000万',
        date: '2023-03'
      }
    ],
    contact: {
      email: 'investment@gov-fund.com',
      phone: '010-88886666',
      wechat: 'govfund001'
    },
    verificationStatus: 'verified',
    establishedYear: 2010,
    totalInvestment: '100亿',
    successfulExits: 15,
    teamSize: 50,
    website: 'www.gov-fund.com'
  },
  {
    id: 2,
    name: '张创投',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    type: InvestorType.PRIVATE_EQUITY,
    organization: '未来创投基金',
    title: '合伙人',
    stages: ['angel', 'pre-a', 'a'],
    areas: ['internet', 'consumer', 'fintech'],
    sizes: ['100-500', '500-2000'],
    location: '上海',
    description: '专注于互联网和消费升级领域的投资，深耕早期项目投资，注重长期价值创造。',
    advantages: [
      '投资经验丰富',
      '产业链资源完善',
      '服务体系成熟',
      '退出案例丰富'
    ],
    portfolio: [
      {
        name: '新零售科技平台',
        stage: 'a',
        amount: '2000万',
        date: '2023-09'
      },
      {
        name: '智能支付解决方案',
        stage: 'pre-a',
        amount: '800万',
        date: '2023-07'
      }
    ],
    contact: {
      email: 'partner@future-vc.com',
      phone: '021-66668888',
      wechat: 'futurevc002'
    },
    verificationStatus: 'verified',
    establishedYear: 2015,
    totalInvestment: '30亿',
    successfulExits: 8,
    teamSize: 20,
    website: 'www.future-vc.com'
  },
  {
    id: 3,
    name: '李孵化',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    type: InvestorType.INCUBATOR,
    organization: '创新工场加速器',
    title: '总经理',
    stages: ['angel', 'pre-a'],
    areas: ['enterprise', 'hardware', 'ai'],
    sizes: ['0-100', '100-500'],
    location: '深圳',
    description: '提供全方位的创业服务和资源对接，帮助早期创业项目快速成长。',
    advantages: [
      '创业服务体系完善',
      '导师资源丰富',
      '空间配套完善',
      '政府资源对接强'
    ],
    portfolio: [
      {
        name: '智能硬件创新公司',
        stage: 'pre-a',
        amount: '300万',
        date: '2023-10'
      },
      {
        name: '企业服务平台',
        stage: 'angel',
        amount: '100万',
        date: '2023-08'
      }
    ],
    contact: {
      email: 'manager@innovation-factory.com',
      phone: '0755-88889999',
      wechat: 'inno-factory'
    },
    verificationStatus: 'verified',
    establishedYear: 2018,
    totalInvestment: '5亿',
    successfulExits: 5,
    teamSize: 30,
    website: 'www.innovation-factory.com'
  },
  {
    id: 4,
    name: '陈天使',
    avatar: 'https://mui.com/static/images/avatar/4.jpg',
    type: InvestorType.INDIVIDUAL,
    organization: '独立投资人',
    title: '连续创业者',
    stages: ['angel'],
    areas: ['internet', 'consumer'],
    sizes: ['0-100'],
    location: '杭州',
    description: '连续创业者，专注于互联网和消费领域的天使投资，提供创业经验指导。',
    advantages: [
      '创业经验丰富',
      '个人资源广泛',
      '决策链短',
      '贴身辅导'
    ],
    portfolio: [
      {
        name: '社交电商平台',
        stage: 'angel',
        amount: '50万',
        date: '2023-11'
      },
      {
        name: '生活服务APP',
        stage: 'angel',
        amount: '80万',
        date: '2023-09'
      }
    ],
    contact: {
      email: 'chen@angel-invest.com',
      phone: '13888888888',
      wechat: 'angel-chen'
    },
    verificationStatus: 'verified',
    establishedYear: 2020,
    totalInvestment: '3000万',
    successfulExits: 2,
    website: 'www.angel-chen.com'
  }
]; 