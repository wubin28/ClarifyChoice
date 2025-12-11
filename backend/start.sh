#!/bin/bash

echo "========================================"
echo "启动ClarifyChoice后端服务"
echo "========================================"

# 检查并创建虚拟环境
if [ ! -d ".venv" ]; then
    echo "创建Python虚拟环境..."
    python3 -m venv .venv
fi

# 激活虚拟环境
echo "激活虚拟环境..."
source .venv/bin/activate

# 检查requirements.txt是否存在
if [ ! -f "requirements.txt" ]; then
    echo "错误：requirements.txt文件不存在！"
    exit 1
fi

# 安装依赖
echo "安装Python依赖..."
pip install -r requirements.txt

# 检测操作系统并在Linux（WSL2）上安装httpx[socks]
OS_TYPE=$(uname -s)
if [ "$OS_TYPE" = "Linux" ]; then
    echo "检测到Linux系统（WSL2），安装httpx[socks]..."
    pip install httpx[socks]
else
    echo "检测到非Linux系统（可能是macOS），跳过httpx[socks]安装"
fi

# 检查.env文件是否存在
if [ ! -f ".env" ]; then
    echo "错误：未找到.env文件！"
    echo "请创建.env文件并配置DEEPSEEK_API_KEY"
    echo "参考：cp .env.example .env"
    exit 1
fi

# 加载.env文件
echo "正在从.env加载环境变量..."
export $(grep -v '^#' .env | xargs)

# 验证API Key是否已设置
if [ -z "$DEEPSEEK_API_KEY" ]; then
    echo "错误：.env文件中未配置DEEPSEEK_API_KEY！"
    echo "请编辑.env文件，添加："
    echo "DEEPSEEK_API_KEY=your-api-key-here"
    exit 1
fi

echo "环境变量已加载，API Key已设置 ✓"
echo "========================================"
echo "启动FastAPI服务器（端口8000）..."
echo "========================================"

# 启动uvicorn
uvicorn main:app --reload --port 8000
