import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  MonetizationOn as MoneyIcon,
  Language as LanguageIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import InvestorCard from './components/InvestorCard';
import { mockInvestors } from './services/mockData';
import { Investor, InvestorType } from './types/investor';
import styles from './styles/InvestorsPage.module.css';

// 投资阶段选项
const investmentStages = [
  { value: 'all', label: '全部' },
  { value: 'angel', label: '天使轮' },
  { value: 'pre-a', label: 'Pre-A轮' },
  { value: 'a', label: 'A轮' },
  { value: 'b', label: 'B轮' },
  { value: 'c', label: 'C轮及以上' },
];

// 投资领域选项
const investmentAreas = [
  { value: 'all', label: '全部' },
  { value: 'ai', label: '人工智能' },
  { value: 'biotech', label: '生物科技' },
  { value: 'enterprise', label: '企业服务' },
  { value: 'consumer', label: '消费升级' },
  { value: 'hardware', label: '智能硬件' },
  { value: 'internet', label: '互联网' },
  { value: 'fintech', label: '金融科技' },
  { value: 'medical', label: '医疗健康' },
];

// 投资规模选项
const investmentSizes = [
  { value: 'all', label: '全部' },
  { value: '0-100', label: '100万以下' },
  { value: '100-500', label: '100-500万' },
  { value: '500-2000', label: '500-2000万' },
  { value: '2000+', label: '2000万以上' },
];

// 投资者类型选项
const investorTypes = [
  { value: 'all', label: '全部' },
  { value: InvestorType.GOVERNMENT, label: '政府基金' },
  { value: InvestorType.PRIVATE_EQUITY, label: '私募基金' },
  { value: InvestorType.INCUBATOR, label: '孵化器' },
  { value: InvestorType.INDIVIDUAL, label: '个人投资者' },
];

const InvestorsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [rightPanel, setRightPanel] = useState<'contact' | 'discussion' | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const handleInvestorClick = useCallback((investor: Investor) => {
    setSelectedInvestor(investor);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setSelectedInvestor(null);
    setRightPanel(null);
  }, []);

  const handleContactClick = useCallback(() => {
    setRightPanel('contact');
  }, []);

  const handleDiscussionClick = useCallback(() => {
    setRightPanel('discussion');
  }, []);

  const handleClosePanel = useCallback(() => {
    setRightPanel(null);
  }, []);

  const filteredInvestors = mockInvestors.filter(investor => {
    if (selectedType !== 'all' && investor.type !== selectedType) return false;
    if (selectedStage !== 'all' && !investor.stages.includes(selectedStage as any)) return false;
    if (selectedArea !== 'all' && !investor.areas.includes(selectedArea as any)) return false;
    if (selectedSize !== 'all' && !investor.sizes.includes(selectedSize as any)) return false;
    return true;
  });

  return (
    <Box className={styles.pageContainer}>
      <Container maxWidth="lg">
        {/* 筛选区域 */}
        <Box className={styles.filterSection}>
          <Grid container spacing={3}>
            {/* 投资者类型 */}
            <Grid item xs={12} md={3}>
              <Typography className={styles.filterTitle}>
                投资者类型
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                {investorTypes.map((type) => (
                  <Chip
                    key={type.value}
                    label={type.label}
                    onClick={() => setSelectedType(type.value)}
                    variant={selectedType === type.value ? "filled" : "outlined"}
                    color={selectedType === type.value ? "primary" : "default"}
                  />
                ))}
              </Stack>
            </Grid>

            {/* 投资阶段 */}
            <Grid item xs={12} md={3}>
              <Typography className={styles.filterTitle}>
                投资阶段
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                {investmentStages.map((stage) => (
                  <Chip
                    key={stage.value}
                    label={stage.label}
                    onClick={() => setSelectedStage(stage.value)}
                    variant={selectedStage === stage.value ? "filled" : "outlined"}
                    color={selectedStage === stage.value ? "primary" : "default"}
                  />
                ))}
              </Stack>
            </Grid>

            {/* 投资领域 */}
            <Grid item xs={12} md={3}>
              <Typography className={styles.filterTitle}>
                投资领域
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                {investmentAreas.map((area) => (
                  <Chip
                    key={area.value}
                    label={area.label}
                    onClick={() => setSelectedArea(area.value)}
                    variant={selectedArea === area.value ? "filled" : "outlined"}
                    color={selectedArea === area.value ? "primary" : "default"}
                  />
                ))}
              </Stack>
            </Grid>

            {/* 投资规模 */}
            <Grid item xs={12} md={3}>
              <Typography className={styles.filterTitle}>
                投资规模
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                {investmentSizes.map((size) => (
                  <Chip
                    key={size.value}
                    label={size.label}
                    onClick={() => setSelectedSize(size.value)}
                    variant={selectedSize === size.value ? "filled" : "outlined"}
                    color={selectedSize === size.value ? "primary" : "default"}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* 投资者列表 */}
        <Grid container spacing={3}>
          {filteredInvestors.map((investor) => (
            <Grid item xs={12} md={6} lg={4} key={investor.id}>
              <InvestorCard
                investor={investor}
                onClick={handleInvestorClick}
              />
            </Grid>
          ))}
        </Grid>

        {/* 投资者详情弹窗 */}
        <Dialog
          open={!!selectedInvestor}
          onClose={handleCloseDialog}
          maxWidth={rightPanel ? 'lg' : 'md'}
          fullWidth
        >
          {selectedInvestor && (
            <Box sx={{ display: 'flex' }}>
              {/* 主要内容区 */}
              <Box sx={{ flex: 1 }}>
                <DialogContent>
                  {/* 头部信息 */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <Avatar
                      src={selectedInvestor.avatar}
                      sx={{ width: 80, height: 80, mr: 3 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="h5">
                          {selectedInvestor.name}
                        </Typography>
                        {selectedInvestor.verificationStatus === 'verified' && (
                          <Box className={styles.verifiedBadge}>
                            <VerifiedIcon sx={{ fontSize: 16 }} />
                            已认证
                          </Box>
                        )}
                      </Box>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {selectedInvestor.organization} · {selectedInvestor.title}
                      </Typography>
                      <Box className={styles.typeTag}>
                        {investorTypes.find(t => t.value === selectedInvestor.type)?.label}
                      </Box>
                    </Box>
                  </Box>

                  {/* 操作按钮 */}
                  <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="primary"
                      onClick={handleContactClick}
                    >
                      一键联系
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="primary"
                      onClick={handleDiscussionClick}
                    >
                      公开讨论
                    </Button>
                  </Stack>

                  <Grid container spacing={3}>
                    {/* 基本信息 */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        基本信息
                      </Typography>
                      <Stack spacing={1} sx={{ color: 'text.secondary', mb: 2 }}>
                        <Box className={styles.infoItem}>
                          <BusinessIcon fontSize="small" />
                          <Typography variant="body2">
                            {selectedInvestor.organization}
                            {selectedInvestor.establishedYear && ` · ${selectedInvestor.establishedYear}年成立`}
                            {selectedInvestor.teamSize && ` · ${selectedInvestor.teamSize}人团队`}
                          </Typography>
                        </Box>
                        <Box className={styles.infoItem}>
                          <MoneyIcon fontSize="small" />
                          <Typography variant="body2">
                            投资范围：{selectedInvestor.sizes.map(size =>
                              investmentSizes.find(s => s.value === size)?.label
                            ).join('、')}
                          </Typography>
                        </Box>
                        <Box className={styles.infoItem}>
                          <LocationIcon fontSize="small" />
                          <Typography variant="body2">{selectedInvestor.location}</Typography>
                        </Box>
                        {selectedInvestor.website && (
                          <Box className={styles.infoItem}>
                            <LanguageIcon fontSize="small" />
                            <Typography variant="body2">{selectedInvestor.website}</Typography>
                          </Box>
                        )}
                      </Stack>
                    </Grid>

                    {/* 投资优势 */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        投资优势
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                        {selectedInvestor.advantages.map((advantage, index) => (
                          <Chip
                            key={index}
                            label={advantage}
                            sx={{
                              bgcolor: '#f0f7ff',
                              color: '#1a237e',
                            }}
                          />
                        ))}
                      </Stack>
                    </Grid>

                    {/* 投资简介 */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        投资简介
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {selectedInvestor.description}
                      </Typography>
                    </Grid>

                    {/* 投资案例 */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                        投资案例
                      </Typography>
                      <Stack spacing={2}>
                        {selectedInvestor.portfolio.map((item, index) => (
                          <Box key={index} className={styles.portfolioCard}>
                            <Box className={styles.portfolioHeader}>
                              <Typography variant="subtitle2">
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.date}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {investmentStages.find(s => s.value === item.stage)?.label} · {item.amount}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Box>

              {/* 右侧面板 */}
              {rightPanel && (
                <Box className={styles.contactPanel}>
                  {rightPanel === 'contact' ? (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">
                          联系投资人
                        </Typography>
                        <IconButton onClick={handleClosePanel} size="small">
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Stack spacing={3}>
                        <TextField
                          required
                          label="姓名"
                          fullWidth
                          size="small"
                        />
                        <TextField
                          required
                          label="联系电话"
                          fullWidth
                          size="small"
                        />
                        <TextField
                          required
                          label="电子邮箱"
                          fullWidth
                          size="small"
                          type="email"
                        />
                        <TextField
                          required
                          label="项目简介"
                          fullWidth
                          multiline
                          rows={4}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          发送
                        </Button>
                      </Stack>
                    </Box>
                  ) : (
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">
                          公开讨论
                        </Typography>
                        <IconButton onClick={handleClosePanel} size="small">
                          <CloseIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
                        {/* 讨论内容将在这里显示 */}
                      </Box>

                      <Box>
                        <Stack direction="row" spacing={1}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="发表评论..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                          />
                          <Button variant="contained">
                            发送
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default InvestorsPage; 