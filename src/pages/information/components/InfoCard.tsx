import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  alpha,
  Avatar
} from '@mui/material';
import { InfoItem } from '../types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  info: InfoItem;
  onClick: () => void;
}
// 获取状态文本
const getStatusText = (status: string) => {
  switch (status) {
    case 'upcoming':
      return '即将开始';
    case 'ongoing':
      return '进行中';
    case 'ended':
      return '已结束';
    default:
      return status;
  }
};
// 获取状态颜色   
const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'info';
    case 'ongoing':
      return 'success';
    case 'ended':
      return 'error';
    default:
      return 'default';
  }
};

export const InfoCard: React.FC<InfoCardProps> = ({ info, onClick }) => {
  // 生成随机背景色
  const getRandomColor = () => {
    const colors = ['#FFE0E6', '#E3F5FF', '#E5ECF6', '#FFF4E5', '#EFE6FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Card
      onClick={onClick}
      className={styles.card}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`
        },
        position: 'relative',
        overflow: 'visible',
        height: '100%',
        borderRadius: 3,
        bgcolor: 'background.paper'
      }}
    >
      <Box
        sx={{
          height: 120,
          bgcolor: getRandomColor(),
          position: 'relative',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.9),
            position: 'absolute',
            top: '100%',
            left: 24,
            transform: 'translateY(-50%)',
            border: '2px solid #fff'
          }}
        >
          {info.type === '活动' ? '活' :
            info.type === '课程' ? '课' :
              info.type === '讲座' ? '讲' : '政'}
        </Avatar>
        {info.type !== '政策' && (
          <Chip
            label={info.status === 'upcoming' ? '即将开始' : info.status === 'ongoing' ? '进行中' : '已结束'}
            color={info.status === 'upcoming' ? 'primary' : info.status === 'ongoing' ? 'success' : 'error'}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 500,
              px: 1
            }}
          />
        )}
      </Box>

      <CardContent sx={{ p: 3, pt: 4 }}>
        <Stack spacing={2}>
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                lineHeight: 1.4,
                height: '2.8em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {info.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                mb: 2,
                height: '3em',
                opacity: 0.8
              }}
            >
              {info.description}
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {info.tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main',
                  borderRadius: 1,
                  height: 24,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  mb: 0.5
                }}
              />
            ))}
          </Stack>

          <Stack spacing={1} sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, opacity: 0.8 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {info.date}
              </Typography>
            </Box>

            {info.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <LocationOnIcon sx={{ fontSize: 16, mr: 1, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }} noWrap>
                  {info.location}
                </Typography>
              </Box>
            )}

            {info.capacity && (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <PeopleIcon sx={{ fontSize: 16, mr: 1, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }} noWrap>
                  {info.capacity}
                </Typography>
              </Box>
            )}
          </Stack>

          {info.type !== '政策' && info.status === 'upcoming' && (
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              立即报名
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}; 