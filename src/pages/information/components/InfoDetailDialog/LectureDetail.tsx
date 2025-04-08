import React from 'react';
import { Box, Paper, Typography, Stack, Divider, Avatar, IconButton } from '@mui/material';
import { InfoItem } from '../../types';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import LinkIcon from '@mui/icons-material/Link';

// 定义LectureDetailProps类型，用于存储讲座详情信息
interface LectureDetailProps {
  info: InfoItem;
}

// 定义LectureDetail组件
const LectureDetail: React.FC<LectureDetailProps> = ({ info }) => {
  // 定义getFileIcon函数，用于获取文件图标
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdfIcon />;
      case 'video':
        return <VideoLibraryIcon />;
      case 'link':
        return <LinkIcon />;
      default:
        return <LinkIcon />;
    }
  };

  // 返回组件的JSX结构  
  return (
    <Box sx={{ p: 2 }}>
      {/* 讲座介绍 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(45deg, #f5f7fa 0%, #e4e8f0 100%)',
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom>
          讲座介绍21
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {info.description}
        </Typography>
      </Paper>

      {/* 讲者信息 */}
      {info.speakers && info.speakers.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(45deg, #f5f7fa 0%, #e4e8f0 100%)',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            讲者信息
          </Typography>
          <Stack spacing={2}>
            {info.speakers.map((speaker, index) => (
              <Box key={index}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={speaker.avatar}
                    alt={speaker.name}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Typography variant="subtitle1">
                      {speaker.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {speaker.title}
                    </Typography>
                    {speaker.bio && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {speaker.bio}
                      </Typography>
                    )}
                  </Box>
                </Stack>
                {index < info.speakers!.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))}
          </Stack>
        </Paper>
      )}

      {/* 相关资料 */}
      {info.courseMaterials && info.courseMaterials.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: 'linear-gradient(45deg, #f5f7fa 0%, #e4e8f0 100%)',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            相关资料
          </Typography>
          <Stack spacing={1}>
            {info.courseMaterials.map((material, index) => (
              <Box key={index}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {getFileIcon(material.type)}
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    {material.title}
                  </Typography>
                  <IconButton
                    href={material.url}
                    target="_blank"
                    size="small"
                  >
                    {material.type === 'link' ? <OpenInNewIcon /> : <DownloadIcon />}
                  </IconButton>
                </Stack>
                {index < info.courseMaterials!.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

// 导出LectureDetail组件
export default LectureDetail; 