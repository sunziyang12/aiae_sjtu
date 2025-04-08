import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface WorkoutData {
  activityTime: number;
  caloriesBurned: number;
  caloriesIntake: number;
}

const WorkoutCard: React.FC<{ data: WorkoutData }> = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          今日运动数据
        </Typography>
        <Box sx={{ position: 'relative', height: 200 }}>
          {/* Activity Time Circle */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4">{data.activityTime}</Typography>
            <Typography variant="body2" color="text.secondary">
              小时
            </Typography>
          </Box>
          {/* Calories Circles */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: '30%',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">{data.caloriesBurned}</Typography>
            <Typography variant="body2" color="error.main">
              消耗热量
            </Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              right: '30%',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">{data.caloriesIntake}</Typography>
            <Typography variant="body2" color="warning.main">
              摄入热量
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard; 