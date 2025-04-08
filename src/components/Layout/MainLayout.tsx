import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

/**
 * MainLayout组件的属性接口
 * @interface MainLayoutProps
 * @property {React.ReactNode} children - 子组件，将在主内容区域渲染
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * 主布局组件
 * 包含侧边导航栏、顶部栏和主内容区域
 * 
 * @component
 * @param {MainLayoutProps} props - 组件属性
 * @returns {JSX.Element} 返回完整的布局结构
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    // 最外层容器，使用flex布局
    <Box sx={{ display: 'flex' }}>
      {/* 侧边导航栏组件 */}
      <Sidebar />

      {/* 主内容区域容器 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // 占据剩余空间
          ml: '80px', // 左边距，与侧边栏宽度相同
          minHeight: '100vh', // 最小高度为视口高度
          backgroundColor: 'background.default', // 使用主题默认背景色
        }}
      >
        {/* 顶部栏组件 */}
        <TopBar />

        {/* 内容区域，设置内边距 */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 