import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function CRM() {
  const [clientInfo, setClientInfo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'crm',
        type: 'client_profile',
        data: { client_info: clientInfo }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data);
    } catch (error) {
      alert('分析失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />客户关系</h1>
          <p className="page-subtitle">客户画像分析、需求预测与关系维护</p>
        </div>

        <div className="card">
          <div className="card-title">客户画像生成</div>
          <div className="form-group">
            <label className="form-label">客户信息</label>
            <textarea
              className="form-textarea"
              placeholder="输入客户信息（公司名称、行业、规模、法律需求等）"
              value={clientInfo}
              onChange={(e) => setClientInfo(e.target.value)}
            />
          </div>
          <button onClick={handleAnalyze} disabled={loading} className="btn btn-primary">
            {loading ? '分析中...' : '生成客户画像'}
          </button>
          {result && (
            <div className="result-box">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
