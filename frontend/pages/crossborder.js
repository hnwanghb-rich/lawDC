import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function CrossBorder() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'crossborder',
        type: 'ftz_policy',
        data: { query }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data.message);
    } catch (error) {
      alert('查询失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />跨境服务</h1>
          <p className="page-subtitle">自贸港政策查询与外资架构设计</p>
        </div>

        <div className="card">
          <div className="card-title">自贸港政策查询</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">查询内容</label>
              <input
                type="text"
                className="form-input"
                placeholder="输入政策关键词，如：外资准入、税收优惠..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
              />
            </div>
            <div className="form-group" style={{ flexShrink: 0, flexGrow: 0 }}>
              <label className="form-label">&nbsp;</label>
              <button onClick={handleQuery} disabled={loading} className="btn btn-primary">
                {loading ? '查询中...' : '查询'}
              </button>
            </div>
          </div>
          {result && (
            <div className="result-box">
              <pre>{result}</pre>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
