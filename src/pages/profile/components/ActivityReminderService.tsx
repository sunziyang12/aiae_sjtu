import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { format, parse, isBefore, addMinutes, isAfter, differenceInMinutes } from 'date-fns';
import zhCN from 'date-fns/locale/zh-CN';

// 活动接口
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

interface ActivityReminderServiceProps {
  activities: Activity[];
}

const ActivityReminderService: React.FC<ActivityReminderServiceProps> = ({ activities }) => {
  // 提醒状态
  const [reminders, setReminders] = useState<{
    id: number;
    title: string;
    message: string;
    time: string;
  }[]>([]);

  // 当前显示的提醒
  const [currentReminder, setCurrentReminder] = useState<{
    id: number;
    title: string;
    message: string;
    time: string;
  } | null>(null);

  // 关闭提醒
  const handleCloseReminder = () => {
    setCurrentReminder(null);
  };

  // 检查活动提醒
  useEffect(() => {
    // 过滤出需要提醒的活动
    const activitiesWithReminders = activities.filter(
      activity => activity.reminder && activity.reminderTime
    );

    if (activitiesWithReminders.length === 0) return;

    // 创建提醒检查定时器
    const checkInterval = setInterval(() => {
      const now = new Date();
      const newReminders: {
        id: number;
        title: string;
        message: string;
        time: string;
      }[] = [];

      activitiesWithReminders.forEach(activity => {
        if (!activity.reminderTime) return;

        // 解析活动时间
        const activityDateTime = new Date(`${activity.date}T${activity.time}`);

        // 计算提醒时间
        const reminderDateTime = addMinutes(activityDateTime, -activity.reminderTime);

        // 检查是否应该提醒
        // 如果当前时间在提醒时间前后1分钟内，则触发提醒
        const timeDiff = differenceInMinutes(now, reminderDateTime);

        if (timeDiff >= 0 && timeDiff < 1) {
          // 活动还未开始
          if (isBefore(now, activityDateTime)) {
            newReminders.push({
              id: activity.id,
              title: '活动提醒',
              message: `活动"${activity.title}"将在${activity.reminderTime}分钟后开始`,
              time: activity.time,
            });
          } else {
            // 活动已开始
            newReminders.push({
              id: activity.id,
              title: '活动已开始',
              message: `活动"${activity.title}"已经开始`,
              time: activity.time,
            });
          }
        }
      });

      // 更新提醒状态
      if (newReminders.length > 0) {
        setReminders(prev => [...prev, ...newReminders]);

        // 显示第一个提醒
        if (!currentReminder) {
          setCurrentReminder(newReminders[0]);
        }
      }
    }, 60000); // 每分钟检查一次

    return () => clearInterval(checkInterval);
  }, [activities, currentReminder]);

  // 处理提醒队列
  useEffect(() => {
    if (currentReminder === null && reminders.length > 0) {
      // 显示下一个提醒
      setCurrentReminder(reminders[0]);
      // 从队列中移除已显示的提醒
      setReminders(prev => prev.slice(1));
    }
  }, [currentReminder, reminders]);

  return (
    <Snackbar
      open={!!currentReminder}
      autoHideDuration={6000}
      onClose={handleCloseReminder}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleCloseReminder}
        severity="info"
        sx={{ width: '100%' }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleCloseReminder}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <div>
          <strong>{currentReminder?.title}</strong>
          <div>{currentReminder?.message}</div>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>
            时间: {currentReminder?.time}
          </div>
        </div>
      </Alert>
    </Snackbar>
  );
};

export default ActivityReminderService; 