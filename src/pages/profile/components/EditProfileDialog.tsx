import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import styles from '../styles/ProfilePage.module.css';

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  userData: {
    name: string;
    role: string;
    avatar: string;
  };
  onSave: (data: any) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onClose,
  userData,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    role: userData.role,
    avatar: userData.avatar,
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className={styles.dialog}>
      <DialogTitle>编辑个人资料</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="姓名"
            fullWidth
            value={formData.name}
            onChange={handleChange('name')}
          />
          <TextField
            label="职位"
            fullWidth
            value={formData.role}
            onChange={handleChange('role')}
          />
          <TextField
            label="头像URL"
            fullWidth
            value={formData.avatar}
            onChange={handleChange('avatar')}
            helperText="请输入头像图片的URL地址"
          />
        </Stack>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSubmit} variant="contained">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog; 