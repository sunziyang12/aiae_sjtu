import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Box,
  Tooltip,
  Avatar,
  AvatarGroup
} from '@mui/material';
import {
  GroupOutlined,
  TrendingUpOutlined,
  BuildOutlined,
  LocationOnOutlined,
  Business,
  LocalOffer
} from '@mui/icons-material';
import styles from '../styles/ProjectPage.module.css';

// 定义ProjectList组件的属性接口
interface ProjectListProps {
  projects: ProjectData[];
}

interface ProjectStage {
  id: string;
  name: string;
  color: string;
}

interface TeamStatus {
  id: string;
  name: string;
  color: string;
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface Team {
  size: number;
  status: TeamStatus;
  members: TeamMember[];
  description: string;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  progress: number;
  stage: string;
  type: string;
  industry: string;
  team: {
    size: number;
    status: string;
    members: {
      name: string;
      role: string;
      avatar: string;
    }[];
    description: string;
  };
  location: string;
  resourceNeeds: string[];
  tags: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
    wechat: string;
  };
}

// 定义ProjectList组件  
const ProjectList: React.FC<{ projects: ProjectData[]; onProjectClick?: (project: ProjectData) => void }> = ({ projects, onProjectClick }) => {
  const getStageColor = (stage: string) => {
    const stageColors: Record<string, string> = {
      'innovation': '#FFA726',
      'prototype': '#66BB6A',
      'seed': '#42A5F5',
      'participated': '#7E57C2',
      'incubated': '#26A69A'
    };
    return stageColors[stage] || '#1976d2';
  };

  // 获取团队状态对应的颜色
  const getTeamStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'recruiting': '#FF7043',
      'tech_needed': '#42A5F5',
      'operation_needed': '#66BB6A'
    };
    return statusColors[status] || '#4caf50';
  };

  // 获取项目标签对应的颜色 
  const getTagColor = (index: number) => {
    const colors = ['#1976d2', '#388e3c', '#d32f2f', '#7b1fa2', '#1565c0', '#c62828'];
    return colors[index % colors.length];
  };

  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <Card
            className={styles.projectCard}
            onClick={() => onProjectClick?.(project)}
            sx={{ cursor: 'pointer' }}
          >
            <div className={styles.cardMediaContainer}>
              <CardMedia
                component="img"
                image={project.image}
                alt={project.title}
                className={styles.projectImage}
              />
              <div className={styles.progressOverlay}>
                <Typography variant="body2" className={styles.progressText}>
                  项目进度
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box flex={1}>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      className={styles.progressBar}
                    />
                  </Box>
                  <Typography variant="body2" className={styles.progressValue}>
                    {project.progress}%
                  </Typography>
                </Box>
              </div>
            </div>

            <CardContent className={styles.cardContent}>
              <Typography variant="h6" className={styles.projectTitle}>
                {project.title}
              </Typography>

              <Typography variant="body2" className={styles.projectDescription}>
                {project.description}
              </Typography>

              {/* 项目标签 */}
              <Box className={styles.projectTags}>
                <Typography variant="body2" className={styles.resourceLabel}>
                  <LocalOffer fontSize="small" />
                  项目标签
                </Typography>
                <Box className={styles.tagList}>
                  {project.tags.map((tag, index) => (
                    <Tooltip key={index} title={tag}>
                      <Chip
                        label={tag}
                        size="small"
                        className={styles.tagChip}
                        style={{
                          backgroundColor: `${getTagColor(index)}15`,
                          color: getTagColor(index)
                        }}
                      />
                    </Tooltip>
                  ))}
                </Box>
              </Box>

              <div className={styles.projectInfo}>
                <Box display="flex" gap={1}>
                  <Tooltip title="项目阶段">
                    <Chip
                      icon={<TrendingUpOutlined />}
                      label={project.stage}
                      className={styles.stageChip}
                      style={{
                        backgroundColor: `${getStageColor(project.stage)}15`,
                        color: getStageColor(project.stage)
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="团队状态">
                    <Chip
                      icon={<GroupOutlined />}
                      label={project.team.status}
                      className={styles.teamChip}
                      style={{
                        backgroundColor: `${getTeamStatusColor(project.team.status)}15`,
                        color: getTeamStatusColor(project.team.status)
                      }}
                    />
                  </Tooltip>
                </Box>

                <div className={styles.resourceTags}>
                  <Typography variant="body2" className={styles.resourceLabel}>
                    <BuildOutlined fontSize="small" />
                    资源需求
                  </Typography>
                  <Box className={styles.resourceChips}>
                    {project.resourceNeeds.slice(0, 3).map((need, index) => (
                      <Tooltip key={index} title={need}>
                        <Chip
                          label={need}
                          size="small"
                          className={styles.resourceChip}
                        />
                      </Tooltip>
                    ))}
                    {project.resourceNeeds.length > 3 && (
                      <Tooltip title={project.resourceNeeds.slice(3).join(', ')}>
                        <Chip
                          label={`+${project.resourceNeeds.length - 3}`}
                          size="small"
                          className={styles.moreChip}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </div>

                <div className={styles.cardFooter}>
                  <Box className={styles.locationInfo}>
                    <Tooltip title="所在地">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <LocationOnOutlined className={styles.locationIcon} />
                        <Typography variant="body2">{project.location}</Typography>
                      </Box>
                    </Tooltip>
                    <Tooltip title="所属公司">
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Business className={styles.locationIcon} />
                        <Typography variant="body2">{project.industry}</Typography>
                      </Box>
                    </Tooltip>
                  </Box>

                  <AvatarGroup max={4} className={styles.teamAvatars}>
                    {project.team.members.map((member) => (
                      <Tooltip key={member.name} title={member.name}>
                        <Avatar
                          alt={member.name}
                          src={member.avatar}
                          className={styles.teamAvatar}
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectList;