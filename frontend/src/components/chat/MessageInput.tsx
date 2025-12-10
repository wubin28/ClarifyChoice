import { useState, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  isLoading: boolean;
}

export function MessageInput({ onSend, disabled, isLoading }: MessageInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSend = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setError('请输入消息');
      return;
    }

    setError('');
    onSend(trimmedInput);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
}
