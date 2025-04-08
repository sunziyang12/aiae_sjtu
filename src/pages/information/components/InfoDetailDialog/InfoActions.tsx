import React from 'react';
import {
  DialogActions,
  Stack,
  Button,
  Box,
  useTheme,
  alpha,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { InfoItem } from '../../types';

interface InfoActionsProps {
  info: InfoItem;
  isFavorited: boolean;
  loading: boolean;
  onFavorite: () => void;
  onShare: () => void;
  onRegister: () => void;
}

export const InfoActions: React.FC<InfoActionsProps> = ({
  info,
  isFavorited,
  loading,
  onFavorite,
  onShare,
  onRegister,
}) => {
  const theme = useTheme();

  return (
    <DialogActions
      sx={{
        px: 3,
        py: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: alpha(theme.palette.primary.main, 0.02)
      }}
    >
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Button
          startIcon={isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          variant="outlined"
          onClick={onFavorite}
          disabled={loading}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          {isFavorited ? '取消收藏' : '收藏'}
        </Button>
        <Button
          startIcon={<ShareIcon />}
          variant="outlined"
          onClick={onShare}
          disabled={loading}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          分享
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          startIcon={<AssignmentIcon />}
          onClick={onRegister}
          disabled={loading}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 120
          }}
        >
          {info.type === '政策' ? '一键填报' : '一键报名'}
        </Button>
      </Stack>
    </DialogActions>
  );
};

export default InfoActions; 