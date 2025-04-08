import React from 'react';
import {
  Box,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // 导入搜索图标  

// 定义InfoSearchFilter组件的props类型
interface InfoSearchFilterProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

// 定义InfoSearchFilter组件
export const InfoSearchFilter: React.FC<InfoSearchFilterProps> = ({
  searchText,
  onSearchChange,
  sortBy,
  onSortChange,
  timeRange,
  onTimeRangeChange
}) => {
  // 返回组件的JSX结构
  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        placeholder="搜索信息标题..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        sx={{ maxWidth: 400 }}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>时间范围</InputLabel>
          <Select
            value={timeRange}
            label="时间范围"
            onChange={(e) => onTimeRangeChange(e.target.value)}
          >
            <MenuItem value="all">全部时间</MenuItem>
            <MenuItem value="week">一周内</MenuItem>
            <MenuItem value="month">一个月内</MenuItem>
          </Select>
        </FormControl>

        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>排序方式</InputLabel>
          <Select
            value={sortBy}
            label="排序方式"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <MenuItem value="date">时间排序</MenuItem>
            <MenuItem value="capacity">名额排序</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

// 导出InfoSearchFilter组件
export default InfoSearchFilter; 