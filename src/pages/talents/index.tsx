import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import TalentFilters from './components/TalentFilters';
import TalentCard from './components/TalentCard';
import { Talent, SkillTag, TalentStatus } from './types/talent';
import styles from './styles/TalentsPage.module.css';
import { collectionService } from './services/collectionService';

// 人才类型选项
const talentTypes = [
  { value: 'all', label: '全部' },
  { value: 'tech', label: '技术人才' },
  { value: 'product', label: '产品人才' },
  { value: 'design', label: 'UI/UX设计' },
  { value: 'operation', label: '运营人才' },
  { value: 'marketing', label: '市场营销' },
];

// 技能领域选项
const skillAreas = [
  { value: 'all', label: '全部' },
  { value: 'ai', label: '人工智能' },
  { value: 'frontend', label: '前端开发' },
  { value: 'backend', label: '后端开发' },
  { value: 'mobile', label: '移动开发' },
  { value: 'data', label: '数据分析' },
];

const talents: Talent[] = [
  {
    id: 1,
    name: '张同学',
    avatar: '/avatar1.jpg',
    title: '爱好创业的学生',
    skills: ['React', 'TypeScript', 'Node.js'],
    status: '找项目中',
    education: '上海交通大学 计算机科学与技术',
    location: '北京',
    description: '前端开发经验，专注于大规模Web应用开发，熟悉现代前端技术栈。',
    achievements: [
      '负责过多个大型企业级应用的架构设计和开发',
      '开源项目贡献者，GitHub超过1000 stars',
      '前端技术社区活跃分享者'
    ],
    contact: {
      email: 'engineer1@example.com',
      phone: '13800138000'
    },
    isCollected: false
  },
  {
    id: 2,
    name: '李同学',
    avatar: '/avatar2.jpg',
    title: '爱好创业的学生',
    skills: ['UI设计', 'Figma', 'Design System'],
    status: '可加入新团队',
    education: '上海交通大学 视觉传达',
    location: '上海',
    description: '专注于企业级产品设计，擅长设计系统搭建，注重用户体验。',
    achievements: [
      '主导过多个大型产品的设计系统建设',
      '获得红点设计奖',
      'UI设计专栏作者'
    ],
    contact: {
      email: 'designer1@example.com',
      phone: '13900139000'
    },
    isCollected: false
  }
];

const TalentsPage: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<SkillTag[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<TalentStatus | ''>('');
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [rightPanel, setRightPanel] = useState<'contact' | 'discussion' | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as const });

  const handleSkillChange = useCallback((skill: SkillTag) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  }, []);

  const handleStatusChange = useCallback((status: TalentStatus | '') => {
    setSelectedStatus(status);
  }, []);

  const handleCollect = useCallback((talentId: number) => {
    const talent = talents.find(t => t.id === talentId);
    if (talent) {
      if (collectionService.isCollected(talentId)) {
        collectionService.removeCollection(talentId);
        setSnackbar({
          open: true,
          message: '已取消收藏',
          severity: 'success'
        });
      } else {
        collectionService.addCollection(talent);
        setSnackbar({
          open: true,
          message: '收藏成功',
          severity: 'success'
        });
      }
    }
  }, [talents]);

  const handleTalentClick = useCallback((talent: Talent) => {
    setSelectedTalent(talent);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setSelectedTalent(null);
    setRightPanel(null);
  }, []);

  const handleContactClick = useCallback(() => {
    setRightPanel('contact');
  }, []);

  const handleDiscussionClick = useCallback(() => {
    setRightPanel('discussion');
  }, []);

  const handleClosePanel = useCallback(() => {
    setRightPanel(null);
  }, []);

  const filteredTalents = talents.filter((talent) => {
    if (selectedSkills.length > 0 && !talent.skills.some(skill => selectedSkills.includes(skill as SkillTag))) {
      return false;
    }
    if (selectedStatus && talent.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  return (
    <Box className={styles.pageContainer}>
      <Container maxWidth="lg" className={styles.container}>
        <TalentFilters
          selectedSkills={selectedSkills}
          selectedStatus={selectedStatus}
          onSkillChange={handleSkillChange}
          onStatusChange={handleStatusChange}
        />

        <Grid container spacing={3}>
          {filteredTalents.map((talent) => (
            <Grid item xs={12} md={6} lg={4} key={talent.id}>
              <TalentCard
                talent={talent}
                onClick={handleTalentClick}
                onCollect={handleCollect}
              />
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={!!selectedTalent}
          onClose={handleCloseDialog}
          maxWidth={rightPanel ? 'lg' : 'md'}
          fullWidth
          className={styles.dialog}
        >
          {selectedTalent && (
            <Box className={styles.dialogContainer}>
              <Box className={styles.mainContent}>
                <DialogContent>
                  <Box className={styles.talentHeader}>
                    <Avatar
                      src={selectedTalent.avatar}
                      className={styles.dialogAvatar}
                    />
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        {selectedTalent.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {selectedTalent.title}
                      </Typography>
                    </Box>
                  </Box>

                  <Stack direction="row" spacing={2} className={styles.actionButtons}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="primary"
                      onClick={handleContactClick}
                    >
                      一键联系
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="primary"
                      onClick={handleDiscussionClick}
                    >
                      公开讨论
                    </Button>
                  </Stack>

                  <Grid container spacing={3}>
                    {/* 基本信息 */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        基本信息
                      </Typography>
                      <Stack spacing={1} sx={{ color: 'text.secondary', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <WorkIcon fontSize="small" />
                          <Typography variant="body2">
                            当前状态：{selectedTalent.status}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SchoolIcon fontSize="small" />
                          <Typography variant="body2">{selectedTalent.education}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationIcon fontSize="small" />
                          <Typography variant="body2">{selectedTalent.location}</Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    {/* 技能标签 */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        技能标签
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                        {selectedTalent.skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            sx={{
                              bgcolor: '#f0f7ff',
                              color: '#1a237e',
                            }}
                          />
                        ))}
                      </Stack>
                    </Grid>

                    {/* 个人简介 */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        个人简介
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {selectedTalent.description}
                      </Typography>
                    </Grid>

                    {/* 主要成就 */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        主要成就
                      </Typography>
                      <List>
                        {selectedTalent.achievements.map((achievement, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={achievement}
                              sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem' } }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Box>

              {rightPanel && (
                <Box className={styles.rightPanel}>
                  {rightPanel === 'contact' ? (
                    <Box className={styles.contactPanel}>
                      <Box className={styles.panelHeader}>
                        <Typography variant="h6">联系人才</Typography>
                        <IconButton onClick={handleClosePanel} size="small">
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Stack spacing={3} className={styles.contactForm}>
                        <TextField
                          required
                          label="姓名"
                          fullWidth
                          size="small"
                        />
                        <TextField
                          required
                          label="联系电话"
                          fullWidth
                          size="small"
                        />
                        <TextField
                          required
                          label="电子邮箱"
                          fullWidth
                          size="small"
                          type="email"
                        />
                        <TextField
                          required
                          label="留言内容"
                          fullWidth
                          multiline
                          rows={4}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          发送
                        </Button>
                      </Stack>
                    </Box>
                  ) : (
                    <Box className={styles.discussionPanel}>
                      <Box className={styles.panelHeader}>
                        <Typography variant="h6">公开讨论</Typography>
                        <IconButton onClick={handleClosePanel} size="small">
                          <CloseIcon />
                        </IconButton>
                      </Box>

                      <Box className={styles.messageList}>
                        {/* 讨论内容将在这里显示 */}
                      </Box>

                      <Box className={styles.messageInput}>
                        <Stack direction="row" spacing={1}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="发表评论..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                          />
                          <Button variant="contained">发送</Button>
                        </Stack>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Dialog>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TalentsPage; 