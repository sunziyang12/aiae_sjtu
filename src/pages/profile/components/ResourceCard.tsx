import React from 'react';
import { Card, CardContent, Box, Typography, Avatar, Chip, Grid } from '@mui/material';
import styles from '../styles/ProfilePage.module.css';

interface ResourceItem {
  name: string;
  status?: string;
  field?: string;
  type?: string;
  usage?: string;
}

interface ResourceCardProps {
  title: string;
  icon: React.ReactNode;
  total: number;
  trend: string;
  stats: {
    label: string;
    value: number | string;
  }[];
  items: ResourceItem[];
  totalInvestment?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  icon,
  total,
  trend,
  stats,
  items,
  totalInvestment,
}) => {
  return (
    <Card className={styles.resourceCard}>
      <CardContent>
        <Box className={styles.resourceHeader}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar className={styles.resourceIcon}>
              {icon}
            </Avatar>
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Chip label={trend} color="success" size="small" />
        </Box>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {total}
        </Typography>
        <Grid container spacing={1} className={styles.resourceStats}>
          {stats.map((stat, index) => (
            <Grid item xs={4} key={index}>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="h6">{stat.value}</Typography>
            </Grid>
          ))}
        </Grid>
        <Box className={styles.resourceList}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {title === '投资者资源' ? '活跃投资方' : title === '实验资源' ? '实验室使用情况' : '最近项目'}
          </Typography>
          {items.map((item, index) => (
            <Chip
              key={index}
              label={
                title === '投资者资源'
                  ? `${item.name} · ${item.type}`
                  : title === '实验资源'
                    ? `${item.name} · ${item.usage}`
                    : item.name
              }
              size="small"
              className={styles.resourceListItem}
              color={item.status === 'active' ? 'primary' : 'default'}
            />
          ))}
        </Box>
        {totalInvestment && (
          <Typography variant="subtitle2" sx={{ mt: 2, color: 'success.main' }}>
            总投资额：{totalInvestment}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard; 