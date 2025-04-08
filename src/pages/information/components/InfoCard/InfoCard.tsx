/**
 * 信息卡片组件 (InfoCard)
 * 
 * 功能描述：
 * 1. 展示信息的概要内容，包括标题、日期、标签等
 * 2. 提供信息的收藏和分享功能
 * 3. 点击卡片可查看详细信息
 * 
 * 组件结构：
 * - Card: Material-UI 卡片容器
 * - CardMedia: 展示信息图片（如果有）
 * - CardContent: 展示信息内容
 *   - 标题
 *   - 日期
 *   - 标签列表
 *   - 描述
 * - InfoActions: 操作按钮组件
 * 
 * Props:
 * @param {InfoItem} info - 信息项数据
 * @param {() => void} onClick - 点击卡片时的回调函数
 * 
 * 数据流：
 * 1. 接收父组件传入的信息数据
 * 2. 展示信息的各项内容
 * 3. 通过 InfoActions 处理用户操作
 * 
 * 状态管理：
 * - 使用 userFavorites 判断收藏状态
 * - 通过 Props 接收回调函数处理用户操作
 * 
 * 注意事项：
 * 1. 确保图片加载失败时的错误处理
 * 2. 长文本的截断显示
 * 3. 响应式布局适配
 * 4. 性能优化（使用 React.memo）
 */

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  CardActionArea
} from '@mui/material';
import { InfoItem, userFavorites } from '../../types/index';
import { InfoActions } from '../InfoActions/InfoActions';

/**
 * InfoCard组件的属性接口
 * @interface InfoCardProps
 * @property {InfoItem} info - 信息项数据，包含标题、日期、描述等信息
 * @property {() => void} onClick - 点击卡片时的回调函数
 */
interface InfoCardProps {
  info: InfoItem;
  onClick: () => void;
}

/**
 * 信息卡片组件
 * @component InfoCard
 * @param {InfoCardProps} props - 组件属性
 * @returns {JSX.Element} 渲染的信息卡片
 */
export const InfoCard: React.FC<InfoCardProps> = ({ info, onClick }) => {
  /**
   * 检查当前信息是否被收藏
   * @type {boolean}
   */
  const isFavorited = userFavorites.has(info.id);

  /**
   * 处理收藏按钮点击事件
   * @function handleFavorite
   * @returns {void}
   */
  const handleFavorite = () => {
    if (isFavorited) {
      userFavorites.delete(info.id);
    } else {
      userFavorites.add(info.id);
    }
  };

  // 获取图片URL
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={onClick} sx={{ flex: 1 }}>
        {info.image && (
          <CardMedia
            component="img"
            height="140"
            image={info.image}
            alt={info.title}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {info.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {info.date}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {info.tags?.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary" noWrap>
            {info.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <InfoActions
          info={info}
          onFavorite={handleFavorite}
          isFavorited={isFavorited}
        />
      </Box>
    </Card>
  );
}; 