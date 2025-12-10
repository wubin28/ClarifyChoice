const BASE_URL = "http://localhost:8000";

console.log('[ClarifyChoice] API服务初始化，BASE_URL:', BASE_URL);

export async function sendMessage(message: string): Promise<string> {
  console.log('[ClarifyChoice] API请求开始 - URL:', `${BASE_URL}/chat`);
  console.log('[ClarifyChoice] API请求 - 消息:', message.substring(0, 100) + (message.length > 100 ? '...' : ''));

  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    console.log('[ClarifyChoice] API响应状态:', response.status, response.statusText);

    if (!response.ok) {
      const error = await response.json();
      console.error('[ClarifyChoice] API错误响应:', error);
      throw new Error(error.detail || `HTTP错误：${response.status}`);
    }

    const data = await response.json();
    console.log('[ClarifyChoice] API响应成功，数据长度:', data.response?.length || 0);
    return data.response;
  } catch (error) {
    console.error('[ClarifyChoice] API调用异常:', error);
    if (error instanceof Error) {
      throw new Error(`API调用失败：${error.message}`);
    }
    throw new Error('API调用失败：未知错误');
  }
}
