import React from 'react';
import { Card, CardContent, Box, Typography, Chip, IconButton, Stack } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import styles from '../styles/ProfilePage.module.css';

interface Platform {
  id: number;
  icon: string;
  name: string;
}

interface PlatformCardProps {
  platforms: Platform[];
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platforms }) => {
  return (
    <Card className={styles.platformCard}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            已接入平台
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {platforms.length}个活跃平台
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          {platforms.map((platform) => (
            <Chip
              key={platform.id}
              label={platform.name}
              icon={<Box component="span">{platform.icon}</Box>}
              className={styles.platformChip}
            />
          ))}
          <IconButton>
            <AddIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PlatformCard; 