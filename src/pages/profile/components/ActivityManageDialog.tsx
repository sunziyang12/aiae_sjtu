import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Stack,
  FormControlLabel,
  Switch,
} from '@mui/material'; // 组件
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material'; // 图标
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';// 日期适配器
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers'; // 日期选择器
import { format, parse } from 'date-fns'; // 日期处理函数
import { zhCN } from 'date-fns/locale'; // 正确的导入方式
import styles from '../styles/ProfilePage.module.css';



// 活动接口
export interface Activity {
  id: number;
  title: string;
  time: string;
  date: string; // 日期
  platform: string;
  platformIcon: string;
  description?: string;
  reminder?: boolean;
  reminderTime?: number; // 提前提醒的分钟数
}

// 平台选项
const platformOptions = [
  { value: '线上会议', icon: '📹' },
  { value: '线下会议', icon: '🤝' },
  { value: '线上活动', icon: '🌐' },
  { value: '线下活动', icon: '🔬' },
  { value: '研讨会', icon: '📚' },
  { value: '路演', icon: '🎤' },
];

// 提醒时间选项（分钟）
const reminderOptions = [
  { value: 5, label: '5分钟前' },
  { value: 15, label: '15分钟前' },
  { value: 30, label: '30分钟前' },
  { value: 60, label: '1小时前' },
  { value: 1440, label: '1天前' },
];

// 活动管理对话框的props
interface ActivityManageDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  onDelete?: (id: number) => void;
  activity?: Activity | null;
  mode: 'create' | 'edit';
}

// 活动管理对话框组件
const ActivityManageDialog: React.FC<ActivityManageDialogProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  activity,
  mode,
}) => {
  // 表单状态
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());
  const [platform, setPlatform] = useState('');
  const [description, setDescription] = useState('');
  const [reminder, setReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState(30);

  // 初始化表单数据
  useEffect(() => {
    if (activity && mode === 'edit') {
      setTitle(activity.title);
      setDate(parse(activity.date, 'yyyy-MM-dd', new Date()));
      setTime(parse(activity.time, 'HH:mm', new Date()));
      setPlatform(activity.platform);
      setDescription(activity.description || '');
      setReminder(activity.reminder || false);
      setReminderTime(activity.reminderTime || 30);
    } else {
      // 重置表单
      setTitle('');
      setDate(new Date());
      setTime(new Date());
      setPlatform('');
      setDescription('');
      setReminder(false);
      setReminderTime(30);
    }
  }, [activity, mode]);

  // 处理保存
  const handleSave = () => {
    if (!title || !date || !time || !platform) {
      return;
    }

    const formattedDate = format(date, 'yyyy-MM-dd');
    const formattedTime = format(time, 'HH:mm');
    const platformOption = platformOptions.find(option => option.value === platform);

    // 创建新的活动对象
    const newActivity: Activity = {
      id: activity?.id || Date.now(),
      title,
      date: formattedDate,
      time: formattedTime,
      platform,
      platformIcon: platformOption?.icon || '📅',
      description,
      reminder,
      reminderTime: reminder ? reminderTime : undefined,
    };
    // 调用父组件的保存方法
    onSave(newActivity);
    // 关闭对话框
    onClose();
  };

  // 处理删除
  const handleDelete = () => {
    if (activity && onDelete) {
      onDelete(activity.id);
      onClose();
    }
  };
  // 渲染活动管理对话框
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{mode === 'create' ? '创建活动' : '编辑活动'}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      {/* 对话框内容 */}
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="活动标题"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* 日期和时间选择器 */}
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhCN}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="日期"
                value={date}
                onChange={(newDate) => setDate(newDate)}
                sx={{ flex: 1 }}
              />
              <TimePicker
                label="时间"
                value={time}
                onChange={(newTime) => setTime(newTime)}
                sx={{ flex: 1 }}
              />
            </Box>
          </LocalizationProvider>

          {/* 平台选择器 */}
          <FormControl fullWidth>
            <InputLabel>平台</InputLabel>
            <Select
              value={platform}
              label="平台"
              onChange={(e) => setPlatform(e.target.value)}
              required
            >
              {/* 平台选项 */}
              {platformOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{option.icon}</span>
                    <span>{option.value}</span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 活动描述 */}
          <TextField
            label="活动描述"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* 提醒设置 */}
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={reminder}
                  onChange={(e) => setReminder(e.target.checked)}
                />
              }
              label="设置提醒"
            />
            {/* 提醒时间选择器 */}
            {reminder && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>提醒时间</InputLabel>
                <Select
                  value={reminderTime}
                  label="提醒时间"
                  onChange={(e) => setReminderTime(Number(e.target.value))}
                >
                  {reminderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        </Stack>
      </DialogContent>
      {/* 对话框底部按钮 */}
      <DialogActions>
        {mode === 'edit' && onDelete && (
          <Button
            startIcon={<DeleteIcon />}
            color="error"
            onClick={handleDelete}
          >
            删除
          </Button>
        )}
        {/* 取消按钮 */}
        <Button onClick={onClose}>取消</Button>
        {/* 保存按钮 */}
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!title || !date || !time || !platform}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityManageDialog; 