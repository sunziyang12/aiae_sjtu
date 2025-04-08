import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Avatar,
  Button,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';

/**
 * 顶部导航栏组件
 * 包含搜索框、通知消息、用户头像等功能
 * 
 * @component
 * @returns {JSX.Element} 返回顶部导航栏组件
 */
const TopBar: React.FC = () => {
  return (
    // 顶部导航栏容器
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#fff',
        color: '#333',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: 'none',
        width: 'calc(100% - 80px)', // 减去侧边栏宽度
        left: '80px', // 与侧边栏宽度相同
      }}
    >
      {/* 工具栏 */}
      <Toolbar sx={{ minHeight: 64, px: 2 }}>
        {/* 欢迎文本 */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            fontSize: '1rem',
            fontWeight: 500,
            mr: 4,
          }}
        >
          欢迎来到创新创业平台
        </Typography>

        {/* 搜索框区域 */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
            width: '40ch',
            mr: 'auto',
          }}
        >
          {/* 搜索图标 */}
          <Box
            sx={{
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
            }}
          >
            <SearchIcon />
          </Box>
          {/* 搜索输入框 */}
          <InputBase
            placeholder="搜索项目、人才、投资者..."
            sx={{
              color: 'inherit',
              width: '100%',
              '& .MuiInputBase-input': {
                padding: '8px 8px 8px 48px',
                width: '100%',
              },
            }}
          />
        </Box>

        {/* 功能按钮区域 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* 发布项目按钮 */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
              textTransform: 'none',
              mr: 2,
            }}
          >
            发布项目
          </Button>

          {/* 通知图标按钮 */}
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* 消息图标按钮 */}
          <IconButton size="large" color="inherit">
            <Badge badgeContent={2} color="error">
              <MessageIcon />
            </Badge>
          </IconButton>

          {/* 用户头像 */}
          <Avatar sx={{ bgcolor: '#1a237e' }}>U</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar; 