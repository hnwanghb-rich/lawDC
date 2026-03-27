# 海南大成律所业务管理平台 - 详细技术设计文档

## 一、系统架构设计

### 1.1 技术栈
- 前端：React 18 + Next.js 14 + Tailwind CSS
- 后端：Node.js 20 + Express + Python 3.11
- 数据库：PostgreSQL 16 + Redis
- AI模型：支持多种开源大模型（Qwen、GLM、DeepSeek等）
- 消息队列：RabbitMQ
- 权限：Casbin

### 1.2 目录结构
```
lawDC/
├── frontend/              # Next.js前端
│   ├── components/        # 组件
│   │   ├── Layout.js     # 布局组件
│   │   ├── Sidebar.js    # 侧边栏
│   │   ├── ChatInterface.js  # 聊天界面
│   │   └── AgentCard.js  # Agent卡片
│   ├── pages/            # 页面
│   │   ├── index.js      # 首页
│   │   ├── login.js      # 登录
│   │   ├── register.js   # 注册
│   │   ├── chat.js       # AI对话
│   │   └── agents/       # Agent页面
│   ├── lib/              # 工具库
│   │   ├── api.js        # API封装
│   │   └── auth.js       # 认证
│   └── styles/           # 样式
├── backend/              # Node.js后端
│   ├── src/
│   │   ├── routes/       # 路由
│   │   ├── middleware/   # 中间件
│   │   ├── models/       # 数据模型
│   │   └── services/     # 业务逻辑
│   └── config/           # 配置
├── agents/               # Python Agent
│   ├── base/             # 基础类
│   ├── models/           # 模型配置
│   └── services/         # Agent服务
└── database/             # 数据库脚本
```

## 二、用户认证系统设计

### 2.1 数据库表设计

```sql
-- 用户表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL, -- lawyer, partner, admin
    office VARCHAR(20), -- haikou, sanya
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 会话表
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 注册功能
- 路由：POST /api/auth/register
- 输入：username, email, password, name, role
- 验证：邮箱格式、密码强度（8位以上，含字母数字）
- 输出：用户信息 + JWT token

### 2.3 登录功能
- 路由：POST /api/auth/login
- 输入：username/email, password
- 验证：bcrypt密码验证
- 输出：JWT token + 用户信息

## 三、ChatGPT风格界面设计

### 3.1 布局结构
```
┌─────────────────────────────────────────┐
│  Logo  [用户头像▼]                      │
├──────────┬──────────────────────────────┤
│          │                              │
│  侧边栏  │        主内容区              │
│          │                              │
│  - 首页  │                              │
│  - 对话  │                              │
│  - Agent │                              │
│  - 设置  │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

### 3.2 侧边栏组件设计
```javascript
// components/Sidebar.js
- 可折叠
- 菜单项：首页、AI对话、10个Agent、设置
- 底部：用户信息、退出登录
```

### 3.3 聊天界面设计
```javascript
// pages/chat.js
- 消息列表（用户消息右对齐，AI消息左对齐）
- 输入框（支持多行、发送按钮）
- 模型选择下拉框
- 历史对话列表（左侧栏）
```

## 四、大模型配置系统

### 4.1 模型配置表
```sql
CREATE TABLE ai_models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    provider VARCHAR(50) NOT NULL, -- openai, qwen, glm, deepseek
    api_endpoint VARCHAR(255) NOT NULL,
    api_key VARCHAR(255),
    model_name VARCHAR(100) NOT NULL,
    max_tokens INTEGER DEFAULT 2048,
    temperature DECIMAL(3,2) DEFAULT 0.7,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4.2 支持的开源模型
- Qwen（通义千问）
- GLM（智谱清言）
- DeepSeek
- Baichuan
- ChatGLM

### 4.3 模型配置界面
- 路由：/settings/models
- 功能：添加、编辑、删除、启用/禁用模型
- 字段：模型名称、API地址、API Key、参数配置

## 五、Agent功能模块详细设计

### 5.1 案件管理Agent

#### 5.1.1 界面设计
```
┌─────────────────────────────────────┐
│  📋 案件管理Agent                   │
├─────────────────────────────────────┤
│  [新建案件] [案件列表] [统计分析]  │
├─────────────────────────────────────┤
│  案件编号：[自动生成]               │
│  案件类型：[下拉选择]               │
│  案件标题：[输入框]                 │
│  客户名称：[搜索选择]               │
│  承办律师：[当前用户]               │
│  案件描述：[文本域]                 │
│                                     │
│  [AI智能分析] [保存]               │
└─────────────────────────────────────┘
```

#### 5.1.2 功能实现
- 智能立案：AI分析案件类型、推荐法条
- 流程引擎：自动生成里程碑节点
- 工时追踪：记录操作时间
- 冲突检测：全所级利益冲突检查

### 5.2 客户关系Agent

#### 5.2.1 界面设计
```
┌─────────────────────────────────────┐
│  👥 客户关系Agent                   │
├─────────────────────────────────────┤
│  [新建客户] [客户列表] [客户画像]  │
├─────────────────────────────────────┤
│  客户名称：[输入框]                 │
│  客户类型：○个人 ○企业             │
│  所属行业：[下拉选择]               │
│  联系方式：[输入框]                 │
│                                     │
│  [AI生成画像] [需求预测]           │
└─────────────────────────────────────┘
```

#### 5.2.2 功能实现
- 客户画像：AI分析客户特征
- 需求预测：基于行业和政策预测需求
- 客户分级：A/B/C自动分级
- 流失预警：活跃度监测

### 5.3 文书智能Agent

#### 5.3.1 界面设计
```
┌─────────────────────────────────────┐
│  📄 文书智能Agent                   │
├─────────────────────────────────────┤
│  文书类型：[起诉状▼]                │
│  关联案件：[选择案件]               │
│                                     │
│  案件要素：                         │
│  原告：[输入]                       │
│  被告：[输入]                       │
│  诉讼请求：[文本域]                 │
│                                     │
│  [AI生成文书] [合同审查]           │
└─────────────────────────────────────┘
```

#### 5.3.2 功能实现
- 文书生成：基于模板和AI生成
- 合同审查：标注风险条款
- 多语言支持：中英文互译
- 版本管理：修改历史追踪

### 5.4 财务效益Agent

#### 5.4.1 界面设计
```
┌─────────────────────────────────────┐
│  💰 财务效益Agent                   │
├─────────────────────────────────────┤
│  [计费管理] [回款跟踪] [成本分析]  │
├─────────────────────────────────────┤
│  案件：[选择案件]                   │
│  工时：[自动统计] 小时              │
│  计费方式：○工时 ○固定 ○风险       │
│  费用：¥ [AI计算]                  │
│                                     │
│  [生成账单] [发送催款]             │
└─────────────────────────────────────┘
```

#### 5.4.2 功能实现
- 智能计费：多种计费模式
- 回款管理：逾期预警
- 成本核算：按案件/团队核算
- 税务优化：自贸港税收优惠

### 5.5 市场引流Agent

#### 5.5.1 界面设计
```
┌─────────────────────────────────────┐
│  📈 市场引流Agent                   │
├─────────────────────────────────────┤
│  [内容生成] [线索管理] [活动策划]  │
├─────────────────────────────────────┤
│  选择案例：[下拉选择]               │
│  目标受众：[行业选择]               │
│                                     │
│  [AI生成文章] [发布到官网]         │
│                                     │
│  线索池：                           │
│  - 新加坡企业A [认领]              │
│  - 日本企业B [认领]                │
└─────────────────────────────────────┘
```

#### 5.5.2 功能实现
- 内容引擎：案例转文章
- 智能获客：监控企业注册
- 活动管理：线下活动追踪
- SEO优化：自动优化官网

### 5.6 知识库Agent

#### 5.6.1 界面设计
```
┌─────────────────────────────────────┐
│  📚 知识库Agent                     │
├─────────────────────────────────────┤
│  搜索：[输入关键词] [🔍]           │
├─────────────────────────────────────┤
│  分类：                             │
│  - 法律法规                         │
│  - 案例库                           │
│  - 文书模板                         │
│  - 专题研究                         │
│                                     │
│  搜索结果：                         │
│  1. 海南自贸港外商投资法规...      │
│  2. 跨境贸易合规案例...            │
└─────────────────────────────────────┘
```

#### 5.6.2 功能实现
- 智能检索：语义搜索
- 法规追踪：实时更新
- 案例图谱：知识图谱
- 经验沉淀：自动提取

### 5.7 合规风控Agent

#### 5.7.1 界面设计
```
┌─────────────────────────────────────┐
│  🛡️ 合规风控Agent                   │
├─────────────────────────────────────┤
│  [利益冲突] [风险评估] [合规报告]  │
├─────────────────────────────────────┤
│  新案件：[输入案件信息]             │
│  当事人：[输入各方名称]             │
│                                     │
│  [执行冲突检测]                     │
│                                     │
│  检测结果：                         │
│  ✓ 无利益冲突                       │
│  风险等级：低                       │
└─────────────────────────────────────┘
```

#### 5.7.2 功能实现
- 利益冲突审查：多层穿透
- 风险评估：AI评估风险等级
- 反洗钱合规：KYC审查
- 数据安全：跨境数据合规

### 5.8 团队协作Agent

#### 5.8.1 界面设计
```
┌─────────────────────────────────────┐
│  🤝 团队协作Agent                   │
├─────────────────────────────────────┤
│  [项目空间] [任务看板] [日程安排]  │
├─────────────────────────────────────┤
│  项目：[选择项目]                   │
│                                     │
│  任务列表：                         │
│  □ 起草起诉状 - 张律师 - 明天      │
│  ☑ 证据整理 - 李律师 - 已完成      │
│  □ 开庭准备 - 王律师 - 下周一      │
│                                     │
│  [新建任务] [智能排期]             │
└─────────────────────────────────────┘
```

#### 5.8.2 功能实现
- 项目空间：独立协作空间
- 智能排期：自动分配时间
- 任务分派：自动拆解任务
- 跨所协作：海口-三亚协同

### 5.9 数据洞察Agent

#### 5.9.1 界面设计
```
┌─────────────────────────────────────┐
│  📊 数据洞察Agent                   │
├─────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│  │营收 │ │案件 │ │客户 │ │回款 │  │
│  │150万│ │ 45  │ │ 30  │ │ 85% │  │
│  └─────┘ └─────┘ └─────┘ └─────┘  │
│                                     │
│  业务趋势图：                       │
│  [折线图显示月度数据]               │
│                                     │
│  [AI业务预测] [导出报表]           │
└─────────────────────────────────────┘
```

#### 5.9.2 功能实现
- 经营仪表盘：实时数据
- 业务预测：AI预测趋势
- 律师画像：综合分析
- 市场热力图：区域需求

### 5.10 跨境服务Agent

#### 5.10.1 界面设计
```
┌─────────────────────────────────────┐
│  🌏 跨境服务Agent                   │
├─────────────────────────────────────┤
│  [政策查询] [架构设计] [国际仲裁]  │
├─────────────────────────────────────┤
│  投资国别：[新加坡▼]               │
│  投资行业：[医疗旅游▼]             │
│  投资金额：¥ [输入]                │
│                                     │
│  [AI推荐架构]                       │
│                                     │
│  推荐方案：                         │
│  WFOE结构，享受15%企业所得税...    │
└─────────────────────────────────────┘
```

#### 5.10.2 功能实现
- 自贸港政策库：实时更新
- 外资架构设计：AI推荐
- 多法域比较：中国-东盟
- 国际仲裁辅助：程序管理

## 六、AI对话功能设计

### 6.1 对话界面
```
┌─────────────────────────────────────┐
│  💬 AI法律助手                      │
├─────────────────────────────────────┤
│  模型：[Qwen-72B▼]                  │
├─────────────────────────────────────┤
│  用户：如何在海南设立外资企业？     │
│                                     │
│  AI：根据海南自贸港政策...          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 输入消息...                 │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                          [发送]     │
└─────────────────────────────────────┘
```

### 6.2 对话历史表
```sql
CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_id VARCHAR(100),
    role VARCHAR(20), -- user, assistant
    content TEXT,
    model_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.3 模型调用封装
```python
# agents/models/model_client.py
class ModelClient:
    def __init__(self, config):
        self.provider = config['provider']
        self.api_endpoint = config['api_endpoint']
        self.api_key = config['api_key']

    def chat(self, messages):
        # 统一接口调用不同模型
        pass
```

## 七、权限控制设计

### 7.1 权限矩阵
```
角色        | 案件(私有) | 案件(公开) | 客户 | 财务 | 管理
----------|----------|----------|-----|-----|-----
律师       | 读写     | 只读     | 读写 | 读写 | 无
合伙人     | 只读     | 只读     | 只读 | 读写 | 读写
管理员     | 无       | 只读     | 无   | 统计 | 读写
```

### 7.2 Casbin策略
```csv
p, lawyer, case_private, read
p, lawyer, case_private, write
p, partner, case_private, read
p, partner, case_shared, read
p, admin, case_shared, read
```

## 八、部署配置

### 8.1 环境变量
```env
# 数据库
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lawdc
DB_USER=postgres
DB_PASSWORD=

# JWT
JWT_SECRET=

# AI模型
DEFAULT_MODEL=qwen
QWEN_API_KEY=
QWEN_API_ENDPOINT=

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 8.2 Docker部署
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
  redis:
    image: redis:7
  backend:
    build: ./backend
  frontend:
    build: ./frontend
  agents:
    build: ./agents
```

## 九、开发规范

### 9.1 代码规范
- 前端：ESLint + Prettier
- 后端：ESLint
- Python：Black + Flake8

### 9.2 Git提交规范
```
feat: 新功能
fix: 修复
docs: 文档
style: 格式
refactor: 重构
test: 测试
chore: 构建
```

### 9.3 API规范
- RESTful风格
- 统一响应格式：
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

## 十、测试计划

### 10.1 单元测试
- 后端：Jest
- Python：pytest

### 10.2 集成测试
- API测试：Postman
- E2E测试：Playwright

### 10.3 性能测试
- 并发测试：JMeter
- 压力测试：Locust

---

**本文档为完整技术设计，可直接用于Claude Code生成项目代码。**
