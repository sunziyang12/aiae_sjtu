import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { CalendarToday as CalendarIcon, Edit as EditIcon } from '@mui/icons-material';
import styles from '../styles/ProfilePage.module.css';

interface Activity {
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

interface ActivityDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  activity: Activity | null;
}

const ActivityDetailsDialog: React.FC<ActivityDetailsDialogProps> = ({
  open,
  onClose,
  activity,
}) => {
  const handleAddToCalendar = () => {
    if (!activity) return;

    // 构建日历事件数据
    const event = {
      title: activity.title,
      start: `${activity.date}T${activity.time}`,
      end: `${activity.date}T${activity.time}`, // 默认持续1小时
      description: `平台：${activity.platform}`,
      location: activity.platform,
    };

    // 构建日历URL
    const calendarUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(
      `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${event.start.replace(/[-:]/g, '')}
DTEND:${event.end.replace(/[-:]/g, '')}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`
    )}`;

    // 创建下载链接并触发下载
    const link = document.createElement('a');
    link.href = calendarUrl;
    link.download = `${activity.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!activity) return null;

  // 渲染活动详情对话框
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* 对话框标题 */}
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{activity.title}</Typography>
          <IconButton onClick={handleAddToCalendar} color="primary" title="添加到日历">
            <CalendarIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      {/* 对话框内容 */}
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              日期和时间
            </Typography>
            <Typography variant="body1">
              {activity.date} {activity.time}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              平台
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">{activity.platformIcon}</Typography>
              <Typography variant="body1">{activity.platform}</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              活动描述
            </Typography>
            <Typography variant="body1">
              这是一个重要的活动，请准时参加。如有特殊情况，请提前通知。
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      {/* 对话框底部按钮 */}
      <DialogActions>
        <Button onClick={onClose}>关闭</Button>
        <Button
          variant="contained"
            startIcon={<CalendarIcon />}
          onClick={handleAddToCalendar}
        >
          添加到日历
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityDetailsDialog; 