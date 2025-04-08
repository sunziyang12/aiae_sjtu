import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = '暂无符合条件的信息',
  subMessage = '请尝试调整筛选条件或搜索关键词'
}) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        color: 'text.secondary'
      }}
    >
      <SearchOffIcon sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <Typography variant="body2">
        {subMessage}
      </Typography>
    </Box>
  );
}; 