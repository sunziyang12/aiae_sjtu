import React from 'react';
import { Card, CardContent, Box, Typography, Button, Stack, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { ArrowForward as ArrowForwardIcon, MoreHoriz as MoreIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';
import styles from '../styles/ProfilePage.module.css';

/**
 * 活动接口
 */
export interface Activity {
  id: number;
  title: string;
  time: string;
  date: string;
  platform: string;
  platformIcon: string;
  description?: string;
  reminder?: boolean;
  reminderTime?: number; // 提前提醒的分钟数
}

interface ActivityCardProps {
  title: string;
  activities: Activity[];
  onMoreClick?: () => void;
  onActivityClick?: (activity: Activity) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  activities,
  onMoreClick,
  onActivityClick,
}) => {
  return (
    <Card className={styles.activityCard}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton size="small" onClick={onMoreClick}>
            <MoreIcon />
          </IconButton>
        </Box>
        <Stack spacing={2}>
          {activities.map((activity) => (
            <Box
              key={activity.id}
              className={styles.activityItem}
              onClick={() => onActivityClick?.(activity)}
            >
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {activity.date}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {activity.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                  <Box component="span">{activity.platformIcon}</Box>
                  <Typography variant="caption" color="text.secondary">
                    {activity.platform}
                  </Typography>
                </Box>
              </Box>
              <IconButton size="small">
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ActivityCard; 