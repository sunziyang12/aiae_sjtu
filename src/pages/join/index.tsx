import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Divider,
  Alert,
  Fade,
  Zoom,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BiotechIcon from '@mui/icons-material/Biotech';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

// 入库类型
const ENTRY_TYPES = [
  {
    id: 'project',
    title: '项目库',
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    description: '将您的创新项目加入平台项目库',
    requirements: ['项目具有创新性', '有明确的市场前景', '具备技术可行性'],
    color: '#4CAF50'
  },
  {
    id: 'talent',
    title: '人才库',
    icon: <PersonIcon sx={{ fontSize: 40 }} />,
    description: '将您的人才信息加入平台人才库',
    requirements: ['相关领域专业背景', '具备实践经验', '有良好的团队协作能力'],
    color: '#2196F3'
  },
  {
    id: 'investor',
    title: '投资者库',
    icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
    description: '将您的投资机构加入平台投资者库',
    requirements: ['具备投资资质', '有明确的投资方向', '能够提供资金支持'],
    color: '#FF9800'
  },
  {
    id: 'lab',
    title: '实验室入库',
    icon: <BiotechIcon sx={{ fontSize: 40 }} />,
    description: '将您的实验室加入平台实验室库',
    requirements: ['具备研究设施', '有专业研究团队', '有明确的研究方向'],
    color: '#9C27B0'
  }
];

// 申请步骤
const STEPS = ['选择入库类型', '填写基本信息', '提交申请材料'];

const JoinPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    title: '',
    description: '',
    experience: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // 处理表单变化
  const handleFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  // 处理文件上传
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  // 处理步骤切换
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // 获取当前选中类型的颜色
  const getSelectedTypeColor = () => {
    const type = ENTRY_TYPES.find(t => t.id === selectedType);
    return type ? type.color : theme.palette.primary.main;
  };

  // 渲染入库类型选择
  const renderTypeSelection = () => (
    <Grid container spacing={3}>
      {ENTRY_TYPES.map((type) => (
        <Grid item xs={12} md={6} key={type.id}>
          <Zoom in={true} style={{ transitionDelay: `${ENTRY_TYPES.indexOf(type) * 100}ms` }}>
            <Card
              elevation={hoveredCard === type.id ? 8 : 0}
              onClick={() => setSelectedType(type.id)}
              onMouseEnter={() => setHoveredCard(type.id)}
              onMouseLeave={() => setHoveredCard(null)}
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: (theme) => `1px solid ${selectedType === type.id ? type.color : theme.palette.divider}`,
                backgroundColor: (theme) => selectedType === type.id ? alpha(type.color, 0.05) : '#fff',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 24px ${alpha(type.color, 0.15)}`,
                  borderColor: type.color
                }
              }}
            >
              <CardContent>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  mb: 2
                }}>
                  <Box sx={{
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: (theme) => alpha(type.color, 0.1),
                    color: type.color,
                    mb: 2,
                    transition: 'all 0.3s',
                    transform: hoveredCard === type.id ? 'scale(1.1)' : 'scale(1)'
                  }}>
                    {type.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {type.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {type.description}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1}>
                  {type.requirements.map((req, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: type.color }} />
                      <Typography variant="body2">{req}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Zoom>
        </Grid>
      ))}
    </Grid>
  );

  // 渲染基本信息表单
  const renderBasicInfo = () => {
    // 根据选择的类型显示不同的表单字段
    const getFormFields = () => {
      const selectedTypeObj = ENTRY_TYPES.find(t => t.id === selectedType);
      const typeColor = selectedTypeObj ? selectedTypeObj.color : theme.palette.primary.main;

      switch (selectedType) {
        case 'project':
          return (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="项目名称"
                  value={formData.name}
                  onChange={handleFormChange('name')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="联系人"
                  value={formData.title}
                  onChange={handleFormChange('title')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="邮箱"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange('email')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="电话"
                  value={formData.phone}
                  onChange={handleFormChange('phone')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="所属机构"
                  value={formData.organization}
                  onChange={handleFormChange('organization')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="项目描述"
                  value={formData.description}
                  onChange={handleFormChange('description')}
                  multiline
                  rows={4}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="项目优势"
                  value={formData.experience}
                  onChange={handleFormChange('experience')}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
            </>
          );
        case 'talent':
          return (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="姓名"
                  value={formData.name}
                  onChange={handleFormChange('name')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="职称/职位"
                  value={formData.title}
                  onChange={handleFormChange('title')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="邮箱"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange('email')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="电话"
                  value={formData.phone}
                  onChange={handleFormChange('phone')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="所属机构"
                  value={formData.organization}
                  onChange={handleFormChange('organization')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="专业背景"
                  value={formData.description}
                  onChange={handleFormChange('description')}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="工作经验"
                  value={formData.experience}
                  onChange={handleFormChange('experience')}
                  multiline
                  rows={4}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
            </>
          );
        case 'investor':
          return (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="投资机构名称"
                  value={formData.name}
                  onChange={handleFormChange('name')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="联系人"
                  value={formData.title}
                  onChange={handleFormChange('title')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="邮箱"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange('email')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="电话"
                  value={formData.phone}
                  onChange={handleFormChange('phone')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="投资方向"
                  value={formData.description}
                  onChange={handleFormChange('description')}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="投资规模"
                  value={formData.experience}
                  onChange={handleFormChange('experience')}
                  multiline
                  rows={2}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
            </>
          );
        case 'lab':
          return (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="实验室名称"
                  value={formData.name}
                  onChange={handleFormChange('name')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="负责人"
                  value={formData.title}
                  onChange={handleFormChange('title')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="邮箱"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange('email')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="电话"
                  value={formData.phone}
                  onChange={handleFormChange('phone')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="所属机构"
                  value={formData.organization}
                  onChange={handleFormChange('organization')}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="研究方向"
                  value={formData.description}
                  onChange={handleFormChange('description')}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="实验室设施"
                  value={formData.experience}
                  onChange={handleFormChange('experience')}
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: typeColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: typeColor,
                      },
                    },
                  }}
                />
              </Grid>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <Fade in={true} timeout={500}>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            {getFormFields()}
          </Grid>
        </Stack>
      </Fade>
    );
  };

  // 渲染材料上传
  const renderMaterialUpload = () => {
    // 根据选择的类型显示不同的上传提示
    const getUploadHint = () => {
      switch (selectedType) {
        case 'project':
          return '请上传项目计划书、技术文档、市场分析等相关材料';
        case 'talent':
          return '请上传简历、学历证书、技能证书等相关材料';
        case 'investor':
          return '请上传投资资质证明、投资案例、机构介绍等相关材料';
        case 'lab':
          return '请上传实验室资质证明、设备清单、研究成果等相关材料';
        default:
          return '请上传相关证明材料';
      }
    };

    const typeColor = getSelectedTypeColor();

    return (
      <Fade in={true} timeout={500}>
        <Stack spacing={3}>
          <Alert
            severity="info"
            sx={{
              mb: 2,
              borderLeft: `4px solid ${typeColor}`,
              '& .MuiAlert-icon': {
                color: typeColor
              }
            }}
          >
            {getUploadHint()}
          </Alert>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              backgroundColor: (theme) => alpha(typeColor, 0.02),
              border: '1px dashed',
              borderColor: typeColor,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: (theme) => alpha(typeColor, 0.05),
                transform: 'scale(1.01)'
              }
            }}
          >
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                component="span"
                variant="outlined"
                startIcon={<GroupAddIcon />}
                sx={{
                  mb: 2,
                  borderColor: typeColor,
                  color: typeColor,
                  '&:hover': {
                    borderColor: typeColor,
                    backgroundColor: alpha(typeColor, 0.1)
                  }
                }}
              >
                选择文件
              </Button>
            </label>
            <Typography variant="body2" color="text.secondary">
              支持 PDF、JPG、PNG 格式，单个文件不超过 10MB
            </Typography>
            {files.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Stack spacing={1}>
                  {files.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() => {
                        const newFiles = [...files];
                        newFiles.splice(index, 1);
                        setFiles(newFiles);
                      }}
                      sx={{
                        backgroundColor: alpha(typeColor, 0.1),
                        '& .MuiChip-deleteIcon': {
                          color: typeColor
                        }
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Paper>
        </Stack>
      </Fade>
    );
  };

  // 渲染当前步骤内容
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderTypeSelection();
      case 1:
        return renderBasicInfo();
      case 2:
        return renderMaterialUpload();
      default:
        return null;
    }
  };

  const typeColor = getSelectedTypeColor();

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      py: 4,
      backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.9) 100%)'
    }}>
      <Container maxWidth="lg">
        {/* 页面标题 */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 2,
            textAlign: 'center',
            background: (theme) => `linear-gradient(45deg, ${alpha(typeColor, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${typeColor}, ${theme.palette.secondary.main})`
            }
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: typeColor }}>
            加入平台
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            欢迎加入我们的创新研究平台。您可以选择将项目、人才、投资机构或实验室加入我们的平台。
          </Typography>
        </Paper>

        {/* 步骤进度 */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            border: `1px solid ${alpha(typeColor, 0.2)}`
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            sx={{
              '& .MuiStepLabel-root .Mui-active': {
                color: typeColor
              },
              '& .MuiStepLabel-root .Mui-completed': {
                color: typeColor
              },
              '& .MuiStepConnector-line': {
                borderColor: alpha(typeColor, 0.3)
              }
            }}
          >
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* 步骤内容 */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            border: `1px solid ${alpha(typeColor, 0.2)}`,
            boxShadow: `0 4px 20px ${alpha(typeColor, 0.1)}`
          }}
        >
          {renderStepContent()}

          {/* 操作按钮 */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{
                borderColor: typeColor,
                color: typeColor,
                '&:hover': {
                  borderColor: typeColor,
                  backgroundColor: alpha(typeColor, 0.1)
                }
              }}
            >
              上一步
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && !selectedType) ||
                (activeStep === 2 && files.length === 0)
              }
              endIcon={activeStep === STEPS.length - 1 ? <SendIcon /> : <ArrowForwardIcon />}
              sx={{
                backgroundColor: typeColor,
                '&:hover': {
                  backgroundColor: typeColor,
                  filter: 'brightness(1.1)'
                }
              }}
            >
              {activeStep === STEPS.length - 1 ? '提交申请' : '下一步'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default JoinPage; 