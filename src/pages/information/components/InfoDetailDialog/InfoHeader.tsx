import React from 'react';
import {
  DialogTitle,
  Box,
  Stack,
  Typography,
  Chip,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { InfoItem } from '../../types';

interface InfoHeaderProps {
  info: InfoItem;
  onClose: () => void;
}

export const InfoHeader: React.FC<InfoHeaderProps> = ({ info, onClose }) => {
  const theme = useTheme();

  return (
    <>
      <DialogTitle
        sx={{
          p: 0,
          position: 'relative',
          height: 200,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
          backgroundImage: 'url(https://example.com/policy-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)'
          }
        }}
      >
        <Box sx={{ position: 'relative', height: '100%', p: 3 }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: 'white'
            }}
          >
            <CloseIcon />
          </IconButton>

          <Stack
            spacing={2}
            sx={{
              height: '100%',
              justifyContent: 'flex-end'
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: 'white',
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {info.title}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                label={info.subType}
                size="small"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 500
                }}
              />
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                发布时间：{info.date}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </DialogTitle>
    </>
  );
};

export default InfoHeader; 