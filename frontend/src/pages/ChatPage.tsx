import { useState } from 'react';
import type { Message } from '../types/index';
import { WelcomeSection } from '../components/WelcomeSection';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/MessageInput';
import * as api from '../services/api';

console.log('[ClarifyChoice] ChatPage组件加载');

export function ChatPage() {
  console.log('[ClarifyChoice] ChatPage组件渲染');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    console.log('[ClarifyChoice] 发送消息:', content);

    // 创建用户消息
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    console.log('[ClarifyChoice] 用户消息已添加，开始调用API');

    try {
      // 调用API获取AI响应
      const aiResponse = await api.sendMessage(content);
      console.log('[ClarifyChoice] 收到AI响应:', aiResponse.substring(0, 100) + '...');

      // 创建AI消息
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      console.log('[ClarifyChoice] AI消息已添加到列表');
    } catch (error) {
      console.error('[ClarifyChoice] API调用失败:', error);

      // 创建错误消息
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'ai',
        content: error instanceof Error ? error.message : '发生未知错误',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      console.log('[ClarifyChoice] 消息发送流程结束');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <WelcomeSection />
      <MessageList messages={messages} />
      <MessageInput
        onSend={handleSendMessage}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </div>
  );
}
