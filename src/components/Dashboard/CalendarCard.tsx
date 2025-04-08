import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasWorkout: boolean;
}

const CalendarCard: React.FC = () => {
  const days: CalendarDay[] = Array.from({ length: 35 }, (_, i) => ({
    date: i + 1,
    isCurrentMonth: i < 30,
    isToday: i + 1 === 5,
    hasWorkout: [1, 5, 17, 23, 28].includes(i + 1),
  }));

  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          训练日历
        </Typography>
        <Grid container spacing={1}>
          {weekDays.map((day) => (
            <Grid item xs key={day}>
              <Typography
                align="center"
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          {days.map((day, index) => (
            <Grid item xs={1.7} key={index}>
              <Box
                sx={{
                  p: 1,
                  textAlign: 'center',
                  borderRadius: 1,
                  backgroundColor: day.isToday
                    ? 'primary.main'
                    : day.hasWorkout
                      ? 'primary.light'
                      : 'transparent',
                  color: day.isToday
                    ? 'primary.contrastText'
                    : day.isCurrentMonth
                      ? 'text.primary'
                      : 'text.disabled',
                }}
              >
                <Typography variant="body2">{day.date}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CalendarCard; 