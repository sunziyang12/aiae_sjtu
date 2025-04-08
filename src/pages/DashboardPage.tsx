import React from 'react';
import { Grid } from '@mui/material';
import WorkoutCard from '../components/Dashboard/WorkoutCard';
import CalendarCard from '../components/Dashboard/CalendarCard';
import HabitsCard from '../components/Dashboard/HabitsCard';

const DashboardPage: React.FC = () => {
  const workoutData = {
    activityTime: 2.3,
    caloriesBurned: 850,
    caloriesIntake: 1875,
  };

  // 返回一个包含三个卡片组件的网格布局 
  return (
    // 使用 Grid 组件创建一个包含三个卡片组件的网格布局   
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <WorkoutCard data={workoutData} /> {/* 锻炼卡片组件 */}
      </Grid>
      <Grid item xs={12} md={6}>
        <CalendarCard /> {/* 日历卡片组件 */}
      </Grid>
      <Grid item xs={12}>
        <HabitsCard /> {/* 习惯卡片组件 */}
      </Grid>
    </Grid>
  );
};

export default DashboardPage; // 导出 DashboardPage 组件