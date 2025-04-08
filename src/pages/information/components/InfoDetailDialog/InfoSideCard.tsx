import React from 'react';
import {
  Paper,
  Stack,
  Box,
  Typography,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { InfoItem } from '../../types';

/**
 * 信息详情侧边栏卡片组件
 * @param {InfoSideCardProps} props - 组件属性
 * @returns {JSX.Element} 信息详情侧边栏卡片
 */
interface InfoSideCardProps {
  info: InfoItem;
}

/**
 * 信息详情侧边栏卡片组件
 * @param {InfoSideCardProps} props - 组件属性
 * @returns {JSX.Element} 信息详情侧边栏卡片
 */
export const InfoSideCard: React.FC<InfoSideCardProps> = ({ info }) => {
  const theme = useTheme();

  /**
   * 渲染信息详情侧边栏卡片
   * @returns {JSX.Element} 信息详情侧边栏卡片
   */
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        position: { xs: 'static', md: 'sticky' },
        top: 16,
        alignSelf: 'start'
      }}
    >
      {/* 侧边栏卡片内容 */}
      <Stack spacing={3}>
        {/* 时间信息 */}
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex'
              }}
            >
              <CalendarTodayIcon color="primary" />
            </Box>
            <Stack>
              <Typography variant="body2" color="text.secondary">
                开始时间
              </Typography>
              <Typography variant="subtitle2">
                {info.date}
              </Typography>
            </Stack>
          </Stack>

          {info.registrationDeadline && (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  display: 'flex'
                }}
              >
                <AccessTimeIcon color="error" />
              </Box>
              <Stack>
                <Typography variant="body2" color="text.secondary">
                  报名截止
                </Typography>
                <Typography variant="subtitle2">
                  {info.registrationDeadline}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>

        {/* 地点信息 */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.info.main, 0.1),
              display: 'flex'
            }}
          >
            <LocationOnIcon color="info" />
          </Box>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              地点
            </Typography>
            <Typography variant="subtitle2">
              {info.location}
            </Typography>
          </Stack>
        </Stack>

        {/* 人数限制 */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              display: 'flex'
            }}
          >
            <PeopleIcon color="warning" />
          </Box>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              人数限制
            </Typography>
            <Typography variant="subtitle2">
              {info.capacity}
            </Typography>
          </Stack>
        </Stack>

        {/* 主办方信息 */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.success.main, 0.1),
              display: 'flex'
            }}
          >
            <BusinessIcon color="success" />
          </Box>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              主办方
            </Typography>
            <Typography variant="subtitle2">
              {info.organizer}
            </Typography>
          </Stack>
        </Stack>

        {/* 联系方式 */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
              display: 'flex'
            }}
          >
            <EmailIcon color="secondary" />
          </Box>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              联系方式
            </Typography>
            <Typography variant="subtitle2">
              {info.contact}
            </Typography>
          </Stack>
        </Stack>

        {/* 标签 */}
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            标签
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {info.tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main'
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* 状态 */}
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom> {/* 状态 */}
            状态
          </Typography>


          <Chip
            label={info.status === 'upcoming' ? '即将开始' : info.status === 'ongoing' ? '进行中' : '已结束'}
            color={info.status === 'upcoming' ? 'info' : info.status === 'ongoing' ? 'success' : 'error'}
            sx={{ mt: 1 }}
          /> {/* 状态 */}
        </Box>
      </Stack>
    </Paper>
  );
};

export default InfoSideCard; 