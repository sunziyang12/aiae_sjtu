// 投资者类型枚举
export enum InvestorType {
  GOVERNMENT = 'government',
  PRIVATE_EQUITY = 'private_equity',
  INCUBATOR = 'incubator',
  INDIVIDUAL = 'individual'
}

// 投资阶段类型
export type InvestmentStage = 'angel' | 'pre-a' | 'a' | 'b' | 'c' | 'growth';

// 投资领域类型
export type InvestmentArea = 'ai' | 'biotech' | 'enterprise' | 'consumer' | 'hardware' | 'internet' | 'fintech' | 'medical';

// 投资规模类型
export type InvestmentSize = '0-100' | '100-500' | '500-2000' | '2000+';

// 投资者接口定义
export interface Investor {
  id: number;
  name: string;
  avatar: string;
  type: InvestorType;
  organization: string;
  title: string;
  stages: InvestmentStage[];
  areas: InvestmentArea[];
  sizes: InvestmentSize[];
  location: string;
  description: string;
  advantages: string[];
  portfolio: Array<{
    name: string;
    stage: InvestmentStage;
    amount: string;
    date: string;
  }>;
  contact: {
    email: string;
    phone: string;
    wechat?: string;
  };
  verificationStatus: 'verified' | 'pending' | 'unverified';
  establishedYear?: number;
  totalInvestment?: string;
  successfulExits?: number;
  teamSize?: number;
  website?: string;
} 