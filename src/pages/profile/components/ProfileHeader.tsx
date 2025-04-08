import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
  Home as HomeIcon,
  Print as PrintIcon,
  Notifications as NotificationsIcon,
  MoreHoriz as MoreIcon,
} from '@mui/icons-material';
import styles from '../styles/ProfilePage.module.css';

interface ProfileHeaderProps {
  userName: string;
  onNotificationsClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  onNotificationsClick,
  onMenuClick,
}) => {
  return (
    <Box className={styles.header}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          sx={{
            backgroundColor: '#4285f4',
            color: 'white',
            '&:hover': { backgroundColor: '#3367d6' },
          }}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: '#5f6368' }}>
          欢迎, {userName}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box className={styles.searchBox}>🔍 搜索</Box>
        <IconButton>
          <PrintIcon />
        </IconButton>
        <IconButton onClick={onNotificationsClick}>
          <NotificationsIcon />
        </IconButton>
        <IconButton onClick={onMenuClick}>
          <MoreIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProfileHeader; 