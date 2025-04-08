import { FilterOption } from '../types';

// 创业阶段选项
export const startupStages: FilterOption[] = [
  { value: 'all', label: '全部' },
  { value: 'innovation', label: '创新阶段' },
  { value: 'prototype', label: '原型开发中' },
  { value: 'seed', label: '种子轮等待' },
  { value: 'participated', label: '参赛项目' },
  { value: 'incubated', label: '已落地' },
  { value: 'other', label: '其他' },
];

// 所属行业选项
export const industries: FilterOption[] = [
  { value: 'all', label: '全部' },
  { value: 'ai_application', label: 'AI应用' },
  { value: 'ai_tech', label: 'AI基础技术' },
  { value: 'ai_hardware', label: 'AI硬件' },
  { value: 'ai_education', label: 'AI教育' },
  { value: 'ai_medical', label: 'AI医疗' },
  { value: 'ai_finance', label: 'AI金融' },
  { value: 'other', label: '其他' },
];

// 项目类型选项
export const projectTypes: FilterOption[] = [
  { value: 'all', label: '全部' },
  { value: 'research', label: '科研成果转化' },
  { value: 'student', label: '学生创业' },
  { value: 'cooperation', label: '校企合作' },
  { value: 'major', label: '大创项目' },
  { value: 'competition', label: '竞赛项目' },
];

// 资源需求选项
export const resourceNeeds: FilterOption[] = [
  { value: 'all', label: '全部' },
  { value: 'tech', label: '技术' },
  { value: 'funding', label: '资金' },
  { value: 'market', label: '市场' },
  { value: 'operation', label: '运营' },
  { value: 'talent', label: '人才' },
  { value: 'content', label: '内容' },
];

// 团队状态选项
export const teamStatus: FilterOption[] = [
  { value: 'all', label: '全部' },
  { value: 'complete', label: '团队完善' },
  { value: 'recruiting', label: '招募队友' },
  { value: 'tech_needed', label: '缺技术' },
  { value: 'operation_needed', label: '缺运营' },
]; 