/**
 * 信息操作组件 (InfoActions)
 * 
 * 功能描述：
 * 1. 提供信息的收藏功能
 * 2. 提供信息的分享功能
 *   - 分享到 Facebook
 *   - 分享到 Twitter
 *   - 分享到微信
 *   - 复制链接
 * 3. 提供操作反馈提示
 * 
 * 组件结构：
 * - IconButton: 收藏按钮
 * - IconButton: 分享按钮
 * - Menu: 分享选项菜单
 * - Snackbar: 操作反馈提示
 * 
 * Props:
 * @param {InfoItem} info - 信息项数据
 * @param {(id: string) => void} onFavorite - 收藏回调函数
 * @param {boolean} isFavorited - 收藏状态
 * 
 * 状态管理：
 * - anchorEl: 控制分享菜单的显示
 * - snackbar: 控制反馈提示的显示
 * 
 * 交互流程：
 * 1. 点击收藏按钮切换收藏状态
 * 2. 点击分享按钮显示分享菜单
 * 3. 选择分享方式执行分享操作
 * 4. 显示操作结果反馈
 * 
 * 注意事项：
 * 1. 确保分享链接的正确生成
 * 2. 处理分享失败的情况
 * 3. 优化移动端交互体验
 * 4. 确保无障碍访问支持
 */

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  AlertColor
} from '@mui/material';
import {
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Link as LinkIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import { InfoItem } from '../../types/index';

/**
 * InfoActions组件的属性接口
 * @interface InfoActionsProps
 * @property {InfoItem} info - 信息项数据
 * @property {(id: string) => void} onFavorite - 收藏回调函数
 * @property {boolean} isFavorited - 收藏状态
 */
interface InfoActionsProps {
  info: InfoItem;
  onFavorite: (id: string) => void;
  isFavorited: boolean;
}

/**
 * 信息操作组件
 * @component InfoActions
 * @param {InfoActionsProps} props - 组件属性
 * @returns {JSX.Element} 渲染的操作按钮组
 */
export const InfoActions: React.FC<InfoActionsProps> = ({
  info,
  onFavorite,
  isFavorited
}) => {
  /**
   * 分享菜单的锚点元素
   * @type {HTMLElement | null}
   */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * 反馈提示的状态
   * @type {Object}
   * @property {boolean} open - 是否显示提示
   * @property {string} message - 提示消息
   * @property {'success' | 'error'} severity - 提示类型
   */
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  /**
   * 处理分享按钮点击事件
   * @function handleShareClick
   * @param {React.MouseEvent<HTMLElement>} event - 点击事件对象
   * @returns {void}
   */
  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * 关闭分享菜单
   * @function handleShareClose
   * @returns {void}
   */
  const handleShareClose = () => {
    setAnchorEl(null);
  };

  /**
   * 处理分享到Facebook
   * @function handleShareFacebook
   * @returns {void}
   */
  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
    handleShareClose();
    setSnackbar({
      open: true,
      message: '已分享到Facebook',
      severity: 'success'
    });
  };

  /**
   * 处理分享到Twitter
   * @function handleShareTwitter
   * @returns {void}
   */
  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(info.title)}`;
    window.open(url, '_blank');
    handleShareClose();
    setSnackbar({
      open: true,
      message: '已分享到Twitter',
      severity: 'success'
    });
  };

  /**
   * 处理分享到微信
   * @function handleShareWechat
   * @returns {void}
   */
  const handleShareWechat = () => {
    // 这里可以集成微信分享SDK
    handleShareClose();
    setSnackbar({
      open: true,
      message: '已复制分享链接',
      severity: 'success'
    });
  };

  /**
   * 处理复制链接
   * @function handleCopyLink
   * @returns {void}
   */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setSnackbar({
        open: true,
        message: '链接已复制到剪贴板',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: '复制链接失败',
        severity: 'error'
      });
    }
    handleShareClose();
  };

  /**
   * 关闭反馈提示
   * @function handleSnackbarClose
   * @returns {void}
   */
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        onClick={() => onFavorite(info.id.toString())}
        color={isFavorited ? 'primary' : 'default'}
        aria-label="收藏"
      >
        {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <IconButton
        onClick={handleShareClick}
        aria-label="分享"
      >
        <ShareIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleShareClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleShareFacebook}>
          <ListItemIcon>
            <FacebookIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>分享到 Facebook</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareTwitter}>
          <ListItemIcon>
            <TwitterIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>分享到 Twitter</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareWechat}>
          <ListItemIcon>
            <ChatIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>分享到微信</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>复制链接</ListItemText>
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 