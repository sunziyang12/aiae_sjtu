import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Alert,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  SelectChangeEvent
} from '@mui/material';
import {
  Send as SendIcon,
  Description as DescriptionIcon,
  ContactMail as ContactMailIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import styles from './styles/MediaPage.module.css';

// 媒体类型选项
const mediaTypes = [
  { value: 'news', label: '新闻报道' },
  { value: 'interview', label: '专访' },
  { value: 'press', label: '新闻发布会' },
  { value: 'feature', label: '专题报道' },
  { value: 'other', label: '其他' }
];

// 行业领域选项
const industryFields = [
  { value: 'ai', label: '人工智能' },
  { value: 'biotech', label: '生物技术' },
  { value: 'energy', label: '能源环境' },
  { value: 'material', label: '新材料' },
  { value: 'medical', label: '医疗健康' },
  { value: 'other', label: '其他' }
];

// 处理步骤
const steps = ['填写基本信息', '提供项目详情', '提交申请'];

const MediaPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    position: '',
    email: '',
    phone: '',
    mediaType: '',
    industryField: '',
    projectTitle: '',
    projectDescription: '',
    expectedDate: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));

    // 清除错误
    if (errors[name as string]) {
      setErrors(prev => ({
        ...prev,
        [name as string]: false
      }));
    }
  };

  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};

    if (activeStep === 0) {
      if (!formData.name) newErrors.name = true;
      if (!formData.email) newErrors.email = true;
      if (!formData.phone) newErrors.phone = true;
    } else if (activeStep === 1) {
      if (!formData.mediaType) newErrors.mediaType = true;
      if (!formData.projectTitle) newErrors.projectTitle = true;
      if (!formData.projectDescription) newErrors.projectDescription = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理下一步
  const handleNext = () => {
    if (validateForm()) {
      setActiveStep(prev => prev + 1);
    }
  };

  // 处理上一步
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  // 处理表单提交
  const handleSubmit = () => {
    if (validateForm()) {
      // 模拟提交
      console.log('提交的数据:', formData);

      // 显示成功消息
      setSnackbar({
        open: true,
        message: '您的申请已成功提交，我们的团队将尽快与您联系！',
        severity: 'success'
      });

      // 重置表单
      setFormData({
        name: '',
        organization: '',
        position: '',
        email: '',
        phone: '',
        mediaType: '',
        industryField: '',
        projectTitle: '',
        projectDescription: '',
        expectedDate: '',
        additionalInfo: ''
      });

      // 重置步骤
      setActiveStep(0);
    }
  };

  // 关闭提示消息
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // 渲染步骤内容
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="您的姓名"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                helperText={errors.name ? '请输入您的姓名' : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="所属机构"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="职位"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="电子邮箱"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                helperText={errors.email ? '请输入有效的电子邮箱' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="联系电话"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                helperText={errors.phone ? '请输入您的联系电话' : ''}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={errors.mediaType}>
                <InputLabel>媒体类型</InputLabel>
                <Select
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleChange}
                  label="媒体类型"
                >
                  {mediaTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.mediaType && <FormHelperText>请选择媒体类型</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>行业领域</InputLabel>
                <Select
                  name="industryField"
                  value={formData.industryField}
                  onChange={handleChange}
                  label="行业领域"
                >
                  {industryFields.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="项目/活动标题"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                error={errors.projectTitle}
                helperText={errors.projectTitle ? '请输入项目或活动标题' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="项目/活动描述"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                error={errors.projectDescription}
                helperText={errors.projectDescription ? '请简要描述您的项目或活动' : ''}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="期望报道日期"
                name="expectedDate"
                type="date"
                value={formData.expectedDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="补充信息"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                multiline
                rows={3}
                helperText="如有其他需要补充的信息，请在此处填写"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              请确认您的申请信息
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              请检查以下信息是否准确。提交后，我们的团队将尽快与您联系。
            </Typography>

            <Paper variant="outlined" sx={{ p: 3, mt: 3, textAlign: 'left' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">姓名</Typography>
                  <Typography variant="body1">{formData.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">机构</Typography>
                  <Typography variant="body1">{formData.organization || '未填写'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">电子邮箱</Typography>
                  <Typography variant="body1">{formData.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">联系电话</Typography>
                  <Typography variant="body1">{formData.phone}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">媒体类型</Typography>
                  <Typography variant="body1">
                    {mediaTypes.find(type => type.value === formData.mediaType)?.label || '未选择'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">行业领域</Typography>
                  <Typography variant="body1">
                    {industryFields.find(field => field.value === formData.industryField)?.label || '未选择'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">项目/活动标题</Typography>
                  <Typography variant="body1">{formData.projectTitle}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">项目/活动描述</Typography>
                  <Typography variant="body1">{formData.projectDescription}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      default:
        return '未知步骤';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        寻求报道
      </Typography>

      <Grid container spacing={4}>
        {/* 左侧表单 */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                上一步
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                endIcon={activeStep === steps.length - 1 ? <SendIcon /> : null}
              >
                {activeStep === steps.length - 1 ? '提交申请' : '下一步'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* 右侧信息 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                关于寻求报道
              </Typography>
              <Typography variant="body2" paragraph>
                我们欢迎各类科技创新项目、研究成果和行业动态的报道申请。通过我们的媒体平台，您的项目将获得更广泛的关注和传播。
              </Typography>
              <Typography variant="body2">
                提交申请后，我们的编辑团队将在3个工作日内与您联系，讨论报道细节。
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ContactMailIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                联系方式
              </Typography>
              <Typography variant="body2" paragraph>
                如有任何疑问，请通过以下方式联系我们：
              </Typography>
              <Typography variant="body2">
                邮箱：media@aiae-platform.com
              </Typography>
              <Typography variant="body2">
                电话：+86 123 4567 8900
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MediaPage; 