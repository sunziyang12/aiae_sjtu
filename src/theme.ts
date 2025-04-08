import { createTheme } from '@mui/material/styles';
/**
 * 创建主题对象
 * 
 * 功能描述：
 * 1. 定义应用的主题配置
 * 2. 配置主色调和次色调
 * 3. 提供主题对象
 * 
 * 组件结构：
 * - createTheme: Material-UI 主题创建函数
 * - palette: 颜色配置
 *   - primary: 主色调
 *   - secondary: 次色调  
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
}); 