import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);

  const agents = [
    { name: '利冲审核', icon: '⚖️', desc: '利益冲突智能审查' },
    { name: '文案快读', icon: '📄', desc: '文档快速解读分析' },
    { name: '尽调助手', icon: '🔍', desc: '尽职调查辅助工具' },
    { name: '策略助手', icon: '💡', desc: '法律策略智能建议' }
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/api/chat/send',
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
      <div style={{ display: 'flex', height: '100%' }}>
        {/* 左侧内容区 */}
        <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
          {/* 公司公告滚动条 */}
          <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '30px', overflow: 'hidden' }}>
            <marquee>📢 公司公告：欢迎使用海南大成律所业务管理平台 | 请及时更新案件进度 | 本周五下午3点全体会议</marquee>
          </div>

          {/* 工作日程安排 */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '15px' }}>📅 工作日程安排</h2>
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
              <div style={{ marginBottom: '10px' }}>09:00 - 客户咨询会议</div>
              <div style={{ marginBottom: '10px' }}>14:00 - 案件讨论</div>
              <div>16:00 - 文书审核</div>
            </div>
          </div>

          {/* 有人找我 */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '15px' }}>💬 有人找我</h2>
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
              <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                <strong>陌生客户留言</strong>
                <div style={{ marginTop: '5px', color: '#666' }}>张先生：咨询合同纠纷案件</div>
              </div>
              <div>
                <strong>同事留言</strong>
                <div style={{ marginTop: '5px', color: '#666' }}>李律师：请协助审核合同文件</div>
              </div>
            </div>
          </div>

          {/* 智能体矩阵 */}
          <div>
            <h2 style={{ marginBottom: '15px' }}>🤖 智能体矩阵</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
              {agents.map(agent => (
                <div key={agent.name} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', cursor: 'pointer' }}>
                  <div style={{ fontSize: '30px', marginBottom: '10px' }}>{agent.icon}</div>
                  <h3>{agent.name}</h3>
                  <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧智能体交流 */}
        <div style={{ width: '400px', borderLeft: '1px solid #ddd', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
            <h3>💬 智能体交流</h3>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '15px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  background: msg.role === 'user' ? '#10a37f' : '#f0f0f0',
                  color: msg.role === 'user' ? 'white' : 'black',
                  maxWidth: '80%'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '20px', borderTop: '1px solid #ddd' }}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="输入消息..."
                style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <button onClick={sendMessage} style={{ padding: '10px 20px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
