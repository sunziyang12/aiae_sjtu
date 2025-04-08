# AIAE 平台项目文档

## 项目概述
AIAE 平台是一个信息展示和管理系统，主要用于展示和管理各类活动、讲座、课程等信息。

## 主要功能
1. 信息展示
   - 活动信息展示
   - 讲座信息展示
   - 课程信息展示
   - 政策信息展示

2. 信息管理
   - 信息分类管理
   - 信息搜索和筛选
   - 信息收藏功能
   - 信息分享功能

3. 用户功能
   - 信息订阅
   - 活动报名
   - 收藏管理
   - 分享功能

## 技术栈
- 前端框架：React + TypeScript
- UI 组件库：Material-UI
- 状态管理：React Hooks
- 构建工具：Vite

## 项目结构
```
src/
  ├── pages/              # 页面组件
  │   └── information/    # 信息管理页面
  ├── components/         # 公共组件
  ├── hooks/             # 自定义 Hooks
  ├── types/             # 类型定义
  └── utils/             # 工具函数
```

## 开发规范
详见 [开发规范文档](./development-rules.md)

## 快速开始
1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 贡献指南
1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证
MIT License 