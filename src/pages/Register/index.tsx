import React, { useState, FormEvent, ChangeEvent } from 'react';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Button,
  TextField,
  Divider,
  Paper,
  Alert,
} from '@mui/material';

export default function RegisterPage() {
  const navigate = useNavigate();
  
  type FormErrors = {
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    captcha?: string;
    general?: string;
  };

  const [registerMode, setRegisterMode] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company: '',
    captcha: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);

  // 表单验证逻辑
  const validate = () => {
    let validationErrors: FormErrors = {};
    
    // 用户名验证
    if (!formData.name.trim()) {
      validationErrors.name = '请输入用户名';
    }
    
    // 手机号/邮箱校验逻辑
    if (registerMode === 'phone') {
      if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        validationErrors.phone = '请输入正确手机号';
      }
    } else {
      // 更严格的邮箱格式验证
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        validationErrors.email = '请输入正确邮箱格式';
      }
    }
    
    // 密码强度校验
    if (formData.password.length < 8) {
      validationErrors.password = '密码需至少8位';
    } else if (!/[A-Z]/.test(formData.password)) {
      validationErrors.password = '需包含大写字母';
    }
    
    // 确认密码校验
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    // 验证码校验（如果有验证码字段）
    if (formData.captcha && !/^\d{6}$/.test(formData.captcha)) {
      validationErrors.captcha = '请输入6位数字验证码';
    }
    
    return validationErrors;
  };

  // 发送验证码
  const sendCaptcha = async () => {
    // 验证手机号或邮箱
    let currentErrors = {...errors};
    let hasError = false;
    
    if (registerMode === 'phone') {
      if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        currentErrors.phone = '请输入正确手机号';
        hasError = true;
      } else {
        delete currentErrors.phone;
      }
    } else {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        currentErrors.email = '请输入正确邮箱格式';
        hasError = true;
      } else {
        delete currentErrors.email;
      }
    }
    
    if (hasError) {
      setErrors(currentErrors);
      return;
    }

    setCaptchaLoading(true);
    try {
      // 发送验证码请求
      const response = await fetch('/api/send-captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: registerMode,
          [registerMode]: registerMode === 'phone' ? formData.phone : formData.email
        }),
      });

      if (!response.ok) {
        throw new Error('验证码发送失败');
      }
      
      alert('验证码已发送');
    } catch (error) {
      alert('验证码发送失败，请重试');
    } finally {
      setCaptchaLoading(false);
    }
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '注册失败');
      }

      navigate('/login?registered=true');
    } catch (err) {
      setErrors({
        ...errors,
        general: err instanceof Error ? err.message : '注册失败'
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
            创建新账号
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            已有账号？{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              立即登录
            </Link>
          </p>
        </div>

        {/* 注册模式切换 */}
        <div className="flex rounded-md shadow-sm mt-4">
          <button
            type="button"
            onClick={() => setRegisterMode('email')}
            className={`flex-1 py-3 px-6 text-base font-medium rounded-l-lg border-2 ${registerMode === 'email' 
              ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-700' 
              : 'bg-white text-blue-600 border-blue-600 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400'}`}
          >
            邮箱注册
          </button>
          <button
            type="button"
            onClick={() => setRegisterMode('phone')}
            className={`flex-1 py-3 px-6 text-base font-medium rounded-r-lg border-2 ${registerMode === 'phone' 
              ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-700' 
              : 'bg-white text-blue-600 border-blue-600 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400'}`}
          >
            手机号注册
          </button>
        </div>

        <form className="mt-6 space-y-6 flex flex-col items-center" onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ width: '30%' }}>
            {/* 用户名输入框 */}
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              label="用户名"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
              variant="outlined"
            />

            {/* 邮箱/手机号输入框 */}
            {registerMode === 'email' ? (
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
            ) : (
              <TextField
                required
                fullWidth
                id="phone"
                name="phone"
                label="手机号码"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={!!errors.phone}
                helperText={errors.phone}
                variant="outlined"
              />
            )}

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
              helperText={errors.password || '至少8位，包含大写字母'}
              variant="outlined"
            />

            {/* 确认密码输入框 */}
            <TextField
              required
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="确认密码"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              variant="outlined"
            />

            {/* 验证码输入框 */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                sx={{ flexGrow: 1 }}
                id="captcha"
                name="captcha"
                label="验证码"
                value={formData.captcha}
                onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
                error={!!errors.captcha}
                helperText={errors.captcha}
                variant="outlined"
                inputProps={{ maxLength: 6 }}
              />
              <Button
                variant="contained"
                onClick={sendCaptcha}
                disabled={captchaLoading}
                sx={{ minWidth: 120, height: 56 }}
              >
                {captchaLoading ? '发送中...' : '获取验证码'}
              </Button>
            </Box>

            {/* 公司名称输入框 */}
            <TextField
              fullWidth
              id="company"
              name="company"
              label="公司名称（选填）"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              variant="outlined"
            />
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
                <>
                  注册
                  <Box
                    component="svg"
                    sx={{
                      width: 14,
                      height: 14,
                      transition: 'transform 0.2s',
                      '.group:hover &': {
                        transform: 'translateX(4px)'
                      }
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </Box>
                </>
              )}
            </Button>
          </Box>
        </form>

        <Box sx={{ width: '30%', mt: 6, position: 'relative' }}>
          <Divider>
            <Typography variant="body2" color="text.secondary">
              其他注册方式
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
                微信注册
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
                QQ注册
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}