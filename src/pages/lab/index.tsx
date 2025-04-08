import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  Paper,
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Divider
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import GroupIcon from '@mui/icons-material/Group';
import EquipmentIcon from '@mui/icons-material/Build';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';

// 实验室信息标签
const LAB_TYPES = [
  { id: 'all', name: '全部' },
  { id: 'robot', name: '机器人实验室' },
  { id: 'control', name: '控制系统实验室' },
  { id: 'ai', name: 'AI实验室' },
  { id: 'medical', name: '医学实验室' }
];

// 项目类型标签
const PROJECT_TYPES = [
  { id: 'all', name: '全部' },
  { id: 'robot', name: '机器人技术' },
  { id: 'control', name: '控制系统' },
  { id: 'ai', name: '人工智能' },
  { id: 'medical', name: '医学影像' },
  { id: 'deeplearning', name: '深度学习' },
  { id: 'medical-ai', name: '医疗AI' },
  { id: 'materials', name: '材料研发' }
];

// 实验室信息接口
interface LabInfo {
  id: string;
  name: string;
  type: string;
  description: string;
  director: {
    name: string;
    title: string;
    avatar: string;
  };
  members: {
    researchers: number;
    students: number;
    engineers: number;
  };
  equipment: Array<{
    name: string;
    status: 'available' | 'busy' | 'maintenance';
  }>;
  achievements: Array<{
    year: string;
    title: string;
    type: 'paper' | 'patent' | 'award';
  }>;
  openingHours: string;
  location: string;
  contact: string;
}

// 项目状态类型
type ProjectStatus = 'ongoing' | 'completed';

// 项目信息接口
interface ProjectInfo {
  id: string;
  title: string;
  description: string;
  labName: string;
  timeRange: {
    start: string;
    end: string;
  };
  progress: number;
  status: ProjectStatus;
  tags: string[];
  teamSize: number;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  leader: {
    name: string;
    title: string;
    avatar: string;
  };
  milestones: Array<{
    date: string;
    title: string;
    status: 'completed' | 'ongoing' | 'pending';
  }>;
  publications: Array<{
    title: string;
    journal: string;
    year: string;
    doi: string;
  }>;
  funding: {
    source: string;
    amount: string;
  };
}

const LabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLab, setSelectedLab] = useState<LabInfo | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);

  // 示例实验室数据
  const labs: LabInfo[] = [
    {
      id: '1',
      name: '智能系统与机器人实验室',
      type: 'robot',
      description: '致力于研发新一代智能机器人控制系统，实现高精度运动控制和环境感知',
      director: {
        name: '张教授',
        title: '研究员',
        avatar: '/avatars/director1.jpg'
      },
      members: {
        researchers: 5,
        students: 15,
        engineers: 3
      },
      equipment: [
        { name: '工业机器人臂', status: 'available' },
        { name: '运动捕捉系统', status: 'busy' },
        { name: '高性能计算集群', status: 'available' }
      ],
      achievements: [
        { year: '2024', title: '国家自然科学基金重点项目', type: 'award' },
        { year: '2023', title: '智能控制算法专利', type: 'patent' },
        { year: '2023', title: 'IEEE Robotics 论文发表', type: 'paper' }
      ],
      openingHours: '周一至周五 9:00-18:00',
      location: '科研楼A区3层',
      contact: 'robot@lab.com'
    },
    {
      id: '2',
      name: '医学影像AI实验室',
      type: 'medical-ai',
      description: '专注于医学影像的AI分析与诊断，开发智能辅助诊断系统',
      director: {
        name: '李教授',
        title: '特聘研究员',
        avatar: '/avatars/director2.jpg'
      },
      members: {
        researchers: 8,
        students: 20,
        engineers: 5
      },
      equipment: [
        { name: 'GPU服务器集群', status: 'available' },
        { name: 'MRI模拟系统', status: 'maintenance' },
        { name: '医学影像工作站', status: 'busy' },
        { name: '深度学习开发平台', status: 'available' }
      ],
      achievements: [
        { year: '2024', title: '医学影像AI诊断系统获国家科技进步奖', type: 'award' },
        { year: '2023', title: '基于深度学习的肺部CT分析专利', type: 'patent' },
        { year: '2023', title: 'Nature Medicine 论文发表', type: 'paper' }
      ],
      openingHours: '全天24小时',
      location: '医学院B区2层',
      contact: 'medical-ai@lab.com'
    },
    {
      id: '3',
      name: '智能控制系统实验室',
      type: 'control',
      description: '研究智能控制理论与应用，开发先进控制系统',
      director: {
        name: '王教授',
        title: '首席科学家',
        avatar: '/avatars/director3.jpg'
      },
      members: {
        researchers: 6,
        students: 12,
        engineers: 4
      },
      equipment: [
        { name: '控制系统测试平台', status: 'available' },
        { name: '工业自动化设备', status: 'busy' },
        { name: '实时控制器', status: 'available' }
      ],
      achievements: [
        { year: '2024', title: '智能控制系统获省级科技奖', type: 'award' },
        { year: '2023', title: '自适应控制算法专利', type: 'patent' },
        { year: '2023', title: 'IEEE Control Systems 论文发表', type: 'paper' }
      ],
      openingHours: '周一至周五 8:30-17:30',
      location: '工程楼C区4层',
      contact: 'control@lab.com'
    }
  ];

  // 示例项目数据
  const projects: ProjectInfo[] = [
    {
      id: '1',
      title: '智能机器人控制系统研发',
      description: '开发新一代智能机器人控制系统，实现高精度运动控制和环境感知',
      labName: '智能系统与机器人实验室',
      timeRange: {
        start: '2023-01',
        end: '2024-12'
      },
      progress: 75,
      status: 'ongoing',
      tags: ['机器人技术', '控制系统', '人工智能'],
      teamSize: 8,
      media: {
        type: 'image',
        url: '/projects/robot-control.jpg',
        thumbnail: '/projects/robot-control-thumb.jpg'
      },
      leader: {
        name: '李研究员',
        title: '副研究员',
        avatar: '/avatars/leader1.jpg'
      },
      milestones: [
        { date: '2023-Q1', title: '需求分析与系统设计', status: 'completed' },
        { date: '2023-Q2', title: '核心算法开发', status: 'completed' },
        { date: '2023-Q4', title: '系统集成测试', status: 'ongoing' },
        { date: '2024-Q2', title: '实验验证', status: 'pending' }
      ],
      publications: [
        {
          title: '基于深度学习的机器人控制系统研究',
          journal: 'IEEE Robotics and Automation',
          year: '2023',
          doi: '10.1109/xxx'
        }
      ],
      funding: {
        source: '国家自然科学基金',
        amount: '200万元'
      }
    },
    {
      id: '2',
      title: '医学影像AI辅助诊断系统',
      description: '利用深度学习技术开发医学影像智能分析系统，提高诊断准确率',
      labName: '医学影像AI实验室',
      timeRange: {
        start: '2023-03',
        end: '2025-02'
      },
      progress: 45,
      status: 'ongoing',
      tags: ['医疗AI', '深度学习', '医学影像'],
      teamSize: 12,
      media: {
        type: 'video',
        url: '/projects/medical-ai-demo.mp4',
        thumbnail: '/projects/medical-ai-thumb.jpg'
      },
      leader: {
        name: '陈研究员',
        title: '高级研究员',
        avatar: '/avatars/leader2.jpg'
      },
      milestones: [
        { date: '2023-Q2', title: '数据收集与预处理', status: 'completed' },
        { date: '2023-Q4', title: '模型开发与训练', status: 'ongoing' },
        { date: '2024-Q2', title: '临床验证', status: 'pending' },
        { date: '2024-Q4', title: '系统部署', status: 'pending' }
      ],
      publications: [
        {
          title: '基于深度学习的肺部CT图像分析',
          journal: 'Medical Image Analysis',
          year: '2023',
          doi: '10.1016/xxx'
        }
      ],
      funding: {
        source: '国家重点研发计划',
        amount: '500万元'
      }
    },
    {
      id: '3',
      title: '智能工厂控制系统',
      description: '开发面向智能制造的新一代工业控制系统，提升生产效率和产品质量',
      labName: '智能控制系统实验室',
      timeRange: {
        start: '2023-06',
        end: '2024-12'
      },
      progress: 60,
      status: 'ongoing',
      tags: ['控制系统', '工业自动化', '智能制造'],
      teamSize: 6,
      media: {
        type: 'image',
        url: '/projects/smart-factory.jpg',
        thumbnail: '/projects/smart-factory-thumb.jpg'
      },
      leader: {
        name: '张工程师',
        title: '技术总监',
        avatar: '/avatars/leader3.jpg'
      },
      milestones: [
        { date: '2023-Q3', title: '系统架构设计', status: 'completed' },
        { date: '2023-Q4', title: '控制算法开发', status: 'completed' },
        { date: '2024-Q1', title: '工业现场测试', status: 'ongoing' },
        { date: '2024-Q3', title: '系统优化升级', status: 'pending' }
      ],
      publications: [
        {
          title: '智能制造中的自适应控制研究',
          journal: 'IEEE Transactions on Industrial Electronics',
          year: '2023',
          doi: '10.1109/yyy'
        }
      ],
      funding: {
        source: '省重点研发专项',
        amount: '300万元'
      }
    }
  ];

  // 渲染实验室卡片（优化版）
  const renderLabCard = (lab: LabInfo) => (
    <Paper
      elevation={0}
      onClick={() => setSelectedLab(lab)}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 32px ${alpha('#000', 0.12)}`,
          '& .lab-card-overlay': {
            opacity: 1
          },
          '& .lab-card-content': {
            transform: 'translateY(-4px)'
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: (theme) =>
            lab.type === 'robot' ? theme.palette.primary.main :
              lab.type === 'medical-ai' ? theme.palette.secondary.main :
                lab.type === 'control' ? theme.palette.success.main :
                  theme.palette.info.main,
          transition: 'opacity 0.3s',
          opacity: 0.8
        }
      }}
    >
      <Box
        className="lab-card-content"
        sx={{
          position: 'relative',
          zIndex: 1,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={lab.director.avatar}
            sx={{
              width: 64,
              height: 64,
              mr: 2,
              border: '2px solid',
              borderColor: 'background.paper',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <Box>
            <Typography variant="h6" sx={{
              fontWeight: 600,
              background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              {lab.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              主任：{lab.director.name} | {lab.director.title}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {lab.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={`${lab.members.researchers + lab.members.students + lab.members.engineers}名成员`}
              size="small"
              sx={{
                background: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                '&:hover': {
                  background: (theme) => alpha(theme.palette.primary.main, 0.2)
                }
              }}
            />
            <Chip
              label={`${lab.equipment.length}台设备`}
              size="small"
              sx={{
                background: (theme) => alpha(theme.palette.secondary.main, 0.1),
                color: 'secondary.main',
                '&:hover': {
                  background: (theme) => alpha(theme.palette.secondary.main, 0.2)
                }
              }}
            />
          </Box>
          <Chip
            label="查看详情"
            color="primary"
            size="small"
            sx={{
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }
            }}
          />
        </Box>
      </Box>
      <Box
        className="lab-card-overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
          opacity: 0,
          transition: 'opacity 0.3s'
        }}
      />
    </Paper>
  );

  // 渲染项目卡片（优化版）
  const renderProjectCard = (project: ProjectInfo) => (
    <Paper
      elevation={0}
      onClick={() => setSelectedProject(project)}
      sx={{
        borderRadius: 2,
        backgroundColor: '#fff',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 32px ${alpha('#000', 0.12)}`,
          '& .project-card-overlay': {
            opacity: 1
          },
          '& .project-card-content': {
            transform: 'translateY(-4px)'
          },
          '& .progress-bar': {
            height: '6px',
            borderRadius: '3px'
          },
          '& .media-play-button': {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1.1)'
          }
        }
      }}
    >
      {/* 媒体展示区域 */}
      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%', // 16:9 宽高比
          backgroundColor: 'grey.100',
          overflow: 'hidden'
        }}
      >
        {project.media.type === 'image' ? (
          <Box
            component="img"
            src={project.media.thumbnail || project.media.url}
            alt={project.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        ) : (
          <>
            <Box
              component="img"
              src={project.media.thumbnail}
              alt={project.title}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <Box
              className="media-play-button"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.8,
                transition: 'all 0.3s ease',
                '&::before': {
                  content: '""',
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '8px 0 8px 16px',
                  borderColor: 'transparent transparent transparent #fff'
                }
              }}
            />
          </>
        )}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1
          }}
        >
          <Chip
            label={project.status === 'ongoing' ? '进行中' : '已完成'}
            color={project.status === 'ongoing' ? 'primary' : 'success'}
            size="small"
            sx={{
              fontWeight: 500,
              backdropFilter: 'blur(4px)',
              backgroundColor: (theme) => alpha(
                project.status === 'ongoing' ? theme.palette.primary.main : theme.palette.success.main,
                0.8
              ),
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: '#fff',
              background: (theme) => alpha('#000', 0.6),
              backdropFilter: 'blur(4px)',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 500
            }}
          >
            {project.timeRange.start} - {project.timeRange.end}
          </Typography>
        </Box>
      </Box>

      <Box
        className="project-card-content"
        sx={{
          position: 'relative',
          zIndex: 1,
          p: 3,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Typography variant="h6" sx={{
          mb: 1,
          fontWeight: 600,
          background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          {project.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {project.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">进度</Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) => project.progress >= 80 ? theme.palette.success.main :
                  project.progress >= 50 ? theme.palette.primary.main :
                    theme.palette.warning.main
              }}
            >
              {project.progress}%
            </Typography>
          </Box>
          <LinearProgress
            className="progress-bar"
            variant="determinate"
            value={project.progress}
            sx={{
              height: 4,
              borderRadius: 2,
              transition: 'all 0.3s',
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              '& .MuiLinearProgress-bar': {
                background: (theme) =>
                  project.progress >= 80 ? `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})` :
                    project.progress >= 50 ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` :
                      `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.warning.light})`
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {project.tags.slice(0, 2).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  background: (theme) => alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  '&:hover': {
                    background: (theme) => alpha(theme.palette.primary.main, 0.2)
                  }
                }}
              />
            ))}
            {project.tags.length > 2 && (
              <Chip
                label={`+${project.tags.length - 2}`}
                size="small"
                sx={{
                  background: (theme) => alpha(theme.palette.secondary.main, 0.1),
                  color: 'secondary.main',
                  '&:hover': {
                    background: (theme) => alpha(theme.palette.secondary.main, 0.2)
                  }
                }}
              />
            )}
          </Box>
          <Chip
            label="查看详情"
            color="primary"
            size="small"
            sx={{
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }
            }}
          />
        </Box>
      </Box>
    </Paper>
  );

  // 实验室详情模态框
  const renderLabDialog = () => (
    <Dialog
      open={!!selectedLab}
      onClose={() => setSelectedLab(null)}
      maxWidth="md"
      fullWidth
    >
      {selectedLab && (
        <>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">{selectedLab.name}</Typography>
              <IconButton onClick={() => setSelectedLab(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              {/* 基本信息 */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>基本信息</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar src={selectedLab.director.avatar} sx={{ width: 48, height: 48, mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle2">{selectedLab.director.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{selectedLab.director.title}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {selectedLab.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <CalendarTodayIcon sx={{ fontSize: 'small', mr: 1, verticalAlign: 'middle' }} />
                        开放时间：{selectedLab.openingHours}
                      </Typography>
                      <Typography variant="body2">
                        位置：{selectedLab.location}
                      </Typography>
                      <Typography variant="body2">
                        联系方式：{selectedLab.contact}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* 成员统计 */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  <GroupIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  实验室成员
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">{selectedLab.members.researchers}</Typography>
                      <Typography variant="body2">研究员</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">{selectedLab.members.students}</Typography>
                      <Typography variant="body2">学生</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">{selectedLab.members.engineers}</Typography>
                      <Typography variant="body2">工程师</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* 设备列表 */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  <EquipmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  实验设备
                </Typography>
                <Grid container spacing={2}>
                  {selectedLab.equipment.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Typography variant="body2">{item.name}</Typography>
                        <Chip
                          label={item.status === 'available' ? '可用' : item.status === 'busy' ? '使用中' : '维护中'}
                          size="small"
                          color={item.status === 'available' ? 'success' : item.status === 'busy' ? 'warning' : 'error'}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider />

              {/* 成果展示 */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>近期成果</Typography>
                <Grid container spacing={2}>
                  {selectedLab.achievements.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper
                        variant="outlined"
                        sx={{ p: 2 }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Chip
                            label={item.type === 'paper' ? '论文' : item.type === 'patent' ? '专利' : '奖项'}
                            size="small"
                            color={item.type === 'paper' ? 'primary' : item.type === 'patent' ? 'secondary' : 'success'}
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {item.year}
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          {item.title}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );

  // 项目详情模态框
  const renderProjectDialog = () => (
    <Dialog
      open={!!selectedProject}
      onClose={() => setSelectedProject(null)}
      maxWidth="md"
      fullWidth
    >
      {selectedProject && (
        <>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">{selectedProject.title}</Typography>
              <IconButton onClick={() => setSelectedProject(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              {/* 基本信息 */}
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="body1" paragraph>
                      {selectedProject.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {selectedProject.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Stack spacing={1}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">状态</Typography>
                          <Chip
                            label={selectedProject.status === 'ongoing' ? '进行中' : '已完成'}
                            color={selectedProject.status === 'ongoing' ? 'primary' : 'success'}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">时间范围</Typography>
                          <Typography variant="body2" display="block">
                            {selectedProject.timeRange.start} - {selectedProject.timeRange.end}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">研究团队</Typography>
                          <Typography variant="body2" display="block">
                            {selectedProject.teamSize}人
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">所属实验室</Typography>
                          <Typography variant="body2" display="block">
                            {selectedProject.labName}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* 项目负责人 */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>项目负责人</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={selectedProject.leader.avatar} sx={{ width: 64, height: 64, mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2">{selectedProject.leader.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedProject.leader.title}</Typography>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {/* 进度和里程碑 */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>项目进度</Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">总体进度</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedProject.progress}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={selectedProject.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                    }}
                  />
                </Box>
                <Typography variant="subtitle2" gutterBottom>里程碑</Typography>
                <Grid container spacing={2}>
                  {selectedProject.milestones.map((milestone, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Paper
                        variant="outlined"
                        sx={{ p: 2 }}
                      >
                        <Typography variant="caption" color="text.secondary" display="block">
                          {milestone.date}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {milestone.title}
                        </Typography>
                        <Chip
                          label={
                            milestone.status === 'completed' ? '已完成' :
                              milestone.status === 'ongoing' ? '进行中' : '待开始'
                          }
                          size="small"
                          color={
                            milestone.status === 'completed' ? 'success' :
                              milestone.status === 'ongoing' ? 'primary' : 'default'
                          }
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {selectedProject.publications.length > 0 && (
                <>
                  <Divider />
                  {/* 发表论文 */}
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>研究成果</Typography>
                    <Grid container spacing={2}>
                      {selectedProject.publications.map((pub, index) => (
                        <Grid item xs={12} key={index}>
                          <Paper
                            variant="outlined"
                            sx={{ p: 2 }}
                          >
                            <Typography variant="subtitle2" gutterBottom>
                              {pub.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              发表于：{pub.journal}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              年份：{pub.year} | DOI: {pub.doi}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}

              <Divider />

              {/* 经费信息 */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>经费信息</Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">经费来源</Typography>
                      <Typography variant="subtitle2">{selectedProject.funding.source}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">经费金额</Typography>
                      <Typography variant="subtitle2">{selectedProject.funding.amount}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        {/* 顶部标签页 */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              backgroundColor: '#fff',
              '& .MuiTabs-indicator': {
                height: 3,
              },
            }}
          >
            <Tab
              label="实验室信息"
              sx={{
                fontSize: '1rem',
                fontWeight: 500,
                py: 2
              }}
            />
            <Tab
              label="研究项目展示"
              sx={{
                fontSize: '1rem',
                fontWeight: 500,
                py: 2
              }}
            />
          </Tabs>
        </Paper>

        {/* 标签筛选 */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            backgroundColor: '#fff'
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
              {activeTab === 0 ? '实验室类型' : '项目类型'}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(activeTab === 0 ? LAB_TYPES : PROJECT_TYPES).map((type) => (
                <Chip
                  key={type.id}
                  label={type.name}
                  onClick={() => setSelectedType(type.id)}
                  variant={selectedType === type.id ? 'filled' : 'outlined'}
                  sx={{
                    borderRadius: 2,
                    '&.MuiChip-filled': {
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: '#fff'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>

        {/* 内容列表 */}
        <Grid container spacing={3}>
          {activeTab === 0
            ? labs.map((lab) => (
              <Grid item xs={12} sm={6} md={4} key={lab.id}>
                {renderLabCard(lab)}
              </Grid>
            ))
            : projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                {renderProjectCard(project)}
              </Grid>
            ))
          }
        </Grid>

        {/* 详情模态框 */}
        {renderLabDialog()}
        {renderProjectDialog()}
      </Container>
    </Box>
  );
};

export default LabPage;