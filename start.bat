@echo off
echo 启动海南大成律所业务管理平台

echo 启动后端服务...
cd backend
start cmd /k "npm start"

echo 启动Agent调度器...
cd ..\agents
start cmd /k "python orchestrator.py"

echo 启动前端服务...
cd ..\frontend
start cmd /k "npm start"

echo 所有服务已启动
pause
