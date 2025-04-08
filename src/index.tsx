import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
  
/**
 * 主入口文件
 * 
 * 功能描述：
 * 1. 创建 React 根元素
 * 2. 渲染应用组件
 * 3. 使用 React.StrictMode 严格模式    
 * 4. 使用 ReactDOM.createRoot 创建根元素
 * 5. 使用 ReactDOM.render 渲染应用组件
 * 
 * 组件结构：
 * - React.StrictMode: 严格模式
 * - App: 应用组件
 * 
 * 数据流：
 * 1. 创建 React 根元素
 */ 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode> {/* 严格模式 */}
    <App /> {/* 应用组件 */}
  </React.StrictMode> 
);

reportWebVitals();  // 报告性能指标
