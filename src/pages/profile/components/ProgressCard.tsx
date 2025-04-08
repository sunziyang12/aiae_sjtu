import React from 'react';
import { Card, CardContent, Box, Typography, IconButton } from '@mui/material';
import { MoreHoriz as MoreIcon } from '@mui/icons-material';
import styles from '../styles/ProfilePage.module.css';

interface ProgressCardProps {
  title: string;
  progress: number;
  description: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  progress,
  description,
}) => {
  return (
    <Card className={styles.progressCard}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton size="small">
            <MoreIcon />
          </IconButton>
        </Box>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 1 }}>
          {progress}%
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgressCard; 