import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Stack,
  LinearProgress,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,

  Badge,
} from '@mui/material';
import {

  ArrowForward as ArrowForwardIcon,
  MoreHoriz as MoreIcon,
  Home as HomeIcon,
  Print as PrintIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Science as ScienceIcon,
  Business as BusinessIcon,
  Edit as EditIcon,
  Add as AddIcon,

  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

// 导入组件
import ProfileHeader from './components/ProfileHeader'; // 个人中心头部组件
import ProfileCard, { ProfileInfo } from './components/ProfileCard'; // 个人中心卡片组件
import ProgressCard from './components/ProgressCard'; // 项目进度卡片组件
import PlatformCard from './components/PlatformCard'; // 已接入平台卡片组件
import ActivityCard, { Activity } from './components/ActivityCard'; // 近期活动卡片组件
import TagsCard, { TagLevel, Tag, TagSection } from './components/TagsCard'; // 我的标签卡片组件
import ResourceCard from './components/ResourceCard'; // 资源仪表盘卡片组件
import EditProfileDialog from './components/EditProfileDialog';
import ActivityDetailsDialog from './components/ActivityDetailsDialog';
import SettingsCard from './components/SettingsCard';
import styles from './styles/ProfilePage.module.css';
import ActivityManageDialog from './components/ActivityManageDialog';
import ActivityCalendar from './components/ActivityCalendar';
import ActivityReminderService from './components/ActivityReminderService';
import ResourceInfoCard from './components/ResourceInfoCard';

/**
 * 个人中心页面组件
 * 整合所有个人中心相关的卡片组件
 * 
 * @component
 * @returns {JSX.Element} 返回个人中心页面组件
 */
const ProfilePage: React.FC = () => {
  // 状态管理
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [activityDetailsOpen, setActivityDetailsOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<ProfileInfo>({
    name: '张明',
    role: '创新创业者',
    avatar: '/avatar.jpg',
    email: 'zhangming@example.com',
    phone: '13800138000',
    school: '清华大学',
    major: '计算机科学与技术',
    grade: '大三',
    stats: {
      projects: 11,
      connections: 56,
      followers: 32,
    },
    progress: {
      projectProgress: 83,
      fundingProgress: 56,
    },
    platforms: [
      { id: 1, icon: '🔬', name: '实验室管理' },
      { id: 2, icon: '💡', name: '创新空间' },
      { id: 3, icon: '🤝', name: '投资对接' },
    ],
    activities: [
      {
        id: 1,
        title: '项目评审会议',
        time: '09:30',
        date: '2024-03-15',
        platform: '线上会议',
        platformIcon: '📹',
      },
      {
        id: 2,
        title: '投资人对接会',
        time: '14:00',
        date: '2024-03-16',
        platform: '线下会议',
        platformIcon: '🤝',
      },
      {
        id: 3,
        title: '创新技术研讨会',
        time: '10:00',
        date: '2024-03-18',
        platform: '线上会议',
        platformIcon: '📹',
      },
      {
        id: 4,
        title: '实验室参观交流',
        time: '15:30',
        date: '2024-03-20',
        platform: '线下活动',
        platformIcon: '🔬',
      },
    ],
    skills: [
      { name: '技术创新', progress: 85 },
      { name: '项目管理', progress: 72 },
      { name: '团队协作', progress: 78 },
      { name: '资源整合', progress: 68 },
      { name: '商业分析', progress: 65 },
    ],
  });

  // 添加资源数据
  const resourceData = {
    projects: {
      total: 15,
      active: 8,
      completed: 5,
      pending: 2,
      trend: '+12%',
      recentProjects: [
        { name: '智能制造系统', status: 'active' },
        { name: '新材料研发', status: 'active' },
        { name: '生物技术创新', status: 'pending' },
      ]
    },
    talents: {
      total: 48,
      researchers: 20,
      engineers: 18,
      managers: 10,
      trend: '+25%',
      topTalents: [
        { name: '张工程师', field: '人工智能' },
        { name: '李研究员', field: '材料科学' },
        { name: '王经理', field: '项目管理' },
      ]
    },
    investors: {
      total: 32,
      institutional: 15,
      individual: 17,
      totalInvestment: '2.5亿',
      trend: '+18%',
      activeInvestors: [
        { name: '创新基金', type: '机构' },
        { name: '科技创投', type: '机构' },
        { name: '天使投资人', type: '个人' },
      ]
    },
    labs: {
      total: 12,
      inUse: 8,
      available: 4,
      utilization: '75%',
      trend: '+8%',
      equipment: 45,
      activeProjects: [
        { name: '生物实验室', usage: '85%' },
        { name: '材料实验室', usage: '70%' },
        { name: 'AI计算中心', usage: '90%' },
      ]
    }
  };

  // 添加标签数据
  const tagData: TagSection[] = [
    {
      title: '技术栈',
      tags: [
        { name: 'React', level: 'expert' as TagLevel },
        { name: 'TypeScript', level: 'advanced' as TagLevel },
        { name: 'Node.js', level: 'intermediate' as TagLevel },
      ],
    },
    {
      title: '设计',
      tags: [
        { name: 'UI/UX', level: 'advanced' as TagLevel },
        { name: 'Figma', level: 'expert' as TagLevel },
      ],
    },
    {
      title: '项目管理',
      tags: [
        { name: 'Agile', level: 'advanced' as TagLevel },
        { name: 'Scrum', level: 'intermediate' as TagLevel },
      ],
    },
    {
      title: '其他技能',
      tags: [
        { name: '英语', level: 'expert' as TagLevel },
        { name: '团队协作', level: 'advanced' as TagLevel },
      ],
    },
  ];

  // 设置状态
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public' as const,
    activityVisibility: 'connections' as const,
  });

  const [themeSettings, setThemeSettings] = useState({
    mode: 'light' as const,
    primaryColor: '#1976d2',
  });

  // 活动管理状态
  const [activityManageOpen, setActivityManageOpen] = useState(false);
  const [activityManageMode, setActivityManageMode] = useState<'create' | 'edit'>('create');
  const [selectedActivityForEdit, setSelectedActivityForEdit] = useState<Activity | null>(null);
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      title: '项目评审会议',
      time: '09:30',
      date: '2024-03-15',
      platform: '线上会议',
      platformIcon: '📹',
      description: '讨论项目进展和下一步计划',
      reminder: true,
      reminderTime: 30,
    },
    {
      id: 2,
      title: '投资人对接会',
      time: '14:00',
      date: '2024-03-16',
      platform: '线下会议',
      platformIcon: '🤝',
      description: '与潜在投资人讨论项目融资',
      reminder: true,
      reminderTime: 60,
    },
    {
      id: 3,
      title: '创新技术研讨会',
      time: '10:00',
      date: '2024-03-18',
      platform: '线上会议',
      platformIcon: '📹',
      description: '分享最新技术趋势和创新方法',
      reminder: false,
    },
    {
      id: 4,
      title: '实验室参观交流',
      time: '15:30',
      date: '2024-03-20',
      platform: '线下活动',
      platformIcon: '🔬',
      description: '参观合作实验室，了解最新设备',
      reminder: true,
      reminderTime: 15,
    },
  ]);

  // 活动视图状态
  const [activityView, setActivityView] = useState<'list' | 'calendar'>('list');

  // 设置处理函数
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePrivacyChange = (key: keyof typeof privacySettings, value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleThemeChange = (key: keyof typeof themeSettings, value: string) => {
    setThemeSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // 处理函数
  const handleEditProfile = () => {
    setEditProfileOpen(true);
  };
  // 保存个人资料
  const handleSaveProfile = (data: ProfileInfo) => {
    setUserData(data);
    setEditProfileOpen(false);
  };

  // 查看活动详情
  const handleViewActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setActivityDetailsOpen(true);
  };
  // 更多菜单
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // 关闭更多菜单
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // 查看通知
  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  // 关闭通知     
  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  // 模拟通知数据
  const notifications = [
    { id: 1, title: '新项目邀请', content: '您收到了一个新的项目合作邀请', time: '10分钟前', read: false },
    { id: 2, title: '活动提醒', content: '明天上午9:30有项目评审会议', time: '1小时前', read: false },
    { id: 3, title: '系统通知', content: '您的个人资料已更新成功', time: '昨天', read: true },
  ];

  const handleCloseActivityDetails = () => {
    setActivityDetailsOpen(false);
    setSelectedActivity(null);
  };

  // 处理创建活动
  const handleCreateActivity = () => {
    setActivityManageMode('create');
    setSelectedActivityForEdit(null);
    setActivityManageOpen(true);
  };

  // 处理编辑活动
  const handleEditActivity = (activity: Activity) => {
    setActivityManageMode('edit');
    setSelectedActivityForEdit(activity);
    setActivityManageOpen(true);
  };

  // 处理删除活动
  const handleDeleteActivity = (id: number) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  // 处理保存活动
  const handleSaveActivity = (activity: Activity) => {
    if (activityManageMode === 'create') {
      // 创建新活动
      setActivities(prev => [...prev, activity]);
    } else {
      // 更新现有活动
      setActivities(prev =>
        prev.map(item => item.id === activity.id ? activity : item)
      );
    }
  };

  // 处理活动视图切换
  const handleActivityViewChange = (view: 'list' | 'calendar') => {
    setActivityView(view);
  };

  return (
    <Box sx={{ py: 4, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <ProfileHeader
          userName={userData.name}
          onNotificationsClick={handleNotificationsOpen}
          onMenuClick={handleMenuOpen}
        />
        {/* 网格布局 */}
        <Grid container spacing={3}>
          {/* 左侧个人资料卡片 */}
          <Grid item xs={12} md={4}>
            <ProfileCard
              userData={userData}
              onEditClick={handleEditProfile}
            />
          </Grid>

          {/* 中间进度卡片 */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* 项目进度 */}
              <Grid item xs={12} sm={6}>
                <ProgressCard
                  title="项目进度"
                  progress={userData.progress.projectProgress}
                  description="当前项目完成度"
                />
              </Grid>

              {/* 融资进度 */}
              <Grid item xs={12} sm={6}>
                <ProgressCard
                  title="融资进度"
                  progress={userData.progress.fundingProgress}
                  description="目标融资完成度"
                />
              </Grid>

              {/* 已接入平台 */}
              <Grid item xs={12}>
                <PlatformCard platforms={userData.platforms} />
              </Grid>
            </Grid>
          </Grid>

          {/* 近期活动 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">近期活动</Typography>
              <Box>
                <Button
                  size="small"
                  onClick={() => handleActivityViewChange('list')}
                  variant={activityView === 'list' ? 'contained' : 'text'}
                  sx={{ mr: 1 }}
                >
                  列表
                </Button>
                <Button
                  size="small"
                  onClick={() => handleActivityViewChange('calendar')}
                  variant={activityView === 'calendar' ? 'contained' : 'text'}
                >
                  日历
                </Button>
              </Box>
            </Box>

            {activityView === 'list' ? (
              <ActivityCard
                title=""
                activities={activities}
                onMoreClick={handleCreateActivity}
                onActivityClick={(activity) => {
                  setSelectedActivity(activity);
                  setActivityDetailsOpen(true);
                }}
              />
            ) : (
              <ActivityCalendar
                activities={activities}
                onActivityClick={(activity) => {
                  setSelectedActivity(activity);
                  setActivityDetailsOpen(true);
                }}
                onCreateActivity={handleCreateActivity}
              />
            )}
          </Grid>

          {/* 我的标签 */}
          <Grid item xs={12} md={8}>
            <TagsCard
              title="我的标签"
              sections={tagData}
              onMoreClick={() => { }}
            />
          </Grid>

          {/* 设置卡片 */}
          <Grid item xs={12} md={4}>
            <SettingsCard
              notifications={notificationSettings}
              privacy={privacySettings}
              theme={themeSettings}
              onNotificationChange={handleNotificationChange}
              onPrivacyChange={handlePrivacyChange}
              onThemeChange={handleThemeChange}
            />
          </Grid>

          {/* 资源信息卡片 */}
          <Grid item xs={12} md={8}>
            <ResourceInfoCard resources={resourceData} />
          </Grid>
        </Grid>
      </Container>

      {/* 编辑个人资料对话框 */}
      <EditProfileDialog
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />

      {/* 活动详情对话框 */}
      <ActivityDetailsDialog
        open={activityDetailsOpen}
        onClose={handleCloseActivityDetails}
        activity={selectedActivity}
      />

      {/* 活动管理对话框 */}
      <ActivityManageDialog
        open={activityManageOpen}
        onClose={() => setActivityManageOpen(false)}
        onSave={handleSaveActivity}
        onDelete={handleDeleteActivity}
        activity={selectedActivityForEdit}
        mode={activityManageMode}
      />

      {/* 活动提醒服务 */}
      <ActivityReminderService activities={activities} />

      {/* 通知菜单 */}
      <Menu
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleNotificationsClose}
      >
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            sx={{
              bgcolor: notification.read ? 'inherit' : 'rgba(25, 118, 210, 0.08)',
              minWidth: 300,
            }}
          >
            <Box>
              <Typography variant="subtitle2">{notification.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {notification.content}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2" color="primary" sx={{ textAlign: 'center', width: '100%' }}>
            查看全部通知
          </Typography>
        </MenuItem>
      </Menu>

      {/* 更多菜单 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditProfile}>
          编辑资料
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          设置
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          退出登录
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfilePage;