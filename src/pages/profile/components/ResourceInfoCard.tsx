import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Paper,
  useTheme,
  alpha,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  LinearProgress,
  Tooltip,
  Divider,
  Avatar,
  Badge,
  Tabs,
  Tab
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Science as ScienceIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Folder as ProjectIcon,
  Person as TalentIcon,
  AccountBalance as InvestorIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  FileDownload as ExportIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon2,
  TrendingDown as TrendingDownIcon2,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { ExportUtils } from '../../../utils/exportUtils';
import ResourceCharts from './ResourceCharts';
import styles from './ResourceInfoCard.module.css';

// 资源项目接口
interface ResourceItem {
  name: string;
  status?: string;
  field?: string;
  type?: string;
  usage?: string;
}

// 资源统计接口
interface ResourceStat {
  label: string;
  value: number | string;
}

// 资源数据接口
interface ResourceData {
  title: string;
  icon: React.ReactNode;
  total: number;
  trend: string;
  stats: ResourceStat[];
  items: ResourceItem[];
  totalInvestment?: string;
}

// 项目资源接口
interface ProjectResource {
  total: number;
  active: number;
  completed: number;
  pending: number;
  trend: string;
  recentProjects: { name: string; status: string; }[];
}

// 人才资源接口
interface TalentResource {
  total: number;
  researchers: number;
  engineers: number;
  managers: number;
  trend: string;
  topTalents: { name: string; field: string; }[];
}

// 投资者资源接口
interface InvestorResource {
  total: number;
  institutional: number;
  individual: number;
  totalInvestment: string;
  trend: string;
  activeInvestors: { name: string; type: string; }[];
}

// 实验资源接口
interface LabResource {
  total: number;
  inUse: number;
  available: number;
  utilization: string;
  trend: string;
  equipment: number;
  activeProjects: { name: string; usage: string; }[];
}

// 资源信息卡片属性接口
interface ResourceInfoCardProps {
  resources: {
    projects: ProjectResource;
    talents: TalentResource;
    investors: InvestorResource;
    labs: LabResource;
  };
}

/**
 * 资源信息卡片组件
 * 将四张资源卡片集成到一张卡片中
 * 
 * @param {ResourceInfoCardProps} props - 组件属性
 * @returns {JSX.Element} 返回资源信息卡片组件
 */
export const ResourceInfoCard: React.FC<ResourceInfoCardProps> = ({ resources }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedResourceType, setSelectedResourceType] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, resourceType: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedResourceType(resourceType);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedResourceType(null);
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    if (!selectedResourceType) return;

    if (format === 'excel') {
      ExportUtils.exportResourcesToExcel(resources, selectedResourceType);
    } else {
      ExportUtils.exportResourcesToPDF(resources, selectedResourceType);
    }

    handleMenuClose();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filterResources = (items: any[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // 获取趋势图标
  const getTrendIcon = (trend: string) => {
    const isPositive = trend.includes('+');
    return isPositive ?
      <TrendingUpIcon2 fontSize="small" sx={{ color: theme.palette.success.main }} /> :
      <TrendingDownIcon2 fontSize="small" sx={{ color: theme.palette.error.main }} />;
  };

  // 获取趋势颜色
  const getTrendColor = (trend: string) => {
    return trend.includes('+') ? 'success' : 'error';
  };

  // 获取资源类型颜色
  const getResourceColor = (title: string) => {
    switch (title) {
      case '项目资源': return theme.palette.primary.main;
      case '人才资源': return theme.palette.secondary.main;
      case '投资者资源': return theme.palette.info.main;
      case '实验资源': return theme.palette.warning.main;
      default: return theme.palette.primary.main;
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon color="success" fontSize="small" />;
      case 'pending':
        return <PendingIcon color="warning" fontSize="small" />;
      case 'completed':
        return <CheckCircleIcon color="primary" fontSize="small" />;
      default:
        return <WarningIcon color="error" fontSize="small" />;
    }
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'primary';
      default:
        return 'error';
    }
  };

  // 渲染资源卡片内容
  const renderResourceContent = () => {
    return (
      <Box>
        <Grid container spacing={3}>
          {/* Projects Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={styles.resourceCard}>
              <Box className={styles.cardHeader} sx={{ background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.light, 0.05)})` }}>
                <Box className={styles.cardTitleContainer}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box className={styles.badgeContent}>
                        <TrendingUpIcon fontSize="small" />
                      </Box>
                    }
                  >
                    <Avatar className={styles.cardAvatar} sx={{ bgcolor: theme.palette.primary.main }}>
                      <ProjectIcon />
                    </Avatar>
                  </Badge>
                  <Box>
                    <Typography variant="h6" className={styles.cardTitle}>
                      项目资源
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      共 {resources.projects.recentProjects.length} 个项目
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Tooltip title="导出">
                    <IconButton onClick={(e) => handleMenuClick(e, 'projects')} className={styles.actionButton}>
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Divider className={styles.divider} />
              <List className={styles.list}>
                {resources.projects.recentProjects.map((project, index) => (
                  <ListItem key={index} className={styles.listItem}>
                    <ListItemText
                      primary={
                        <Box className={styles.itemHeader}>
                          <Typography variant="subtitle1" className={styles.itemTitle}>
                            {project.name}
                          </Typography>
                          <Chip
                            icon={getStatusIcon(project.status)}
                            label={project.status === 'active' ? '进行中' :
                              project.status === 'pending' ? '待处理' :
                                project.status === 'completed' ? '已完成' : '未知'}
                            size="small"
                            color={getStatusColor(project.status)}
                            className={styles.statusChip}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Talents Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={styles.resourceCard}>
              <Box className={styles.cardHeader} sx={{ background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.secondary.light, 0.05)})` }}>
                <Box className={styles.cardTitleContainer}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box className={styles.badgeContent}>
                        <StarIcon fontSize="small" />
                      </Box>
                    }
                  >
                    <Avatar className={styles.cardAvatar} sx={{ bgcolor: theme.palette.secondary.main }}>
                      <TalentIcon />
                    </Avatar>
                  </Badge>
                  <Box>
                    <Typography variant="h6" className={styles.cardTitle}>
                      人才资源
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      共 {resources.talents.topTalents.length} 位人才
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Tooltip title="导出">
                    <IconButton onClick={(e) => handleMenuClick(e, 'talents')} className={styles.actionButton}>
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Divider className={styles.divider} />
              <List className={styles.list}>
                {resources.talents.topTalents.map((talent, index) => (
                  <ListItem key={index} className={styles.listItem}>
                    <ListItemText
                      primary={
                        <Box className={styles.itemHeader}>
                          <Typography variant="subtitle1" className={styles.itemTitle}>
                            {talent.name}
                          </Typography>
                          <Chip
                            label={talent.field}
                            size="small"
                            className={styles.fieldChip}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Investors Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={styles.resourceCard}>
              <Box className={styles.cardHeader} sx={{ background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)}, ${alpha(theme.palette.info.light, 0.05)})` }}>
                <Box className={styles.cardTitleContainer}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box className={styles.badgeContent}>
                        <TrendingUpIcon fontSize="small" />
                      </Box>
                    }
                  >
                    <Avatar className={styles.cardAvatar} sx={{ bgcolor: theme.palette.info.main }}>
                      <InvestorIcon />
                    </Avatar>
                  </Badge>
                  <Box>
                    <Typography variant="h6" className={styles.cardTitle}>
                      投资者资源
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      共 {resources.investors.activeInvestors.length} 位投资者
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Tooltip title="导出">
                    <IconButton onClick={(e) => handleMenuClick(e, 'investors')} className={styles.actionButton}>
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Divider className={styles.divider} />
              <List className={styles.list}>
                {resources.investors.activeInvestors.map((investor, index) => (
                  <ListItem key={index} className={styles.listItem}>
                    <ListItemText
                      primary={
                        <Box className={styles.itemHeader}>
                          <Typography variant="subtitle1" className={styles.itemTitle}>
                            {investor.name}
                          </Typography>
                          <Chip
                            label={investor.type}
                            size="small"
                            className={styles.typeChip}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Labs Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={styles.resourceCard}>
              <Box className={styles.cardHeader} sx={{ background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)}, ${alpha(theme.palette.warning.light, 0.05)})` }}>
                <Box className={styles.cardTitleContainer}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box className={styles.badgeContent}>
                        <ScienceIcon fontSize="small" />
                      </Box>
                    }
                  >
                    <Avatar className={styles.cardAvatar} sx={{ bgcolor: theme.palette.warning.main }}>
                      <ScienceIcon />
                    </Avatar>
                  </Badge>
                  <Box>
                    <Typography variant="h6" className={styles.cardTitle}>
                      实验资源
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      共 {resources.labs.activeProjects.length} 个实验室
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Tooltip title="导出">
                    <IconButton onClick={(e) => handleMenuClick(e, 'labs')} className={styles.actionButton}>
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Divider className={styles.divider} />
              <List className={styles.list}>
                {resources.labs.activeProjects.map((project, index) => (
                  <ListItem key={index} className={styles.listItem}>
                    <ListItemText
                      primary={
                        <Box className={styles.itemHeader}>
                          <Typography variant="subtitle1" className={styles.itemTitle}>
                            {project.name}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box className={styles.usageContainer}>
                          <LinearProgress
                            variant="determinate"
                            value={parseInt(project.usage)}
                            className={styles.usageProgress}
                            color={parseInt(project.usage) > 80 ? "error" : parseInt(project.usage) > 50 ? "warning" : "success"}
                          />
                          <Typography variant="body2" className={styles.usageText}>
                            {project.usage}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className={styles.exportMenu}
        >
          <MenuItem onClick={() => handleExport('excel')} className={styles.menuItem}>
            <ExportIcon className={styles.menuIcon} />
            导出为Excel
          </MenuItem>
          <MenuItem onClick={() => handleExport('pdf')} className={styles.menuItem}>
            <ExportIcon className={styles.menuIcon} />
            导出为PDF
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  return (
    <Card className={styles.root}>
      <CardContent>
        <Box className={styles.headerContainer}>
          <Typography variant="h5" className={styles.title}>
            资源概览
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            className={styles.tabs}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="资源列表" />
            <Tab label="数据统计" icon={<BarChartIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {tabValue === 0 ? (
          renderResourceContent()
        ) : (
          <ResourceCharts resources={resources} />
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceInfoCard; 