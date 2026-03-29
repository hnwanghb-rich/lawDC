import { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatWidth, setChatWidth] = useState(360);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const onMouseDown = useCallback((e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startWidth.current = chatWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [chatWidth]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      const delta = startX.current - e.clientX;
      const newWidth = Math.max(280, Math.min(680, startWidth.current + delta));
      setChatWidth(newWidth);
    };
    const onMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const agents = [
    { name: '利冲审核', desc: '利益冲突智能审查' },
    { name: '文案快读', desc: '文档快速解读分析' },
    { name: '尽调助手', desc: '尽职调查辅助工具' },
    { name: '策略助手', desc: '法律策略智能建议' },
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE_URL}/api/chat/send`,
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.data.reply }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="dashboard">
        {/* 左侧内容区 */}
        <div className="dashboard-main">
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

        {/* 拖拽分隔条 */}
        <div className="chat-resize-handle" onMouseDown={onMouseDown} />

        {/* 右侧智能体交流 */}
        <div className="dashboard-chat" style={{ width: `${chatWidth}px` }}>
          <div className="chat-header">智能体交流</div>
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-text">向智能体发送消息开始对话</div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <div className="chat-input-row">
              <input
                type="text"
                className="form-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="输入消息，按 Enter 发送"
              />
              <button onClick={sendMessage} className="btn btn-primary" style={{ flexShrink: 0 }}>
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
