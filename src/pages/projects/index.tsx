import React, { useState } from 'react'; // 导入React和useState
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  LinearProgress,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  Divider,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import {
  LocationOn as LocationIcon, // 导入位置图标
  People as PeopleIcon, // 导入人员图标
  Close as CloseIcon, // 导入关闭图标
  Email as EmailIcon, // 导入邮箱图标
  Phone as PhoneIcon, // 导入电话图标
} from '@mui/icons-material'; // 导入图标组件
import ProjectFilters from './components/ProjectFilters'; // 导入项目过滤器组件
import ProjectList from './components/ProjectList'; // 导入项目列表组件
import ProjectDialog from './components/ProjectDialog'; // 导入项目对话框组件
import { MOCK_PROJECTS, MOCK_COMMENTS } from './data/mockData'; // 导入模拟数据
import { startupStages, industries, projectTypes, resourceNeeds, teamStatus } from './data/constants'; // 导入常量
import styles from './styles/ProjectPage.module.css'; // 导入样式文件

// ProjectsPage 是一个用于展示项目的页面组件
const ProjectsPage: React.FC = () => {
  // 状态管理
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedResource, setSelectedResource] = useState('all');
  const [selectedTeamStatus, setSelectedTeamStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof MOCK_PROJECTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isContactMode, setIsContactMode] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // 处理项目点击
  const handleProjectClick = (project: typeof MOCK_PROJECTS[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  // 处理对话框关闭
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
    setIsContactMode(false);
    setNewComment('');
    setContactMessage('');
  };

  // 处理评论提交
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      // TODO: 实现评论提交逻辑
      setNewComment('');
    }
  };

  // 处理联系提交
  const handleContactSubmit = () => {
    if (contactMessage.trim()) {
      // TODO: 实现联系提交逻辑
      setContactMessage('');
      setIsContactMode(false);
    }
  };

  // 过滤项目
  const filteredProjects = MOCK_PROJECTS.filter(project => {
    if (selectedStage !== 'all' && project.stage !== selectedStage) return false;  // 过滤创业阶段
    if (selectedIndustry !== 'all' && project.industry !== selectedIndustry) return false; // 过滤行业
    if (selectedType !== 'all' && project.type !== selectedType) return false; // 过滤项目类型
    if (selectedResource !== 'all' && !project.resourceNeeds.includes(selectedResource)) return false; // 过滤资源需求
    if (selectedTeamStatus !== 'all') {
      if (selectedTeamStatus === 'complete' && project.team.size < 3) return false; // 过滤团队规模
      if (selectedTeamStatus === 'recruiting' && project.team.size >= 3) return false; // 过滤团队规模
      if (selectedTeamStatus === 'tech_needed' && !project.resourceNeeds.includes('tech')) return false; // 过滤技术需求
      if (selectedTeamStatus === 'operation_needed' && !project.resourceNeeds.includes('operation')) return false; // 过滤运营需求
    }
    return true; // 返回过滤后的项目
  });

  // 返回项目列表组件
  return (
    <Container className={styles.container}>

      <Box className={styles.filters}>
        <ProjectFilters
          selectedStage={selectedStage} // 选中的创业阶段
          selectedIndustry={selectedIndustry} // 选中的行业
          selectedType={selectedType} // 选中的项目类型
          selectedResource={selectedResource} // 选中的资源需求
          selectedTeamStatus={selectedTeamStatus} // 选中的团队状态
          onStageChange={setSelectedStage} // 创业阶段改变
          onIndustryChange={setSelectedIndustry} // 行业改变
          onTypeChange={setSelectedType} // 项目类型改变
          onResourceChange={setSelectedResource} // 资源需求改变
          onTeamStatusChange={setSelectedTeamStatus} // 团队状态改变
          startupStages={startupStages} // 创业阶段
          industries={industries} // 行业
          projectTypes={projectTypes} // 项目类型
          resourceNeeds={resourceNeeds} // 资源需求
          teamStatus={teamStatus} // 团队状态
        />
      </Box>

      {/* 项目列表组件 */}
      <Box className={styles.projectList}>
        <ProjectList
          projects={filteredProjects} // 项目列表
          onProjectClick={handleProjectClick} // 项目点击
        />
      </Box>

      {selectedProject && (
        <ProjectDialog // 项目对话框
          project={selectedProject} // 选中的项目
          comments={MOCK_COMMENTS} // 评论
          onClose={handleDialogClose} // 关闭对话框
          onCommentSubmit={(content) => {
            // TODO: 实现评论提交逻辑
            console.log('New comment:', content);
          }}
          onContactSubmit={(message) => {
            // TODO: 实现联系提交逻辑
            console.log('Contact message:', message);
          }}
        />
      )}
    </Container>
  );
};

export default ProjectsPage; // 导出ProjectsPage组件