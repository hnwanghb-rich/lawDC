-- 海南大成律所业务管理平台数据库设计
-- PostgreSQL 16

-- 用户表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL, -- lawyer, partner, admin, client
    email VARCHAR(100),
    phone VARCHAR(20),
    office VARCHAR(20), -- haikou, sanya
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 案件表
CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    case_number VARCHAR(50) UNIQUE NOT NULL,
    case_type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    client_id INTEGER REFERENCES users(id),
    lawyer_id INTEGER REFERENCES users(id),
    status VARCHAR(20) NOT NULL, -- open, in_progress, closed
    data_mode VARCHAR(10) DEFAULT 'private', -- private, shared
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 客户表
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL, -- individual, company
    industry VARCHAR(50),
    level VARCHAR(5), -- A, B, C
    contact_info JSONB,
    data_mode VARCHAR(10) DEFAULT 'private',
    owner_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 财务表
CREATE TABLE finances (
    id SERIAL PRIMARY KEY,
    case_id INTEGER REFERENCES cases(id),
    amount DECIMAL(12,2),
    status VARCHAR(20), -- pending, paid, overdue
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 文档表
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    case_id INTEGER REFERENCES cases(id),
    doc_type VARCHAR(50),
    content TEXT,
    data_mode VARCHAR(10) DEFAULT 'private',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 知识库表
CREATE TABLE knowledge_base (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    category VARCHAR(50),
    tags VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
