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

# 检查.env文件是否存在并加载
if [ -f ".env" ]; then
    echo "检测到.env文件，正在加载环境变量..."
    export $(grep -v '^#' .env | xargs)
    echo "环境变量已从.env加载"
else
    echo "未找到.env文件"
fi

# 如果API Key仍未设置，提示用户输入
if [ -z "$DEEPSEEK_API_KEY" ]; then
    echo ""
    echo "请输入DeepSeek API Key（输入时不会显示）："
    read -s DEEPSEEK_API_KEY
    export DEEPSEEK_API_KEY

    if [ -z "$DEEPSEEK_API_KEY" ]; then
        echo "错误：API Key未设置！"
        exit 1
    fi
fi

echo ""
echo "API Key已设置"
echo "========================================"
echo "启动FastAPI服务器（端口8000）..."
echo "========================================"

# 启动uvicorn
uvicorn main:app --reload --port 8000
