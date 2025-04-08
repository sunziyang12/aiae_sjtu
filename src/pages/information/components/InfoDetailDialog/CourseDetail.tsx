import React from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material';
import { InfoItem } from '../../types';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

interface CourseDetailProps {
  info: InfoItem;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ info }) => {
  const theme = useTheme();

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <DescriptionIcon color="error" />;
      case 'doc':
        return <DescriptionIcon color="primary" />;
      case 'xls':
        return <DescriptionIcon color="success" />;
      case 'zip':
        return <DescriptionIcon color="warning" />;
      default:
        return <DescriptionIcon />;
    }
  };

  return (
    <Stack spacing={3}>
      {/* 课程介绍 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SchoolIcon color="primary" sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              课程介绍
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              letterSpacing: 0.3,
            }}
          >
            {info.description}
          </Typography>
        </Stack>
      </Paper>

      {/* 课程大纲 */}
      {info.courseOutline && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.02)} 100%)`,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MenuBookIcon sx={{ fontSize: 28, color: 'info.main' }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                课程大纲
              </Typography>
            </Stack>
            <List sx={{ width: '100%', bgcolor: 'transparent' }}>
              {info.courseOutline.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    px: 0,
                    borderBottom: index < info.courseOutline!.length - 1 ? '1px dashed' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={500}>
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {item.description}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Paper>
      )}

      {/* 课程资料 */}
      {info.courseMaterials && info.courseMaterials.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.05)} 0%, ${alpha(theme.palette.warning.main, 0.02)} 100%)`,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <DescriptionOutlinedIcon sx={{ fontSize: 28, color: 'warning.main' }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                课程资料
              </Typography>
            </Stack>
            <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
              {info.courseMaterials.map((material, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderBottom: index < info.courseMaterials!.length - 1 ? 1 : 0,
                    borderColor: 'divider',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                  secondaryAction={
                    <Tooltip title="下载文件">
                      <IconButton
                        edge="end"
                        href={material.url}
                        download
                        sx={{
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemIcon>{getFileIcon(material.type)}</ListItemIcon>
                  <ListItemText
                    primary={material.title}
                    secondary={material.description}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: 500,
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      sx: { mt: 0.5 },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};

export default CourseDetail; 