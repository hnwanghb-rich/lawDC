import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function Models() {
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({ name: '', provider: 'qwen', api_endpoint: '', api_key: '', model_name: '' });

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    const res = await axios.get('http://localhost:3000/api/models', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setModels(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/models', form, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setForm({ name: '', provider: 'qwen', api_endpoint: '', api_key: '', model_name: '' });
    loadModels();
  };

  return (
    <Layout>
      <div style={{ padding: '40px' }}>
        <h1>⚙️ 模型配置</h1>

        <form onSubmit={handleSubmit} style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
          <input type="text" placeholder="模型名称" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} required />
          <select value={form.provider} onChange={(e) => setForm({...form, provider: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
            <option value="qwen">Qwen（通义千问）</option>
            <option value="glm">GLM（智谱清言）</option>
            <option value="deepseek">DeepSeek</option>
          </select>
          <input type="text" placeholder="API地址" value={form.api_endpoint} onChange={(e) => setForm({...form, api_endpoint: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} required />
          <input type="text" placeholder="API Key" value={form.api_key} onChange={(e) => setForm({...form, api_key: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} required />
          <input type="text" placeholder="模型名称（如qwen-72b）" value={form.model_name} onChange={(e) => setForm({...form, model_name: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} required />
          <button type="submit" style={{ padding: '10px 20px', background: '#10a37f', color: 'white', border: 'none', borderRadius: '4px' }}>添加模型</button>
        </form>

        <div style={{ marginTop: '30px' }}>
          <h2>已配置模型</h2>
          {models.map(m => (
            <div key={m.id} style={{ padding: '15px', background: '#f5f5f5', borderRadius: '8px', marginTop: '10px' }}>
              <h3>{m.name}</h3>
              <p>提供商：{m.provider} | 模型：{m.model_name}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
