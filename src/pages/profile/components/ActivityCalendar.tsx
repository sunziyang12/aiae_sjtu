import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, IconButton, Button, Stack } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Add as AddIcon } from '@mui/icons-material';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import styles from '../styles/ProfilePage.module.css';

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
  reminderTime?: number;
}

interface ActivityCalendarProps {
  activities: Activity[];
  onActivityClick: (activity: Activity) => void;
  onCreateActivity: () => void;
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  activities,
  onActivityClick,
  onCreateActivity,
}) => {
  // 当前显示的月份
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 获取当前月份的所有日期
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // 获取当前月份的活动
  const getActivitiesForDay = (day: Date) => {
    return activities.filter(activity => {
      const activityDate = new Date(activity.date);
      return isSameDay(activityDate, day);
    });
  };

  // 处理月份切换
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // 渲染日历头部
  const renderCalendarHeader = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {format(currentMonth, 'yyyy年MM月', { locale: zhCN })}
        </Typography>
        <Box>
          <IconButton onClick={handlePrevMonth} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextMonth} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  // 渲染星期头部
  const renderWeekDays = () => {
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', mb: 1 }}>
        {weekDays.map((day, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: index === 0 || index === 6 ? 'error.main' : 'text.primary',
            }}
          >
            {day}
          </Box>
        ))}
      </Box>
    );
  };

  // 渲染日历单元格
  const renderCalendarDays = () => {
    // 获取当前月份第一天是星期几
    const firstDayOfMonth = monthStart.getDay();

    // 创建日历网格
    const days = [];

    // 添加空白单元格
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Box key={`empty-${i}`} className={styles.calendarDay} />);
    }

    // 添加日期单元格
    monthDays.forEach((day, index) => {
      const dayActivities = getActivitiesForDay(day);
      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isCurrentDay = isToday(day);

      days.push(
        <Box
          key={`day-${index}`}
          className={`${styles.calendarDay} ${!isCurrentMonth ? styles.otherMonth : ''} ${isCurrentDay ? styles.today : ''}`}
          onClick={() => {
            if (dayActivities.length > 0) {
              onActivityClick(dayActivities[0]);
            }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: !isCurrentMonth ? 'text.disabled' : isCurrentDay ? 'primary.main' : 'text.primary',
              fontWeight: isCurrentDay ? 'bold' : 'normal',
            }}
          >
            {format(day, 'd')}
          </Typography>

          {dayActivities.length > 0 && (
            <Box className={styles.activityIndicator}>
              <Typography variant="caption" noWrap>
                {dayActivities[0].title}
              </Typography>
              {dayActivities.length > 1 && (
                <Typography variant="caption" color="text.secondary">
                  +{dayActivities.length - 1}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      );
    });

    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
        {days}
      </Box>
    );
  };

  return (
    <Card className={styles.activityCalendar}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">活动日历</Typography>
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            size="small"
            onClick={onCreateActivity}
          >
            创建活动
          </Button>
        </Box>

        {renderCalendarHeader()}
        {renderWeekDays()}
        {renderCalendarDays()}
      </CardContent>
    </Card>
  );
};

export default ActivityCalendar; 