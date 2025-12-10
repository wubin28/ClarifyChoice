const BASE_URL = "http://localhost:8000";

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `HTTP错误：${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API调用失败：${error.message}`);
    }
    throw new Error('API调用失败：未知错误');
  }
}
