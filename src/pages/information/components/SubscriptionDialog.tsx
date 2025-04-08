import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
  Typography,
  Alert,
  IconButton,
  Box,
} from '@mui/material';
import {
  Close as CloseIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

export interface SubscriptionSettings {
  categories: string[];
  notificationTypes: string[];
  frequency: string;
  email?: string;
}

interface SubscriptionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubscribe: (settings: SubscriptionSettings) => void;
}

const categories = [
  { value: 'activity', label: '活动' },
  { value: 'lecture', label: '讲座' },
  { value: 'course', label: '课程' },
  { value: 'competition', label: '竞赛' },
];

const notificationTypes = [
  { value: 'web', label: '网站通知' },
  { value: 'email', label: '邮件通知' },
];

const frequencies = [
  { value: 'instant', label: '实时通知' },
  { value: 'daily', label: '每日摘要' },
  { value: 'weekly', label: '每周摘要' },
];

const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({
  open,
  onClose,
  onSubscribe,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedNotificationTypes, setSelectedNotificationTypes] = useState<string[]>(['web']);
  const [selectedFrequency, setSelectedFrequency] = useState('instant');
  const [email, setEmail] = useState('');
  const [showEmailField, setShowEmailField] = useState(false);

  const handleCategoryToggle = (value: string) => {
    setSelectedCategories(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleNotificationTypeToggle = (value: string) => {
    setSelectedNotificationTypes(prev => {
      if (value === 'email') {
        setShowEmailField(!prev.includes('email'));
      }
      return prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];
    });
  };

  const handleFrequencyChange = (value: string) => {
    setSelectedFrequency(value);
  };

  const handleSubmit = () => {
    const settings: SubscriptionSettings = {
      categories: selectedCategories,
      notificationTypes: selectedNotificationTypes,
      frequency: selectedFrequency,
      ...(showEmailField && email && { email }),
    };
    onSubscribe(settings);
  };

  const isValid = selectedCategories.length > 0 &&
    selectedNotificationTypes.length > 0 &&
    (!showEmailField || (showEmailField && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pb: 1,
        }}
      >
        <NotificationsIcon color="primary" />
        <Typography variant="h6" component="div" sx={{ flex: 1 }}>
          订阅设置
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* 订阅类别 */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              订阅类别
            </Typography>
            <FormGroup>
              <Stack direction="row" flexWrap="wrap" gap={2}>
                {categories.map(({ value, label }) => (
                  <FormControlLabel
                    key={value}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(value)}
                        onChange={() => handleCategoryToggle(value)}
                      />
                    }
                    label={label}
                  />
                ))}
              </Stack>
            </FormGroup>
          </Box>

          {/* 通知方式 */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              通知方式
            </Typography>
            <FormGroup>
              <Stack direction="row" flexWrap="wrap" gap={2}>
                {notificationTypes.map(({ value, label }) => (
                  <FormControlLabel
                    key={value}
                    control={
                      <Checkbox
                        checked={selectedNotificationTypes.includes(value)}
                        onChange={() => handleNotificationTypeToggle(value)}
                      />
                    }
                    label={label}
                  />
                ))}
              </Stack>
            </FormGroup>
          </Box>

          {/* 通知频率 */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              通知频率
            </Typography>
            <FormGroup>
              <Stack direction="row" flexWrap="wrap" gap={2}>
                {frequencies.map(({ value, label }) => (
                  <FormControlLabel
                    key={value}
                    control={
                      <Checkbox
                        checked={selectedFrequency === value}
                        onChange={() => handleFrequencyChange(value)}
                      />
                    }
                    label={label}
                  />
                ))}
              </Stack>
            </FormGroup>
          </Box>

          {/* 邮箱输入框 */}
          {showEmailField && (
            <TextField
              fullWidth
              label="邮箱地址"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
              helperText={email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '请输入有效的邮箱地址' : ''}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          )}
          {/* 提示信息 */}    
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            你可以随时在个人中心修改订阅设置
          </Alert>
        </Stack>
      </DialogContent>
      {/* 对话框底部按钮 */}
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>
          取消
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          确认订阅
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionDialog; // This is the default export