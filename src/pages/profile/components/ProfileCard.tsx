import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
import { Person as PersonIcon, Edit as EditIcon } from '@mui/icons-material';
import styles from '../styles/ProfilePage.module.css';

/**
 * 个人信息接口
 */
export interface ProfileInfo {
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
  school: string;
  major: string;
  grade: string;
  stats: {
    projects: number;
    connections: number;
    followers: number;
  };
  progress: {
    projectProgress: number;
    fundingProgress: number;
  };
  platforms: Array<{
    id: number;
    icon: string;
    name: string;
  }>;
  activities: Array<{
    id: number;
    title: string;
    time: string;
    date: string;
    platform: string;
    platformIcon: string;
  }>;
  skills: Array<{
    name: string;
    progress: number;
  }>;
}

interface ProfileCardProps {
  userData: ProfileInfo;
  onEditClick: () => void;
}

/**
 * 个人信息卡片组件
 * 展示用户的基本信息和联系方式
 * 
 * @component
 * @param {Object} props - 组件属性
 * @param {ProfileInfo} props.profile - 用户个人信息
 * @returns {JSX.Element} 返回个人信息卡片组件
 */
const ProfileCard: React.FC<ProfileCardProps> = ({ userData, onEditClick }) => {
  return (
    <Card className={styles.profileCard}>
      <CardContent>
        <Box className={styles.avatarContainer}>
          <IconButton
            size="small"
            sx={{ position: 'absolute', right: 0, top: 0 }}
            onClick={onEditClick}
          >
            <EditIcon />
          </IconButton>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              src={userData.avatar}
              className={styles.avatar}
            />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.role}
            </Typography>
          </Box>
        </Box>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          className={styles.statsContainer}
        >
          <Box className={styles.statItem}>
            <Typography variant="h6" color="error">
              {userData.stats.projects}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              项目
            </Typography>
          </Box>
          <Box className={styles.statItem}>
            <Typography variant="h6" color="warning.main">
              {userData.stats.connections}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              人脉
            </Typography>
          </Box>
          <Box className={styles.statItem}>
            <Typography variant="h6" color="error">
              {userData.stats.followers}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              关注者
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProfileCard; 