import React from 'react';
import { Box, List, ListItem, Typography, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';

/**
 * 主菜单项配置
 * 定义导航栏中显示的主要菜单项
 */
const mainMenuItems = [
  { path: '/', label: '平台首页', icon: <HomeIcon /> },
  { path: '/projects', label: '项目库', icon: <BusinessCenterIcon /> },
  { path: '/talents', label: '人才库', icon: <GroupIcon /> },
  { path: '/investors', label: '投资者库', icon: <AccountBalanceIcon /> },
  { path: '/information', label: '信息栏', icon: <InfoIcon /> },
];

/**
 * 侧边栏组件
 * 提供应用的主要导航功能
 * 
 * @component
 * @returns {JSX.Element} 返回侧边栏导航组件
 */
const Sidebar: React.FC = () => {
  // 用于页面导航的hook
  const navigate = useNavigate();
  // 用于获取当前路由位置的hook
  const location = useLocation();

  /**
   * 导航项组件
   * 渲染单个导航菜单项
   * 
   * @component
   * @param {Object} props - 组件属性
   * @param {Object} props.item - 菜单项数据
   * @param {boolean} props.isSelected - 是否为当前选中项
   * @returns {JSX.Element} 返回导航项组件
   */
  const NavItem = ({ item, isSelected }: { item: typeof mainMenuItems[0], isSelected: boolean }) => (
    <ListItem
      button
      onClick={() => navigate(item.path)}
      sx={{
        minHeight: 56,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 1,
        position: 'relative',
        // 选中状态时显示左侧蓝色指示条
        '&:before': isSelected ? {
          content: '""',
          position: 'absolute',
          left: 0,
          top: '20%',
          height: '60%',
          width: 3,
          bgcolor: '#2196f3',
          borderTopRightRadius: 3,
          borderBottomRightRadius: 3,
        } : {},
      }}
    >
      {/* 图标容器 */}
      <Box
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          backgroundColor: isSelected ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
          color: isSelected ? '#2196f3' : '#666',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(33, 150, 243, 0.08)',
          },
        }}
      >
        {item.icon}
      </Box>
      {/* 导航项文字 */}
      <Typography
        variant="caption"
        sx={{
          fontSize: '0.7rem',
          mt: 0.5,
          color: isSelected ? '#2196f3' : '#666',
        }}
      >
        {item.label}
      </Typography>
    </ListItem>
  );

  return (
    // 侧边栏容器
    <Box
      sx={{
        width: 80, // 固定宽度
        backgroundColor: '#fff',
        height: '100vh', // 全屏高度
        position: 'fixed',
        left: 0,
        top: 0,
        borderRight: '1px solid rgba(0,0,0,0.08)', // 右侧边框
        display: 'flex',
        flexDirection: 'column',
        pt: 2,
      }}
    >
      {/* Logo区域 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: '#2196f3',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          创
        </Avatar>
      </Box>

      {/* 主导航菜单列表 */}
      <List sx={{ width: '100%', flex: 1 }}>
        {mainMenuItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isSelected={location.pathname === item.path}
          />
        ))}
      </List>

      {/* 个人中心按钮 - 固定在底部 */}
      <Box
        sx={{
          width: '100%',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          pt: 2,
          pb: 3,
        }}
      >
        <NavItem
          item={{ path: '/profile', label: '个人中心', icon: <PersonIcon /> }}
          isSelected={location.pathname === '/profile'}
        />
      </Box>
    </Box>
  );
};

export default Sidebar; 