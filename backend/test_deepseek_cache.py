import os
import time
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

# 运行方法：
#   cd backend
#   python -m venv .venv
#   source .venv/bin/activate
#   which python
#   pip install langchain-openai langchain-core
#   export DEEPSEEK_API_KEY="your-api-key"
#   python test_deepseek_cache.py
#
# 结果判断：
#   1. 响应时间判断（初步）：
#     - 如果第2次调用明显更快（>30%），可能支持缓存
#     - 如果时间差不多，可能不支持
#   2. 查看API账单（最终判断）：
#     - 登录DeepSeek控制台查看使用记录
#     - 对比两次调用的输入token计费
#     - 如果第2次是第1次的10%（$0.028 vs $0.28），则确认支持
#     - 如果两次计费相同，则确认不支持

# 您的API Key
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")

# 创建一个大的系统提示词（模拟十四五规划）
LARGE_SYSTEM_PROMPT = "这是一个测试系统提示词。" * 5000  # 约50,000 tokens

# 初始化LLM
llm = ChatOpenAI(
    openai_api_key=DEEPSEEK_API_KEY,
    openai_api_base="https://api.deepseek.com",
    model_name="deepseek-reasoner"
)

print("=== DeepSeek Prompt Caching 测试 ===\n")

# 第一次调用（应该是cache miss）
print("第1次调用（cache miss）...")
start1 = time.time()
response1 = llm.invoke([
    SystemMessage(content=LARGE_SYSTEM_PROMPT),
    HumanMessage(content="你好，这是第一次测试")
])
time1 = time.time() - start1

print(f"响应时间: {time1:.2f}秒")
print(f"响应内容: {response1.content[:100]}...\n")

# 等待1秒
time.sleep(1)

# 第二次调用（如果支持缓存，应该是cache hit）
print("第2次调用（cache hit if supported）...")
start2 = time.time()
response2 = llm.invoke([
    SystemMessage(content=LARGE_SYSTEM_PROMPT),  # 相同的系统提示词
    HumanMessage(content="你好，这是第二次测试")
])
time2 = time.time() - start2

print(f"响应时间: {time2:.2f}秒")
print(f"响应内容: {response2.content[:100]}...\n")

# 分析结果
print("=== 分析结果 ===")
if time2 < time1 * 0.7:  # 如果第二次明显更快（超过30%）
    print("✅ 可能支持Prompt Caching（第2次明显更快）")
else:
    print("⚠️  可能不支持Prompt Caching（时间无明显差异）")

# 检查响应头（如果API返回了使用信息）
print("\n注意：需要在DeepSeek控制台查看实际token计费")
print("如果支持缓存，第2次调用的输入token费用应该是第1次的10%")