import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  useTheme,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { InfoItem, RegistrationForm } from '../../types/index';
import { RegistrationDialog } from '../RegistrationDialog';
import InfoHeader from './InfoHeader';
import InfoSideCard from './InfoSideCard';
import InfoActions from './InfoActions';
import ActivityDetail from './ActivityDetail';
import LectureDetail from './LectureDetail';
import PolicyDetail from './PolicyDetail';

interface InfoDetailDialogProps {
  open: boolean;
  info: InfoItem | null;
  onClose: () => void;
  onFavorite: (id: string) => Promise<void>;
  onShare: (id: string) => Promise<void>;
  onRegister: (id: string, form: RegistrationForm) => Promise<void>;
}

const InfoDetailDialog: React.FC<InfoDetailDialogProps> = ({
  open,
  info,
  onClose,
  onFavorite,
  onShare,
  onRegister
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = useState(false);

  if (!info) return null;

  const handleFavorite = () => {
    setLoading(true);
    // 模拟收藏操作
    setTimeout(() => {
      setIsFavorited(!isFavorited);
      setLoading(false);
    }, 500);
  };

  const handleShare = () => {
    // 实现分享功能
    console.log('分享信息:', info);
  };

  const handleRegister = () => {
    setIsRegistrationDialogOpen(true);
  };

  const handleRegistrationSubmit = async (form: RegistrationForm) => {
    try {
      await onRegister(info.id, form);
      setIsRegistrationDialogOpen(false);
    } catch (error) {
      // 错误处理已经在 onRegister 中完成 
    }
  };

  const renderDetailContent = () => {
    switch (info.type) {
      case '活动':
        return <ActivityDetail info={info} />;
      case '讲座':
        return <LectureDetail info={info} />;
      case '政策':
        return <PolicyDetail info={info} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            minHeight: '80vh',
          },
        }}
      >
        <InfoHeader info={info} onClose={onClose} />

        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {renderDetailContent()}
            </Grid>

            <Grid item xs={12} md={4}>
              <InfoSideCard info={info} />
            </Grid>
          </Grid>
        </DialogContent>

        <InfoActions
          info={info}
          isFavorited={isFavorited}
          loading={loading}
          onFavorite={handleFavorite}
          onShare={handleShare}
          onRegister={handleRegister}
        />
      </Dialog>

      <RegistrationDialog
        open={isRegistrationDialogOpen}
        info={info}
        onClose={() => setIsRegistrationDialogOpen(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </>
  );
};

export default InfoDetailDialog; 