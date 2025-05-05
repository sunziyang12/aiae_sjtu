/**
 * 信息管理页面 (InformationPage)
 * 
 * 功能描述：
 * 1. 展示和管理各类信息（活动、讲座、课程等）
 * 2. 提供信息筛选和搜索功能
 * 3. 支持信息的分页展示
 * 4. 提供信息的收藏和分享功能
 * 5. 支持信息的订阅设置
 * 
 * 主要组件：
 * - InfoTypeFilter: 信息类型过滤
 * - InfoSearchFilter: 搜索和高级过滤
 * - InfoCard: 信息卡片展示
 * - InfoPagination: 分页控制
 * - InfoDetailDialog: 信息详情对话框
 * - SubscriptionDialog: 订阅设置对话框
 * 
 * 数据流：
 * 1. 从 mockData 获取初始数据
 * 2. 使用 useInfoFilter 进行数据过滤
 * 3. 通过 InfoCard 展示过滤后的数据
 * 4. 用户操作（收藏、分享、订阅）通过回调函数处理
 * 
 * 状态管理：
 * - 使用 React Hooks 管理组件状态
 * - 使用 Context 管理全局状态（如主题、用户信息）
 * 
 * 注意事项：
 * 1. 确保数据加载时的加载状态处理
 * 2. 处理空数据状态的展示
 * 3. 优化大数据量下的性能
 * 4. 确保用户操作的及时反馈
 */

import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Stack,
  Grid,
  Snackbar,
  Alert,
  useTheme,
  AlertColor,
  Button
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoTypeFilter from './components/InfoTypeFilter';
import { InfoCard } from './components/InfoCard';
import InfoDetailDialog from './components/InfoDetailDialog/InfoDetailDialog';
import InfoSearchFilter from './components/InfoSearchFilter';
import { InfoPagination } from './components/InfoPagination';
import { EmptyState } from './components/EmptyState';
import { InfoItem, categories, userFavorites, userRegistrations, RegistrationForm } from './types/index';
import { mockInfoItems } from './data/mockData';
import { useInfoFilter } from './hooks/useInfoFilter';
import SubscriptionDialog, { SubscriptionSettings } from './components/SubscriptionDialog';

const ITEMS_PER_PAGE = 6;

export const InformationPage: React.FC = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<InfoItem | null>(null);
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const {
    filteredInfo,
    filterOptions,
    updateFilter
  } = useInfoFilter(mockInfoItems);

  const pageCount = Math.ceil(filteredInfo.length / ITEMS_PER_PAGE);
  const currentItems = filteredInfo.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 处理分类变更
  const handleTypeChange = useCallback((type: string) => {
    updateFilter({ selectedType: type, selectedSubType: '' });
    setCurrentPage(1);
  }, [updateFilter]);

  const handleSubTypeChange = useCallback((subType: string) => {
    updateFilter({ selectedSubType: subType });
    setCurrentPage(1);
  }, [updateFilter]);

  // 处理收藏
  const handleFavorite = useCallback(async (id: string) => {
    try {
      if (userFavorites.has(id)) {
        userFavorites.delete(id);
        setSnackbar({
          open: true,
          message: '已取消收藏',
          severity: 'success'
        });
      } else {
        userFavorites.add(id);
        setSnackbar({
          open: true,
          message: '收藏成功',
          severity: 'success'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: '操作失败，请重试',
        severity: 'error'
      });
    }
  }, []);

  // 处理分享
  const handleShare = useCallback(async (id: string) => {
    try {
      const shareUrl = `${window.location.origin}${window.location.pathname}?id=${id}`;
      await navigator.clipboard.writeText(shareUrl);
      setSnackbar({
        open: true,
        message: '链接已复制到剪贴板',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: '分享失败，请重试',
        severity: 'error'
      });
    }
  }, []);

  // 处理报名
  const handleRegister = useCallback(async (id: string, formData: RegistrationForm) => {
    try {
      // 这里应该调用后端 API 处理报名
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      userRegistrations.add(id);
      setSnackbar({
        open: true,
        message: '报名成功',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: '报名失败，请重试',
        severity: 'error'
      });
      throw error; // 向上传递错误，让表单组件处理
    }
  }, []);

  // 处理订阅
  const handleSubscribe = useCallback(async (settings: SubscriptionSettings) => {
    try {
      // 这里应该调用后端 API 处理订阅
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSnackbar({
        open: true,
        message: '订阅设置已保存',
        severity: 'success'
      });
      setIsSubscriptionDialogOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: '订阅失败，请重试',
        severity: 'error'
      });
    }
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: theme.palette.background.default,
      py: 4
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <InfoTypeFilter
                      selectedType={filterOptions.selectedType}
                      selectedSubType={filterOptions.selectedSubType}
                      onTypeChange={handleTypeChange}
                      onSubTypeChange={handleSubTypeChange}
                      categories={categories}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<NotificationsIcon />}
                      onClick={() => setIsSubscriptionDialogOpen(true)}
                    >
                      订阅设置
                    </Button>
                  </Box>
                  <InfoSearchFilter
                    searchText={filterOptions.searchText}
                    onSearchChange={(text) => updateFilter({ searchText: text })}
                    sortBy={filterOptions.sortBy}
                    onSortChange={(sort) => updateFilter({ sortBy: sort })}
                    timeRange={filterOptions.timeRange}
                    onTimeRangeChange={(range) => updateFilter({ timeRange: range })}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              {currentItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <InfoCard
                    info={item}
                    onClick={() => setSelectedItem(item)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {filteredInfo.length === 0 && (
            <Grid item xs={12}>
              <EmptyState />
            </Grid>
          )}

          {filteredInfo.length > 0 && (
            <Grid item xs={12}>
              <InfoPagination
                currentPage={currentPage}
                totalPages={pageCount}
                onPageChange={setCurrentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredInfo.length}
              />
            </Grid>
          )}
        </Grid>

        <InfoDetailDialog
          open={!!selectedItem}
          info={selectedItem}
          onClose={() => setSelectedItem(null)}
          onFavorite={handleFavorite}
          onShare={handleShare}
          onRegister={handleRegister}
        />

        <SubscriptionDialog
          open={isSubscriptionDialogOpen}
          onClose={() => setIsSubscriptionDialogOpen(false)}
          onSubscribe={handleSubscribe}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default InformationPage;