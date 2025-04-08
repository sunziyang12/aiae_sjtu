import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CampaignIcon from '@mui/icons-material/Campaign';
import ForumIcon from '@mui/icons-material/Forum';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ScienceIcon from '@mui/icons-material/Science';

// 功能区配置
const features = [
  {
    icon: <CampaignIcon sx={{ fontSize: 36 }} />,
    title: '寻求报道',
    description: '展示创新成果，获得媒体关注',
    path: '/media',
    color: '#2196f3'
  },
  {
    icon: <ForumIcon sx={{ fontSize: 36 }} />,
    title: '讨论留言',
    description: '交流创新想法，分享研究心得',
    path: '/forum',
    color: '#ff9800'
  },
  {
    icon: <PersonAddIcon sx={{ fontSize: 36 }} />,
    title: '加入平台',
    description: '成为创新社区的一员',
    path: '/join',
    color: '#4caf50'
  },
  {
    icon: <ScienceIcon sx={{ fontSize: 36 }} />,
    title: '实验室信息',
    description: '了解实验室资源与动态',
    path: '/lab',
    color: '#9c27b0'
  }
];

const FeatureSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Paper
                elevation={0}
                onClick={() => navigate(feature.path)}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${alpha(feature.color, 0.2)}`,
                    '& .feature-icon': {
                      backgroundColor: feature.color,
                      color: '#fff',
                    }
                  },
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(feature.color, 0.1),
                    color: feature.color,
                    transition: 'all 0.3s ease',
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection; 