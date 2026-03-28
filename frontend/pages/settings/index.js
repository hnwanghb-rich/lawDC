import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const AGENTS = [
  { id: 'conflict', name: '利冲审核', icon: '⚖️', desc: '利益冲突智能审查，自动比对当事人信息' },
  { id: 'docread',  name: '文案快读', icon: '📄', desc: '文档快速解读分析，提炼关键条款' },
  { id: 'duedilig', name: '尽调助手', icon: '🔍', desc: '尽职调查辅助，自动生成调查报告' },
  { id: 'strategy', name: '策略助手', icon: '💡', desc: '法律策略智能建议，案件胜诉分析' },
];

export default function Settings() {
  const [activeAgent, setActiveAgent] = useState(null);
  const [showAgentPicker, setShowAgentPicker] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('activeAgent');
    if (saved) setActiveAgent(JSON.parse(saved));
  }, []);

  const selectAgent = (agent) => {
    setActiveAgent(agent);
    localStorage.setItem('activeAgent', JSON.stringify(agent));
    setShowAgentPicker(false);
  };

  const menuItems = [
    { label: '个人信息', icon: '👤', path: '/settings/profile' },
    { label: '行程表',   icon: '📅', path: '/settings/schedule' },
    { label: '修改密码', icon: '🔒', path: '/change-password' },
    { label: '智能体选择', icon: '🤖', action: () => setShowAgentPicker(true) },
  ];

  return (
    <Layout>
      <div style={{ padding: '40px', maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '30px' }}>控制台</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {menuItems.map(item => (
            <div
              key={item.label}
              onClick={() => item.action ? item.action() : router.push(item.path)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'box-shadow 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <span style={{ fontSize: '32px' }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{item.label}</div>
                {item.label === '智能体选择' && activeAgent && (
                  <div style={{ fontSize: '13px', color: '#10a37f', marginTop: '4px' }}>
                    当前：{activeAgent.icon} {activeAgent.name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 智能体选择弹窗 */}
      {showAgentPicker && (
        <div
          onClick={() => setShowAgentPicker(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'white', borderRadius: '12px', padding: '30px', width: '500px' }}
          >
            <h2 style={{ marginBottom: '20px' }}>选择聊天智能体</h2>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
              选中的智能体将作为所有页面聊天窗口的处理工具
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {AGENTS.map(agent => (
                <div
                  key={agent.id}
                  onClick={() => selectAgent(agent)}
                  style={{
                    border: `2px solid ${activeAgent?.id === agent.id ? '#10a37f' : '#ddd'}`,
                    borderRadius: '8px',
                    padding: '16px',
                    cursor: 'pointer',
                    background: activeAgent?.id === agent.id ? '#f0faf7' : 'white',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{agent.icon}</div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{agent.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{agent.desc}</div>
                  {activeAgent?.id === agent.id && (
                    <div style={{ marginTop: '8px', color: '#10a37f', fontSize: '12px', fontWeight: 600 }}>✓ 当前使用</div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAgentPicker(false)}
              style={{ marginTop: '20px', padding: '10px 24px', background: '#f0f0f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
