/**
 * 信息过滤 Hook (useInfoFilter)
 * 
 * 功能描述：
 * 1. 提供信息列表的过滤功能
 * 2. 支持多种过滤条件：
 *   - 文本搜索
 *   - 类型过滤
 *   - 子类型过滤
 *   - 时间范围过滤
 * 3. 支持多种排序方式：
 *   - 按日期排序
 *   - 按容量排序
 * 
 * 参数：
 * @param {InfoItem[]} items - 待过滤的信息列表
 * 
 * 返回值：
 * @returns {
 *   filteredInfo: InfoItem[] - 过滤后的信息列表
 *   filterOptions: FilterOptions - 当前的过滤选项
 *   updateFilter: (options: Partial<FilterOptions>) => void - 更新过滤选项的函数
 * }
 * 
 * 过滤逻辑：
 * 1. 文本搜索：匹配标题
 * 2. 类型过滤：匹配信息类型
 * 3. 子类型过滤：匹配信息子类型
 * 4. 时间范围过滤：根据日期范围筛选
 * 5. 排序：根据选择的排序方式排序
 * 
 * 性能优化：
 * 1. 使用 useMemo 缓存过滤结果
 * 2. 使用 useCallback 缓存回调函数
 * 3. 优化过滤算法效率
 * 
 * 注意事项：
 * 1. 确保过滤条件的正确组合
 * 2. 处理边界情况（如空列表）
 * 3. 优化大数据量下的性能
 * 4. 保持过滤逻辑的可维护性
 */

import { useState, useMemo } from 'react';
import { InfoItem } from '../types/index';

interface FilterOptions {
  searchText: string;
  selectedType: string;
  selectedSubType: string;
  timeRange: string;
  sortBy: string;
}

/**
 * 信息过滤 Hook
 * 
 * 功能描述：
 * 1. 提供信息列表的过滤功能
 * 2. 支持多种过滤条件：
 *   - 文本搜索
 *   - 类型过滤
 *   - 子类型过滤
 *   - 时间范围过滤
 * 3. 支持多种排序方式：
 *   - 按日期排序 
 */
export const useInfoFilter = (items: InfoItem[]) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchText: '',
    selectedType: 'all',
    selectedSubType: '',
    timeRange: 'all',
    sortBy: 'date'
  });

  /**
   * 类型映射
   * 
   * 功能描述：
   * 1. 将类型字符串映射为中文名称
   * 2. 提供类型映射表      
   */
  const typeMap: Record<string, string> = {
    'activity': '活动',
    'lecture': '讲座',
    'policy': '政策',
    'course': '课程'
  };

  /**
   * 过滤信息
   * 
   * 功能描述：
   * 1. 根据过滤选项过滤信息列表
   * 2. 支持多种过滤条件：
   *   - 标题搜索
   *   - 类型过滤
   *   - 子类型过滤
   *   - 时间范围过滤
   * 3. 支持多种排序方式：
   *   - 按日期排序
   */
  const filteredInfo = useMemo(() => {
    return items.filter(item => {
      // 标题搜索
      const matchesSearch = item.title.toLowerCase().includes(filterOptions.searchText.toLowerCase());

      // 类型过滤
      const matchesType = filterOptions.selectedType === 'all' || item.type === typeMap[filterOptions.selectedType];

      // 子类型过滤
      const matchesSubType = !filterOptions.selectedSubType || item.subType === filterOptions.selectedSubType;

      // 时间范围过滤
      const itemDate = new Date(item.date);
      const now = new Date();
      let matchesTimeRange = true;

      switch (filterOptions.timeRange) {
        case 'week':
          const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          matchesTimeRange = itemDate >= now && itemDate <= weekLater;
          break;
        case 'month':
          const monthLater = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
          matchesTimeRange = itemDate >= now && itemDate <= monthLater;
          break;
        case 'all':
        default:
          matchesTimeRange = true;
      }

      return matchesSearch && matchesType && matchesSubType && matchesTimeRange;
    }).sort((a, b) => {
      switch (filterOptions.sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'capacity':
          return b.capacity.localeCompare(a.capacity);
        default:
          return 0;
      }
    });
  }, [items, filterOptions]);

  const updateFilter = (newOptions: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({ ...prev, ...newOptions }));
  };
  /**
   * 返回过滤后的信息列表和过滤选项
   * 
   * 功能描述：
   * 1. 返回过滤后的信息列表
   * 2. 返回当前的过滤选项
   * 3. 返回更新过滤选项的函数
   */
  return {
    filteredInfo,
    filterOptions,
    updateFilter
  };
}; 