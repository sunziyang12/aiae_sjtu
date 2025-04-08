# AIAE 平台文件架构说明

## 项目根目录
```
aiae-platform/
├── docs/                  # 项目文档
├── public/               # 静态资源
├── src/                  # 源代码
└── package.json          # 项目配置文件
```

## 文档目录 (docs/)
```
docs/
├── README.md             # 项目说明文档
├── technical.md          # 技术文档
├── architecture.md       # 架构文档
└── development-rules.md  # 开发规范文档
```

## 源代码目录 (src/)
```
src/
├── pages/                # 页面组件
│   └── information/      # 信息管理页面
│       ├── components/   # 页面级组件
│       │   ├── InfoCard/           # 信息卡片组件
│       │   │   ├── InfoCard.tsx    # 组件实现
│       │   │   └── index.tsx       # 组件导出
│       │   ├── InfoActions/        # 操作按钮组件
│       │   │   ├── InfoActions.tsx # 组件实现
│       │   │   └── index.tsx       # 组件导出
│       │   ├── InfoTypeFilter/     # 类型过滤组件
│       │   │   ├── InfoTypeFilter.tsx
│       │   │   └── index.tsx
│       │   ├── InfoSearchFilter/   # 搜索过滤组件
│       │   │   ├── InfoSearchFilter.tsx
│       │   │   └── index.tsx
│       │   ├── InfoDetailDialog/   # 详情对话框组件
│       │   │   ├── InfoDetailDialog.tsx
│       │   │   └── index.tsx
│       │   ├── InfoPagination/     # 分页组件
│       │   │   ├── InfoPagination.tsx
│       │   │   └── index.tsx
│       │   ├── EmptyState/         # 空状态组件
│       │   │   ├── EmptyState.tsx
│       │   │   └── index.tsx
│       │   ├── SubscriptionDialog/ # 订阅对话框组件
│       │   │   ├── SubscriptionDialog.tsx
│       │   │   └── index.tsx
│       │   └── RegistrationDialog/ # 报名对话框组件
│       │       ├── RegistrationDialog.tsx
│       │       └── index.tsx
│       ├── hooks/       # 页面级 Hooks
│       │   └── useInfoFilter.ts    # 信息过滤 Hook
│       ├── types/       # 页面级类型定义
│       │   └── index.ts            # 类型定义文件
│       ├── data/        # 页面级数据
│       │   └── mockData.ts         # 模拟数据
│       └── index.tsx    # 页面入口文件
├── components/          # 公共组件
│   ├── Layout/          # 布局组件
│   │   ├── Header.tsx   # 头部组件
│   │   ├── Footer.tsx   # 底部组件
│   │   └── index.tsx    # 布局导出
│   └── common/          # 通用组件
│       ├── Button/      # 按钮组件
│       ├── Input/       # 输入组件
│       └── Modal/       # 模态框组件
├── hooks/               # 公共 Hooks
│   ├── useAuth.ts       # 认证 Hook
│   ├── useTheme.ts      # 主题 Hook
│   └── useLocalStorage.ts # 本地存储 Hook
├── types/               # 公共类型定义
│   ├── api.ts          # API 类型定义
│   ├── common.ts       # 通用类型定义
│   └── index.ts        # 类型导出
├── utils/              # 工具函数
│   ├── api.ts          # API 请求工具
│   ├── date.ts         # 日期处理工具
│   ├── format.ts       # 格式化工具
│   └── validation.ts   # 验证工具
├── styles/             # 全局样式
│   ├── theme.ts        # 主题配置
│   └── global.css      # 全局样式
├── assets/             # 静态资源
│   ├── images/         # 图片资源
│   └── icons/          # 图标资源
├── constants/          # 常量定义
│   ├── routes.ts       # 路由常量
│   └── config.ts       # 配置常量
├── services/           # 服务层
│   ├── api.ts          # API 服务
│   └── storage.ts      # 存储服务
└── App.tsx             # 应用入口组件
```

## 目录说明

### 1. 页面组件 (pages/)
- `information/`: 信息管理页面
  - `components/`: 页面级组件
    - `InfoCard/`: 信息卡片组件，用于展示信息概要
    - `InfoActions/`: 操作按钮组件，处理收藏和分享
    - `InfoTypeFilter/`: 类型过滤组件，用于筛选信息类型
    - `InfoSearchFilter/`: 搜索过滤组件，用于搜索和排序
    - `InfoDetailDialog/`: 详情对话框组件，展示详细信息
    - `InfoPagination/`: 分页组件，处理分页逻辑
    - `EmptyState/`: 空状态组件，展示无数据状态
    - `SubscriptionDialog/`: 订阅对话框组件，处理订阅设置
    - `RegistrationDialog/`: 报名对话框组件，处理活动报名
  - `hooks/`: 页面级 Hooks
    - `useInfoFilter.ts`: 信息过滤 Hook，处理过滤逻辑
  - `types/`: 页面级类型定义
    - `index.ts`: 定义页面相关的类型
  - `data/`: 页面级数据
    - `mockData.ts`: 模拟数据，用于开发和测试
  - `index.tsx`: 页面入口文件，组合所有组件

### 2. 公共组件 (components/)
- `Layout/`: 布局组件
  - `Header.tsx`: 头部组件，包含导航和用户信息
  - `Footer.tsx`: 底部组件，包含版权信息
- `common/`: 通用组件
  - `Button/`: 按钮组件，封装常用按钮样式
  - `Input/`: 输入组件，封装表单输入
  - `Modal/`: 模态框组件，封装弹窗功能

### 3. 公共 Hooks (hooks/)
- `useAuth.ts`: 认证 Hook，处理用户认证状态
- `useTheme.ts`: 主题 Hook，处理主题切换
- `useLocalStorage.ts`: 本地存储 Hook，处理本地数据存储

### 4. 类型定义 (types/)
- `api.ts`: API 相关的类型定义
- `common.ts`: 通用类型定义
- `index.ts`: 类型导出文件

### 5. 工具函数 (utils/)
- `api.ts`: API 请求工具，封装网络请求
- `date.ts`: 日期处理工具，处理日期格式化
- `format.ts`: 格式化工具，处理数据格式化
- `validation.ts`: 验证工具，处理数据验证

### 6. 全局样式 (styles/)
- `theme.ts`: 主题配置，定义主题变量
- `global.css`: 全局样式，定义全局样式规则

### 7. 静态资源 (assets/)
- `images/`: 图片资源目录
- `icons/`: 图标资源目录

### 8. 常量定义 (constants/)
- `routes.ts`: 路由常量，定义路由配置
- `config.ts`: 配置常量，定义全局配置

### 9. 服务层 (services/)
- `api.ts`: API 服务，处理与后端的通信
- `storage.ts`: 存储服务，处理数据存储

## 文件命名规范
1. 组件文件使用 PascalCase 命名
2. 工具函数使用 camelCase 命名
3. 类型定义使用 PascalCase 命名
4. 样式文件使用 kebab-case 命名
5. 资源文件使用 kebab-case 命名

## 导入规范
1. 第三方库导入放在最前面
2. 项目内部导入按目录层级排序
3. 类型导入放在最后
4. 使用绝对路径导入项目内部文件

## 导出规范
1. 默认导出组件
2. 命名导出类型和工具函数
3. 使用 index.ts 统一导出
4. 避免循环依赖 