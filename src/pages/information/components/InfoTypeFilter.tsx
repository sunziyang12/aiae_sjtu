import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Stack,
  Chip,
} from '@mui/material';
import { Categories, Category } from '../types';// 从types.ts文件中导入Categories和Category类型

// 定义InfoTypeFilter组件的props类型
interface InfoTypeFilterProps {
  selectedType: string;
  selectedSubType: string;
  onTypeChange: (type: string) => void;
  onSubTypeChange: (subType: string) => void;
  categories: Categories;
}

// 定义InfoTypeFilter组件
export const InfoTypeFilter: React.FC<InfoTypeFilterProps> = ({
  selectedType,
  selectedSubType,
  onTypeChange,
  onSubTypeChange,
  categories
}) => {
  // 定义handleTypeChange函数，用于处理类型选择
  const handleTypeChange = (_: React.SyntheticEvent, newValue: string) => {
    // 直接传递选中的类型，不需要转换
    onTypeChange(newValue);
    onSubTypeChange('');
  };

  // 获取当前选中的分类
  const getCurrentCategory = () => {
    return categories[selectedType];
  };

  // 获取当前选中的类型（英文）
  const getCurrentType = () => {
    if (selectedType === 'all') return 'all';
    const typeMap: Record<string, string> = {
      '活动': 'activity',
      '讲座': 'lecture',
      '政策': 'policy',
      '课程': 'course'
    };
    return typeMap[selectedType] || selectedType;
  };

  // 返回组件的JSX结构  
  return (
    <Box>
      <Tabs
        value={selectedType}
        onChange={handleTypeChange}
        sx={{ mb: 2 }}
      >
        <Tab value="all" label="全部" />
        {Object.entries(categories).map(([type, category]) => (
          <Tab key={type} value={type} label={category.name} />
        ))}
      </Tabs>
      {selectedType !== 'all' && getCurrentCategory() && (
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {getCurrentCategory().subCategories.map((subCategory) => (
            <Chip
              key={subCategory.id}
              label={subCategory.name}
              onClick={() => onSubTypeChange(subCategory.id)}
              color={selectedSubType === subCategory.id ? 'primary' : 'default'}
              variant={selectedSubType === subCategory.id ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default InfoTypeFilter; 