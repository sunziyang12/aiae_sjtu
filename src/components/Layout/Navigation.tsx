import React from 'react';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/projects', label: '项目库' },
    { path: '/talents', label: '人才库' },
    { path: '/investors', label: '投资者库' },
    { path: '/information', label: '信息栏' },
    { path: '/profile', label: '个人中心' },
  ];

  return (
    <>
      {navItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          onClick={() => navigate(item.path)}
          sx={{
            mx: 1,
            fontWeight: location.pathname === item.path ? 'bold' : 'normal',
          }}
        >
          {item.label}
        </Button>
      ))}
    </>
  );
};

export default Navigation; 