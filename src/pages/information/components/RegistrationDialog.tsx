
  
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { InfoItem, RegistrationForm } from '../types';

interface RegistrationDialogProps {
  open: boolean;
  info: InfoItem;
  onClose: () => void;
  onSubmit: (form: RegistrationForm) => Promise<void>;
}

export const RegistrationDialog: React.FC<RegistrationDialogProps> = ({
  open,
  info,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<RegistrationForm>({
    name: '',
    phone: '',
    email: '',
    organization: '',
    remark: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 0, pr: 6 }}>
        <Typography variant="h6" component="div">
          报名 - {info.title}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            required
            label="姓名"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            required
            label="手机号码"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <TextField
            required
            label="邮箱"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="单位/组织"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
          <TextField
            label="备注"
            multiline
            rows={3}
            value={form.remark}
            onChange={(e) => setForm({ ...form, remark: e.target.value })}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>取消</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!form.name || !form.phone || !form.email || submitting}
        >
          {submitting ? '提交中...' : '提交报名'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationDialog; // This is the default export