import { Investor, InvestorType } from '../types/investor';

export const mockInvestors: Investor[] = [
  {
    id: 1,
    name: '刘琳林',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    type: InvestorType.PRIVATE_EQUITY,
    organization: '烟台源禾股权投资基金管理有限公司',
    title: '投资总监',
    stages: ['pre-a', 'a', 'b'],
    areas: ['hardware', 'enterprise', 'biotech'],
    sizes: ['2000+'],
    location: '山东烟台',
    description: '烟台源禾股权投资基金管理有限公司成立于2019年，关注半导体、新能源、新材料、 生物医药、先进制造等领域。',
    advantages: [
      'TBD'
    ],
    portfolio: [
      {
        name: '因时机器人',
        stage: 'b',
        amount: '近亿人民币',
        date: '2025-04'
      },
      {
        name: '航天极创',
        stage: 'a',
        amount: '数千万人民币',
        date: '2024-01'
      }
    ],
    contact: {
      email: 'ytyhzb@163.com',
      phone: '0535-6887396'
    },
    verificationStatus: 'verified',
    establishedYear: 2019,
    totalInvestment: '10-20亿元人民币',
    successfulExits: 14,
    teamSize: 15,
    website: 'https://www.ytyhzb.com/'
  },
  {
    id: 2,
    name: '王一军',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    type: InvestorType.GOVERNMENT,
    organization: '中国风险投资有限公司',
    title: '董事',
    stages: ['angel', 'pre-a', 'a', 'b', 'growth'],
    areas: ['biotech', 'medical'],
    sizes: ['2000+'],
    location: '北京市',
    description: '中国风险投资有限公司（简称“中国风投”）于2000年由中国民主建国会中央委员会（简称“民建中央”）发起、民建会员参股设立，是专业从事风险投资的有限责任公司。中国风投的主营业务是创业风险投资和创业风险投资基金的发起设立及管理。该基金主要投资于节能环保、新材料、高端制造、军工、轨道交通、医药医疗领域初创期、扩张期企业。中国风投在北京、深圳、杭州、宁波青岛、沈阳分别设立有人民币基金，其中包括与科技部引导基金合作设立的节能环保领域专业基金，以及与国家发改委、财政部合作设立的新材料领域专业基金。',
    advantages: [
      '投资经验丰富',
      '产业链资源完善',
      '服务体系成熟',
      '退出案例丰富'
    ],
    portfolio: [
      {
        name: '乘乘集团',
        stage: 'a',
        amount: '超亿人民币',
        date: '2024-12'
      },
      {
        name: '中科伊和',
        stage: 'angel',
        amount: '金额未透露',
        date: '2023-04'
      }
    ],
    contact: {
      email: 'cvc@c-vc.com.cn',
      phone: '010-64685180',
      wechat: 'futurevc002'
    },
    verificationStatus: 'verified',
    establishedYear: 2000,
    totalInvestment: '>20亿元人民币',
    successfulExits: 223,
    teamSize: 500,
    website: 'http://www.c-vc.com.cn/'
  },
  {
    id: 3,
    name: '陆奇',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    type: InvestorType.INCUBATOR,
    organization: '奇绩创坛',
    title: '法定代表人',
    stages: ['angel', 'pre-a'],
    areas: ['enterprise', 'hardware', 'ai', 'consumer', 'internet'],
    sizes: ['0-100', '100-500'],
    location: '北京市',
    description: '奇绩创坛的前身是YC中国，由YC中国创始人陆奇博士于2018年创立。2019年11月，启航了全面本地化的品牌“奇绩创坛” 原班人马，初心不变, 继续为中国创业者服务。',
    advantages: [
      '创业服务体系完善',
      '导师资源丰富',
      '空间配套完善'
    ],
    portfolio: [
      {
        name: '偶域 Kig.Land',
        stage: 'pre-a',
        amount: '数百万人民币',
        date: '2025-04'
      },
      {
        name: '松应科技',
        stage: 'angel',
        amount: '金额未透露',
        date: '2025-03'
      }
    ],
    contact: {
      email: 'support@miracleplus.com',
    },
    verificationStatus: 'verified',
    establishedYear: 2018,
    totalInvestment: '5亿',
    successfulExits: 194,
    teamSize: 30,
    website: 'https://www.miracleplus.com/'
  },
  {
    id: 4,
    name: '袁荣俭',
    avatar: 'https://mui.com/static/images/avatar/4.jpg',
    type: InvestorType.PRIVATE_EQUITY,
    organization: '成都文轩股权投资基金管理有限公司',
    title: '董事长',
    stages: ['angel'],
    areas: ['fintech', 'hardware', 'internet', 'enterprise'],
    sizes: ['2000+'],
    location: '四川成都',
    description: '文轩资本成立于2014年，目前管理规模超过10亿元人民币，包括三支私募股权基金和一支产业投资基金。主要发起股东包括：第一家A+H两地上市的出版发行企业新华文轩（0811.HK，601811.SH）、中信证券的直投机构金石投资、全球最大中文互联网门户新浪（SINA.O）、多元化发展的行业巨擘东煌企业集团等多家业界实力雄厚的企业。在私募股权方面：主要聚焦文化、教育、传媒、娱乐、消费升级；同时关注科技、高端制造等国家政策战略支持行业。产业投资方面：以股东资源为依托，围绕文化、教育、传媒、娱乐、文化旅游等方面打造专项产业基金。',
    advantages: [
      'TBD',
    ],
    portfolio: [
      {
        name: '太阳井',
        stage: 'b',
        amount: '数千万人民币',
        date: '2025-04'
      },
      {
        name: '中科生态',
        stage: 'b',
        amount: '金额未透露',
        date: '2020-09'
      }
    ],
    contact: {
      phone: '028-85328952'
    },
    verificationStatus: 'verified',
    establishedYear: 2014,
    totalInvestment: '10-47亿元人民币',
    successfulExits: 17,
    website: 'http://www.winsharepe.com/'
  }
]; 