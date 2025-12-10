import { useState, KeyboardEvent, memo } from 'react';

console.log('[ClarifyChoice] MessageInput组件加载');

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  isLoading: boolean;
}

export const MessageInput = memo(function MessageInput({ onSend, disabled, isLoading }: MessageInputProps) {
  console.log('[ClarifyChoice] MessageInput组件渲染，disabled:', disabled, 'isLoading:', isLoading);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSend = () => {
    const trimmedInput = input.trim();
    console.log('[ClarifyChoice] MessageInput - handleSend被调用，输入长度:', trimmedInput.length);

    if (!trimmedInput) {
      console.warn('[ClarifyChoice] MessageInput - 输入为空，显示错误提示');
      setError('请输入消息');
      return;
    }

    console.log('[ClarifyChoice] MessageInput - 发送消息:', trimmedInput.substring(0, 50) + '...');
    setError('');
    onSend(trimmedInput);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      console.log('[ClarifyChoice] MessageInput - Enter键按下，发送消息');
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4">
      {isLoading && (
        <div className="mb-2 text-sm text-gray-600">加载中...</div>
      )}
      {error && (
        <div className="mb-2 text-sm text-red-600">{error}</div>
      )}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息（Enter发送，Shift+Enter换行）"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          发送
        </button>
      </div>
    </div>
  );
});
