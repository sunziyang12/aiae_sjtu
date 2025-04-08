import React from 'react';
import { Box, Paper, Typography, Stack, Divider } from '@mui/material';
import { InfoItem } from '../../types';

interface ActivityDetailProps {
  info: InfoItem;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({ info }) => {
  return (
    <Box sx={{ p: 2 }}>
      {/* 活动介绍 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(45deg, #f5f7fa 0%, #e4e8f0 100%)',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom>
          活动介绍
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {info.description}
        </Typography>
      </Paper>

      {/* 日程安排 */}
      {info.schedule && info.schedule.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(45deg, #f5f7fa 0%, #e4e8f0 100%)',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            日程安排
          </Typography>
          <Stack spacing={2}>
            {info.schedule.map((item, index) => (
              <Box key={index}>
                <Typography variant="subtitle1" color="primary">
                  {item.time}
                </Typography>
                <Typography variant="body1">
                  {item.title}
                </Typography>
                {index < info.schedule!.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
          </Stack>
        </Paper>
      )}

      {/* 报名信息 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: 'linear-gradient(45deg, #f5f7fa 0%, #e4e8f0 100%)',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom>
          报名信息
        </Typography>
        <Typography variant="body1" color="text.secondary">
          报名截止时间：{info.registrationDeadline}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          活动地点：{info.location}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          活动规模：{info.capacity}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ActivityDetail; 