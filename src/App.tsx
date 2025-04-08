/**
 * 主应用程序组件
 * 
 * 功能描述：
 * 1. 提供应用的根组件
 * 2. 使用 ThemeProvider 应用全局主题
 * 3. 使用 CssBaseline 重置浏览器默认样式
 * 4. 使用 Router 提供路由功能
 * 5. 使用 MainLayout 作为应用的主要布局组件
 * 6. 使用 Routes 定义路由映射
 * 7. 使用 Route 定义具体的路由路径和对应的组件
 */ 
import React from 'react';    
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material'; // 组件
import { theme } from './theme'; // 主题
import MainLayout from './components/Layout/MainLayout'; // 主布局
import HomePage from './pages/home'; // 首页
import ProjectsPage from './pages/projects'; // 项目
import TalentsPage from './pages/talents'; // 人才
import InvestorsPage from './pages/investors'; // 投资者
import InformationPage from './pages/information'; // 信息
import ProfilePage from './pages/profile'; // 个人中心
import MediaPage from './pages/media'; // 媒体
import ForumPage from './pages/forum'; // 论坛
import JoinPage from './pages/join'; // 加入
import LabPage from './pages/lab'; // 实验室

// 主应用程序组件，使用 React.FC 定义为无状态函数组件
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}> {/* 应用主题 */}
      <CssBaseline /> {/* 重置浏览器默认样式 */}
      <Router> {/* 路由 */}
        <MainLayout> {/* 主布局 */}
          <Routes> {/* 路由映射 */}
            <Route path="/" element={<HomePage />} /> {/* 首页 */}
            <Route path="/projects" element={<ProjectsPage />} /> {/* 项目 */}
            <Route path="/talents" element={<TalentsPage />} /> {/* 人才 */}
            <Route path="/investors" element={<InvestorsPage />} /> {/* 投资者 */}
            <Route path="/information" element={<InformationPage />} /> {/* 信息 */}
            <Route path="/profile" element={<ProfilePage />} /> {/* 个人中心 */}
            <Route path="/media" element={<MediaPage />} /> {/* 媒体 */}
            <Route path="/forum" element={<ForumPage />} /> {/* 论坛 */}
            <Route path="/join" element={<JoinPage />} /> {/* 加入 */}
            <Route path="/lab" element={<LabPage />} /> {/* 实验室 */}
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
    // ThemeProvider 用于应用全局主题
    // CssBaseline 用于重置浏览器默认样式
    // Router 提供路由功能
    // MainLayout 是应用的主要布局组件
    // Routes 定义路由映射
    // Route 定义具体的路由路径和对应的组件
  );
};

export default App;