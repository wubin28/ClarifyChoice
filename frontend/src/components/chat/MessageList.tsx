import { useRef, useEffect } from 'react';
import type { Message } from '../../types/index';
import { formatTimestamp } from '../../utils/formatTime';

console.log('[ClarifyChoice] MessageList组件加载');

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  console.log('[ClarifyChoice] MessageList组件渲染，消息数量:', messages.length);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('[ClarifyChoice] MessageList - 消息列表更新，滚动到底部');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.role === 'ai' && (
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              AI
            </div>
          )}
          <div
            className={`flex flex-col max-w-2xl ${
              message.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
          {message.role === 'user' && (
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-black font-bold">
              用
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
