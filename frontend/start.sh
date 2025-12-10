#!/bin/bash

echo "========================================"
echo "启动ClarifyChoice前端服务"
echo "========================================"

# 检查node_modules是否存在
if [ ! -d "node_modules" ]; then
    echo "安装npm依赖..."
    npm install
fi

echo ""
echo "========================================"
echo "启动Vite开发服务器（端口5173）..."
echo "========================================"

# 启动Vite开发服务器
npm run dev
