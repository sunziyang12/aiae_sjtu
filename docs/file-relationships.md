# AIAE 平台文件关联关系说明

## 核心页面组件关系

### 信息管理页面 (pages/information/)
```
index.tsx (入口文件)
├── 导入 InfoTypeFilter
├── 导入 InfoSearchFilter
├── 导入 InfoCard
├── 导入 InfoPagination
├── 导入 EmptyState
├── 导入 InfoDetailDialog
├── 导入 SubscriptionDialog
└── 使用 useInfoFilter Hook
```

### 信息卡片组件 (InfoCard/)
```
InfoCard.tsx
├── 导入 InfoActions
├── 导入 InfoItem 类型
└── 使用 userFavorites 数据
```

### 信息操作组件 (InfoActions/)
```
InfoActions.tsx
├── 导入 InfoItem 类型
└── 使用 Material-UI 组件
```

## 数据流关系

### 类型定义
```
types/index.ts
├── 导出 InfoItem 类型
├── 导出 RegistrationForm 类型
├── 导出 SubscriptionSettings 类型
└── 导出 userFavorites 数据
```

### 数据管理
```
data/mockData.ts
└── 导出 mockInfoItems 数据
    └── 使用 InfoItem 类型
```

## 组件依赖关系

### 过滤组件
```
InfoTypeFilter.tsx
├── 导入 categories 数据
└── 使用 InfoItem 类型

InfoSearchFilter.tsx
├── 导入 FilterOptions 类型
└── 使用 Material-UI 组件
```

### 对话框组件
```
InfoDetailDialog.tsx
├── 导入 InfoItem 类型
├── 导入 RegistrationForm 类型
├── 导入 RegistrationDialog
└── 使用 Material-UI 组件

RegistrationDialog.tsx
├── 导入 RegistrationForm 类型
└── 使用 Material-UI 组件

SubscriptionDialog.tsx
├── 导入 SubscriptionSettings 类型
└── 使用 Material-UI 组件
```

## Hook 依赖关系

### 信息过滤 Hook
```
hooks/useInfoFilter.ts
├── 导入 InfoItem 类型
├── 导入 FilterOptions 类型
└── 使用 React Hooks
```

## 工具函数依赖

### API 工具
```
utils/api.ts
├── 导入 api 类型定义
└── 使用 axios/fetch
```

### 日期工具
```
utils/date.ts
└── 使用 date-fns/dayjs
```

## 样式依赖

### 主题配置
```
styles/theme.ts
└── 使用 Material-UI theme
```

## 服务层依赖

### API 服务
```
services/api.ts
├── 导入 api 类型定义
└── 使用 utils/api
```

### 存储服务
```
services/storage.ts
└── 使用 localStorage/sessionStorage
```

## 关键数据流

1. 信息列表数据流：
```
mockData.ts → useInfoFilter → InfoCard → InfoDetailDialog
```

2. 用户操作数据流：
```
InfoActions → userFavorites → localStorage
```

3. 表单数据流：
```
RegistrationDialog → RegistrationForm → API
SubscriptionDialog → SubscriptionSettings → API
```

## 组件通信方式

1. Props 传递：
   - 父组件 → 子组件
   - 通过 Props 传递数据和回调函数

2. Context 共享：
   - 主题配置
   - 用户认证状态
   - 全局状态

3. 自定义 Hooks：
   - 信息过滤逻辑
   - 本地存储操作
   - API 调用封装

## 文件导入规范

1. 第三方库导入：
```typescript
import React from 'react';
import { Box, Button } from '@mui/material';
```

2. 项目内部导入：
```typescript
import { InfoCard } from './components/InfoCard';
import { useInfoFilter } from './hooks/useInfoFilter';
import { InfoItem } from '../../types';
```

3. 类型导入：
```typescript
import type { InfoItem, RegistrationForm } from '../../types';
```

## 注意事项

1. 避免循环依赖
2. 保持导入路径清晰
3. 合理使用类型定义
4. 遵循组件职责单一原则
5. 注意性能优化 