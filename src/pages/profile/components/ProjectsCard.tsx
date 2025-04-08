import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { Add as AddIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

/**
 * 项目接口
 */
interface Project {
  id: number;
  title: string;
  status: string;
  description?: string;
  date?: string;
}

/**
 * 项目卡片组件
 * 展示用户的项目列表
 * 
 * @component
 * @param {Object} props - 组件属性
 * @param {Project[]} props.projects - 用户项目列表
 * @returns {JSX.Element} 返回项目卡片组件
 */
const ProjectsCard: React.FC<{ projects: Project[] }> = ({ projects }) => {
  // 获取状态对应的颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '进行中':
        return '#2196f3';
      case '已完成':
        return '#4caf50';
      case '已暂停':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        backgroundColor: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            我的项目
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            sx={{
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            }}
          >
            创建新项目
          </Button>
        </Box>

        {projects.length > 0 ? (
          projects.map((project) => (
            <Box key={project.id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {project.title}
                </Typography>
                <Chip
                  label={project.status}
                  size="small"
                  sx={{
                    backgroundColor: `${getStatusColor(project.status)}15`,
                    color: getStatusColor(project.status),
                    fontWeight: 500,
                  }}
                />
              </Box>

              {project.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {project.description}
                </Typography>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                {project.date && (
                  <Typography variant="caption" color="text.secondary">
                    {project.date}
                  </Typography>
                )}
                <Button
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ color: '#1a237e' }}
                >
                  查看详情
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="text.secondary">
              暂无项目，点击上方按钮创建新项目
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsCard; 