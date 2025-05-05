import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  Alert,
  Divider,
  Grid,
} from '@mui/material';

export default function LoginPage() {
  const navigate = useNavigate();
  
  type FormErrors = {
    email?: string;
    password?: string;
    general?: string;
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  // 表单验证逻辑
  const validate = () => {
    let validationErrors: FormErrors = {};
    
    // 邮箱校验逻辑
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      validationErrors.email = '请输入正确邮箱格式';
    }
    
    // 密码校验
    if (!formData.password) {
      validationErrors.password = '请输入密码';
    }
    
    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '登录失败');
      }

      navigate('/dashboard');
    } catch (err) {
      setErrors({
        ...errors,
        general: err instanceof Error ? (err.message.includes('密码') ? '密码错误' : err.message) : '密码错误'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="Logo"
              width={4}
              height={4}
              className="rounded-lg"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            登录账号
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            还没有账号？{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              立即注册
            </Link>
          </p>
        </div>

        <form className="mt-6 space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ width: '30%' }}>
            {/* 邮箱输入框 */}
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="邮箱地址"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
            />

            {/* 密码输入框 */}
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              label="密码"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                忘记密码？
              </Link>
            </Box>
          </Stack>

          {errors.general && (
            <Alert severity="error" sx={{ width: '30%' }}>
              {errors.general}
            </Alert>
          )}

          <Box sx={{ width: '30%' }}>
            <Button
              type="submit"
              disabled={loading}
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.02)'
                },
                '&:active': {
                  transform: 'scale(0.98)'
                }
              }}
            >
              {loading ? (
                <Box
                  component="span"
                  sx={{
                    width: 20,
                    height: 20,
                    border: 2,
                    borderColor: 'white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }}
                />
              ) : (
                '登录'
              )}
            </Button>
          </Box>
        </form>

        <Box sx={{ width: '30%', mt: 6, position: 'relative' }}>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              其他登录方式
            </Typography>
          </Divider>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  color: 'text.secondary',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                微信登录
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  color: 'text.secondary',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                QQ登录
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}