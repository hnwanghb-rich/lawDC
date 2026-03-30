import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';

const DOUBAO_API_KEY = '25a30b4b-bf15-429c-9650-ea76facffa49';
const DOUBAO_MODEL = 'ep-20260305101456-kvjwq';
const DOUBAO_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

const AGENTS = [
  { id: 'doubao', name: '豆包（默认）', model: DOUBAO_MODEL },
];

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('doubao');
  const [attachedFile, setAttachedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const agents = [
    { name: '利冲审核', desc: '利益冲突智能审查' },
    { name: '文案快读', desc: '文档快速解读分析' },
    { name: '尽调助手', desc: '尽职调查辅助工具' },
    { name: '策略助手', desc: '法律策略智能建议' },
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text && !attachedFile) return;
    if (loading) return;

    const userContent = attachedFile ? `[附件: ${attachedFile.name}]\n${text}` : text;
    const userMsg = { role: 'user', content: userContent };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachedFile(null);
    setLoading(true);

    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(DOUBAO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DOUBAO_API_KEY}`,
        },
        body: JSON.stringify({
          model: DOUBAO_MODEL,
          messages: [
            { role: 'system', content: '你是海南大成律师事务所的AI法律助手，专业、严谨、简洁地回答法律相关问题。' },
            ...history,
          ],
          stream: true,
        }),
      });

      if (!res.ok) {
        throw new Error(`API 错误: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              assistantContent += delta;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `请求失败：${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
    e.target.value = '';
  };

  return (
    <Layout>
      <div className="dashboard-main" style={{ padding: '28px 32px', overflowY: 'auto', height: '100%' }}>
        <div className="announce-bar">
          <marquee>公告：欢迎使用大成律所业务管理平台 &nbsp;|&nbsp; 请及时更新案件进度 &nbsp;|&nbsp; 本周五下午 15:00 全体会议</marquee>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div className="section-title">工作日程安排</div>
          <div className="schedule-list">
            <div className="schedule-item">
              <span className="schedule-time">09:00</span>
              <span>客户咨询会议</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-time">14:00</span>
              <span>案件讨论</span>
            </div>
            <div className="schedule-item">
              <span className="schedule-time">16:00</span>
              <span>文书审核</span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div className="section-title">有人找我</div>
          <div className="message-list">
            <div className="message-item">
              <div className="message-sender">陌生客户留言</div>
              <div className="message-content">张先生：咨询合同纠纷案件</div>
            </div>
            <div className="message-item">
              <div className="message-sender">同事留言</div>
              <div className="message-content">李律师：请协助审核合同文件</div>
            </div>
          </div>
        </div>

        <div>
          <div className="section-title">智能体矩阵</div>
          <div className="agent-grid">
            {agents.map(agent => (
              <div key={agent.name} className="agent-card">
                <div className="agent-card-name">{agent.name}</div>
                <div className="agent-card-desc">{agent.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧滑出 AI 助手 */}
      <div
        className="ai-drawer-container"
        onMouseLeave={() => setDrawerOpen(false)}
      >
        {/* Tab 标签 */}
        <div
          className="ai-drawer-tab"
          onMouseEnter={() => setDrawerOpen(true)}
          onClick={() => setDrawerOpen(v => !v)}
        >
          <span className="ai-drawer-tab-icon">🤖</span>
          大成AI助手
        </div>

        {/* 滑出面板 */}
        <div className={`ai-drawer-panel${drawerOpen ? ' open' : ''}`}>
          <div className="ai-drawer-header">
            <div className="ai-drawer-header-title">
              <span>🤖</span> 大成AI助手
            </div>
            <select
              className="ai-drawer-agent-select"
              value={selectedAgent}
              onChange={e => setSelectedAgent(e.target.value)}
            >
              {AGENTS.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div className="ai-drawer-messages">
            {messages.length === 0 && (
              <div className="empty-state" style={{ padding: '40px 20px' }}>
                <div className="empty-state-icon">⚖️</div>
                <div className="empty-state-text">向大成AI助手发送消息开始对话</div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {msg.content}
                {msg.role === 'assistant' && loading && i === messages.length - 1 && (
                  <span style={{ opacity: 0.5, marginLeft: 4 }}>▌</span>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-drawer-input-area">
            <div className="ai-drawer-input-row">
              <textarea
                className="ai-drawer-textarea"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入消息，Enter 发送，Shift+Enter 换行"
                rows={5}
                disabled={loading}
              />
              {attachedFile && (
                <div className="ai-drawer-file-name">
                  📎 {attachedFile.name}
                  <span
                    style={{ marginLeft: 8, cursor: 'pointer', color: 'var(--color-danger)' }}
                    onClick={() => setAttachedFile(null)}
                  >✕</span>
                </div>
              )}
              <div className="ai-drawer-actions">
                <button
                  className="ai-drawer-file-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title="上传文件"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                  </svg>
                  附件
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button
                  className="ai-drawer-send-btn"
                  onClick={sendMessage}
                  disabled={loading || (!input.trim() && !attachedFile)}
                >
                  {loading ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      思考中
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      发送
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
