import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Grid,
  Paper,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Visibility as VisibilityIcon,
  Palette as PaletteIcon,
  Email as EmailIcon,
  NotificationsActive as PushIcon,
  Sms as SmsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import styles from '../styles/SettingsCard.module.css';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'connections';
  activityVisibility: 'public' | 'private' | 'connections';
}

interface ThemeSettings {
  mode: 'light' | 'dark';
  primaryColor: string;
}

interface SettingsCardProps {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  theme: ThemeSettings;
  onNotificationChange: (key: keyof NotificationSettings) => void;
  onPrivacyChange: (key: keyof PrivacySettings, value: string) => void;
  onThemeChange: (key: keyof ThemeSettings, value: string) => void;
}

// 预定义的颜色选项
const colorOptions = [
  { name: '蓝色', value: '#1976d2' },
  { name: '绿色', value: '#2e7d32' },
  { name: '橙色', value: '#ed6c02' },
  { name: '紫色', value: '#9c27b0' },
  { name: '红色', value: '#d32f2f' },
  { name: '青色', value: '#0288d1' },
];

const SettingsCard: React.FC<SettingsCardProps> = ({
  notifications,
  privacy,
  theme,
  onNotificationChange,
  onPrivacyChange,
  onThemeChange,
}) => {
  return (
    <Card className={styles.settingsCard}>
      <CardContent sx={{ p: 0 }}>
        {/* 卡片标题 */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            设置
          </Typography>
          <Tooltip title="帮助">
            <IconButton size="small">
              <HelpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider />

        {/* 通知设置 */}
        <Box className={styles.settingsSection}>
          <Typography variant="subtitle1" className={styles.sectionTitle}>
            <NotificationsIcon fontSize="small" sx={{ mr: 1 }} />
            通知设置
          </Typography>
          <Box className={styles.settingItem}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography className={styles.settingLabel}>邮件通知</Typography>
            </Box>
            <Switch
              checked={notifications.email}
              onChange={() => onNotificationChange('email')}
              size="small"
            />
          </Box>
          <Box className={styles.settingItem}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PushIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography className={styles.settingLabel}>推送通知</Typography>
            </Box>
            <Switch
              checked={notifications.push}
              onChange={() => onNotificationChange('push')}
              size="small"
            />
          </Box>
          <Box className={styles.settingItem}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SmsIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography className={styles.settingLabel}>短信通知</Typography>
            </Box>
            <Switch
              checked={notifications.sms}
              onChange={() => onNotificationChange('sms')}
              size="small"
            />
          </Box>
        </Box>

        {/* 隐私设置 */}
        <Box className={styles.settingsSection}>
          <Typography variant="subtitle1" className={styles.sectionTitle}>
            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
            隐私设置
          </Typography>
          <FormControl fullWidth size="small" className={styles.themeModeSelect}>
            <InputLabel>个人资料可见性</InputLabel>
            <Select
              value={privacy.profileVisibility}
              label="个人资料可见性"
              onChange={(e) => onPrivacyChange('profileVisibility', e.target.value)}
            >
              <MenuItem value="public">公开</MenuItem>
              <MenuItem value="private">私密</MenuItem>
              <MenuItem value="connections">仅连接</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" className={styles.themeModeSelect}>
            <InputLabel>活动可见性</InputLabel>
            <Select
              value={privacy.activityVisibility}
              label="活动可见性"
              onChange={(e) => onPrivacyChange('activityVisibility', e.target.value)}
            >
              <MenuItem value="public">公开</MenuItem>
              <MenuItem value="private">私密</MenuItem>
              <MenuItem value="connections">仅连接</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* 主题设置 */}
        <Box className={styles.settingsSection}>
          <Typography variant="subtitle1" className={styles.sectionTitle}>
            <PaletteIcon fontSize="small" sx={{ mr: 1 }} />
            主题设置
          </Typography>
          <FormControl fullWidth size="small" className={styles.themeModeSelect}>
            <InputLabel>主题模式</InputLabel>
            <Select
              value={theme.mode}
              label="主题模式"
              onChange={(e) => onThemeChange('mode', e.target.value)}
            >
              <MenuItem value="light">浅色</MenuItem>
              <MenuItem value="dark">深色</MenuItem>
            </Select>
          </FormControl>
          <Box className={styles.colorPicker}>
            <Typography className={styles.settingLabel}>主题颜色</Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {colorOptions.map((color) => (
                <Grid item xs={4} key={color.value}>
                  <Paper
                    sx={{
                      height: 40,
                      backgroundColor: color.value,
                      cursor: 'pointer',
                      border: theme.primaryColor === color.value ? '2px solid #000' : 'none',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                    onClick={() => onThemeChange('primaryColor', color.value)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SettingsCard; 