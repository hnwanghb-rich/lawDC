import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('qwen');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:3000/api/chat', {
        messages: [...messages, userMsg],
        model
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setMessages([...messages, userMsg, { role: 'assistant', content: res.data.data.content }]);
    } catch (error) {
      alert('发送失败');
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
          <select value={model} onChange={(e) => setModel(e.target.value)} style={{ padding: '8px' }}>
            <option value="qwen">Qwen-72B</option>
            <option value="glm">GLM-4</option>
            <option value="deepseek">DeepSeek</option>
          </select>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '20px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '70%', padding: '12px', borderRadius: '8px', background: msg.role === 'user' ? '#10a37f' : '#f5f5f5', color: msg.role === 'user' ? 'white' : 'black' }}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid #ddd' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="输入消息..."
              style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px', resize: 'none' }}
              rows={3}
            />
            <button onClick={handleSend} style={{ padding: '12px 24px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              发送
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
