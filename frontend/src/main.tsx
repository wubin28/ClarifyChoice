import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('[ClarifyChoice] 应用启动中...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('[ClarifyChoice] 错误：找不到root元素！');
  throw new Error('找不到root元素');
}

console.log('[ClarifyChoice] Root元素找到，开始渲染React应用');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

console.log('[ClarifyChoice] React应用已挂载');
