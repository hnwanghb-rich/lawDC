import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const AGENTS = [
  { id: 'conflict', name: '利冲审核', desc: '利益冲突智能审查，自动比对当事人信息' },
  { id: 'docread',  name: '文案快读', desc: '文档快速解读分析，提炼关键条款' },
  { id: 'duedilig', name: '尽调助手', desc: '尽职调查辅助，自动生成调查报告' },
  { id: 'strategy', name: '策略助手', desc: '法律策略智能建议，案件胜诉分析' },
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
    { label: '个人信息', desc: '查看和编辑个人资料', path: '/settings/profile' },
    { label: '行程表',   desc: '管理日程与会议安排', path: '/settings/schedule' },
    { label: '修改密码', desc: '更新账户登录密码', path: '/change-password' },
    { label: '智能体选择', desc: activeAgent ? `当前：${activeAgent.name}` : '选择默认聊天智能体', action: () => setShowAgentPicker(true) },
  ];

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />控制台</h1>
          <p className="page-subtitle">个人设置与系统配置</p>
        </div>

        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {menuItems.map(item => (
            <div
              key={item.label}
              onClick={() => item.action ? item.action() : router.push(item.path)}
              className="card"
              style={{ cursor: 'pointer', marginBottom: 0, transition: 'box-shadow 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--color-border-light)'; }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {showAgentPicker && (
        <div
          onClick={() => setShowAgentPicker(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(26,39,68,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '36px', width: '520px', boxShadow: 'var(--shadow-lg)' }}
          >
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px' }}>选择聊天智能体</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '13.5px' }}>
              选中的智能体将作为所有页面聊天窗口的处理工具
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {AGENTS.map(agent => (
                <div
                  key={agent.id}
                  onClick={() => selectAgent(agent)}
                  style={{
                    border: `2px solid ${activeAgent?.id === agent.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '18px',
                    cursor: 'pointer',
                    background: activeAgent?.id === agent.id ? '#fdf8ee' : 'white',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '5px' }}>{agent.name}</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>{agent.desc}</div>
                  {activeAgent?.id === agent.id && (
                    <div style={{ marginTop: '8px', color: 'var(--color-accent)', fontSize: '12px', fontWeight: 600 }}>✓ 当前使用</div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setShowAgentPicker(false)} className="btn btn-outline btn-sm" style={{ marginTop: '20px' }}>
              关闭
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
