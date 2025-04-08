import React, { useState } from 'react';
import { Box } from '@mui/material';
import HomeCarousel from './components/HomeCarousel';
import FeatureSection from './components/FeatureSection';
import NewsSection from './components/NewsSection';

/**
 * 平台首页组件
 * 包含轮播图、功能区和新闻公告区域
 * 
 * @component
 * @returns {JSX.Element} 返回平台首页组件
 */
const HomePage: React.FC = () => {
  // 轮播图当前索引状态
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    // 主页容器
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: 3,
        px: 4,
      }}
    >
      {/* 轮播图区域 */}
      <Box sx={{ mb: 4 }}>
        <HomeCarousel
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
        />
      </Box>

      {/* 功能区域 */}
      <Box sx={{ mb: 4 }}>
        <FeatureSection />
      </Box>

      {/* 新闻公告区域 */}
      <Box>
        <NewsSection />
      </Box>
    </Box>
  );
};

export default HomePage; 