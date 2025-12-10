console.log('[ClarifyChoice] Types模块加载');

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

console.log('[ClarifyChoice] Message接口已导出');
