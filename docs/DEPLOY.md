# Windows Server 2022 部署指南

## 环境准备

### 1. 安装PostgreSQL 16
下载: https://www.postgresql.org/download/windows/
创建数据库: `createdb lawdc`
导入schema: `psql -U postgres -d lawdc -f database/schema.sql`

### 2. 安装Node.js 20 LTS
下载: https://nodejs.org/

### 3. 安装Python 3.11
下载: https://www.python.org/downloads/windows/

### 4. 安装RabbitMQ
下载: https://www.rabbitmq.com/install-windows.html

## 部署步骤

### 后端部署
```bash
cd backend
npm install
cp .env.example .env
# 编辑.env配置数据库密码
npm start
```

### Agent部署
```bash
cd agents
pip install -r requirements.txt
python case_manager_agent.py
```

### 前端部署
```bash
cd frontend
npm install
npm run build
npm start
```

## 访问地址
- 前端: http://localhost:3000
- 后端API: http://localhost:3000/api
