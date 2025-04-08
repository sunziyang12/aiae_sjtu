import React from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  alpha,
  Grid,
  Tooltip as MuiTooltip
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import styles from './ResourceCharts.module.css';

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

// 资源图表属性接口
interface ResourceChartsProps {
  resources: {
    projects: ProjectResource;
    talents: TalentResource;
    investors: InvestorResource;
    labs: LabResource;
  };
}

/**
 * 资源图表组件
 * 展示资源统计数据和趋势
 * 
 * @param {ResourceChartsProps} props - 组件属性
 * @returns {JSX.Element} 返回资源图表组件
 */
export const ResourceCharts: React.FC<ResourceChartsProps> = ({ resources }) => {
  const theme = useTheme();

  // 项目状态数据
  const projectStatusData = [
    { name: '进行中', value: resources.projects.active },
    { name: '已完成', value: resources.projects.completed },
    { name: '待处理', value: resources.projects.pending }
  ];

  // 人才类型数据
  const talentTypeData = [
    { name: '研究员', value: resources.talents.researchers },
    { name: '工程师', value: resources.talents.engineers },
    { name: '管理者', value: resources.talents.managers }
  ];

  // 投资者类型数据
  const investorTypeData = [
    { name: '机构投资者', value: resources.investors.institutional },
    { name: '个人投资者', value: resources.investors.individual }
  ];

  // 实验室使用情况数据
  const labUsageData = [
    { name: '使用中', value: resources.labs.inUse },
    { name: '可用', value: resources.labs.available }
  ];

  // 趋势数据 - 模拟数据
  const trendData = [
    { name: '1月', projects: 12, talents: 8, investors: 5, labs: 3 },
    { name: '2月', projects: 15, talents: 10, investors: 6, labs: 4 },
    { name: '3月', projects: 18, talents: 12, investors: 8, labs: 5 },
    { name: '4月', projects: 22, talents: 15, investors: 10, labs: 6 },
    { name: '5月', projects: 25, talents: 18, investors: 12, labs: 7 },
    { name: '6月', projects: 30, talents: 20, investors: 15, labs: 8 }
  ];

  // 自定义颜色
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.warning.main,
    theme.palette.error.main
  ];

  // 自定义工具提示
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper elevation={3} className={styles.tooltip}>
          <Typography variant="subtitle2">{label}</Typography>
          {payload.map((entry: any, index: number) => (
            <Typography key={`item-${index}`} variant="body2" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  // 渲染饼图
  const renderPieChart = (data: any[], title: string, colors: string[]) => {
    return (
      <Paper elevation={3} className={styles.chartCard}>
        <Typography variant="h6" className={styles.chartTitle}>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    );
  };

  // 渲染趋势图
  const renderTrendChart = () => {
    return (
      <Paper elevation={3} className={styles.chartCard}>
        <Typography variant="h6" className={styles.chartTitle}>
          资源趋势
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={trendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="projects" stroke={theme.palette.primary.main} name="项目" />
            <Line type="monotone" dataKey="talents" stroke={theme.palette.secondary.main} name="人才" />
            <Line type="monotone" dataKey="investors" stroke={theme.palette.info.main} name="投资者" />
            <Line type="monotone" dataKey="labs" stroke={theme.palette.warning.main} name="实验室" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    );
  };

  // 渲染柱状图
  const renderBarChart = (data: any[], title: string, colors: string[]) => {
    return (
      <Paper elevation={3} className={styles.chartCard}>
        <Typography variant="h6" className={styles.chartTitle}>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill={colors[0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    );
  };

  return (
    <Box className={styles.root}>
      <Typography variant="h5" className={styles.title}>
        资源统计
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderPieChart(projectStatusData, '项目状态分布', [theme.palette.success.main, theme.palette.primary.main, theme.palette.warning.main])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderPieChart(talentTypeData, '人才类型分布', [theme.palette.secondary.main, theme.palette.info.main, theme.palette.warning.main])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderBarChart(investorTypeData, '投资者类型分布', [theme.palette.info.main, theme.palette.warning.main])}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderPieChart(labUsageData, '实验室使用情况', [theme.palette.warning.main, theme.palette.success.main])}
        </Grid>
        <Grid item xs={12}>
          {renderTrendChart()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourceCharts; 