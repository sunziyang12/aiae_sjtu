import React from 'react';
import { Card, CardContent, Typography, Box, Button, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Habit {
  id: number;
  name: string;
  trainer: string;
  completed: number;
  total: number;
  avatar?: string;
}

const HabitsCard: React.FC = () => {
  const habits: Habit[] = [
    {
      id: 1,
      name: '拉伸训练',
      trainer: 'Alice McCain',
      completed: 9,
      total: 12,
    },
    {
      id: 2,
      name: '瑜伽训练',
      trainer: 'Jennifer Lubin',
      completed: 6,
      total: 10,
    },
    {
      id: 3,
      name: '按摩放松',
      trainer: 'Johnson Cooper',
      completed: 4,
      total: 8,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">我的习惯</Typography>
          <Button startIcon={<AddIcon />} color="primary">
            添加新习惯
          </Button>
        </Box>
        {habits.map((habit) => (
          <Box
            key={habit.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              p: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Avatar src={habit.avatar} sx={{ mr: 2 }}>
              {habit.trainer[0]}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                教练: {habit.trainer}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                完成进度: {habit.completed}/{habit.total}
              </Typography>
              <Box
                sx={{
                  width: 100,
                  height: 4,
                  bgcolor: 'grey.200',
                  borderRadius: 2,
                  mt: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: `${(habit.completed / habit.total) * 100}%`,
                    height: '100%',
                    bgcolor: 'primary.main',
                    borderRadius: 2,
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default HabitsCard; 