import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Compliance() {
  const [businessInfo, setBusinessInfo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'compliance',
        type: 'check',
        data: { business_info: businessInfo }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data);
    } catch (error) {
      alert('检查失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />合规风控</h1>
          <p className="page-subtitle">利益冲突审查与合规风险评估</p>
        </div>

        <div className="card">
          <div className="card-title">合规检查</div>
          <div className="form-group">
            <label className="form-label">业务信息</label>
            <textarea
              className="form-textarea"
              placeholder="输入业务信息，包括交易结构、当事方、业务背景等..."
              value={businessInfo}
              onChange={(e) => setBusinessInfo(e.target.value)}
            />
          </div>
          <button onClick={handleCheck} disabled={loading} className="btn btn-primary">
            {loading ? '检查中...' : '合规检查'}
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
