import React from 'react';
import { Box, Paper, Typography, Stack, Divider, Button, IconButton } from '@mui/material';
import { InfoItem } from '../../types';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';

interface PolicyDetailProps {
  info: InfoItem;
}

const PolicyDetail: React.FC<PolicyDetailProps> = ({ info }) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdfIcon />;
      case 'doc':
        return <DescriptionOutlinedIcon />;
      case 'xls':
        return <InsertDriveFileOutlinedIcon />;
      case 'zip':
        return <FolderZipOutlinedIcon />;
      default:
        return <DescriptionOutlinedIcon />;
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* 政策介绍 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(45deg, #f5f7fa 0%, #e4e8f0 100%)',
          borderRadius: 2
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            政策介绍
          </Typography>
          {info.policyUrl && (
            <Button
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              href={info.policyUrl}
              target="_blank"
            >
              查看政策原文
            </Button>
          )}
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {info.description}
        </Typography>
      </Paper>

      {/* 政策对象 */}
      {info.policyTarget && (
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
            政策对象
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {info.policyTarget}
          </Typography>
        </Paper>
      )}

      {/* 申报要求 */}
      {info.requirements && (
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
            申报要求
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {info.requirements}
          </Typography>
        </Paper>
      )}

      {/* 政策福利 */}
      {info.benefits && (
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
            政策福利
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {info.benefits}
          </Typography>
        </Paper>
      )}

      {/* 申报材料 */}
      {info.policyMaterials && info.policyMaterials.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: 'linear-gradient(45deg, #f5f7fa 0%, #e4e8f0 100%)',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            申报材料
          </Typography>
          <Stack spacing={1}>
            {info.policyMaterials.map((material, index) => (
              <Box key={index}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {getFileIcon(material.type)}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">
                      {material.title}
                    </Typography>
                    {material.description && (
                      <Typography variant="body2" color="text.secondary">
                        {material.description}
                      </Typography>
                    )}
                  </Box>
                  <IconButton
                    href={material.url}
                    download
                    size="small"
                  >
                    <DownloadIcon />
                  </IconButton>
                </Stack>
                {index < info.policyMaterials!.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default PolicyDetail; 