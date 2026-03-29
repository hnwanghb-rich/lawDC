import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Knowledge() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = async () => {
    const res = await axios.post('http://localhost:3000/api/agent', {
      agent: 'knowledge',
      type: 'search',
      data: { query }
    });
    setResult(res.data.message);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />知识库</h1>
          <p className="page-subtitle">智能检索法律知识、法规追踪与案例图谱</p>
        </div>

        <div className="card">
          <div className="card-title">法律知识检索</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">检索关键词</label>
              <input
                type="text"
                className="form-input"
                placeholder="输入法律条文、案例关键词..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="form-group" style={{ flexShrink: 0, flexGrow: 0 }}>
              <label className="form-label">&nbsp;</label>
              <button onClick={handleSearch} className="btn btn-primary">
                检索
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
