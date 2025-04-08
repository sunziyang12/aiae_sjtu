import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
} from '@mui/material';
import {
  BusinessCenter as BusinessCenterIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';

/**
 * 活动接口
 */
interface Activity {
  id: number;
  type: 'project' | 'team' | 'education' | 'award';
  title: string;
  date: string;
  description: string;
}

/**
 * 活动卡片组件
 * 展示用户的活动记录
 * 
 * @component
 * @param {Object} props - 组件属性
 * @param {Activity[]} props.activities - 用户活动列表
 * @returns {JSX.Element} 返回活动卡片组件
 */
const ActivitiesCard: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  // 获取活动类型对应的图标
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <BusinessCenterIcon />;
      case 'team':
        return <GroupIcon />;
      case 'education':
        return <SchoolIcon />;
      case 'award':
        return <EmojiEventsIcon />;
      default:
        return <BusinessCenterIcon />;
    }
  };

  // 获取活动类型对应的颜色
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'project':
        return '#2196f3';
      case 'team':
        return '#9c27b0';
      case 'education':
        return '#4caf50';
      case 'award':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        backgroundColor: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          最近活动
        </Typography>

        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <Box key={activity.id}>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: `${getActivityColor(activity.type)}15`,
                    color: getActivityColor(activity.type),
                    mr: 2,
                  }}
                >
                  {getActivityIcon(activity.type)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {activity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {activity.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.date}
                  </Typography>
                </Box>
              </Box>
              {index < activities.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="text.secondary">
              暂无活动记录
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivitiesCard; 