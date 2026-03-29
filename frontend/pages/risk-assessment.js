import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function RiskAssessment() {
  const [caseInfo, setCaseInfo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAssess = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'risk_assessment',
        type: 'assess',
        data: { case_info: caseInfo }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data);
    } catch (error) {
      alert('评估失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />风险评估</h1>
          <p className="page-subtitle">案件胜诉概率分析与法律风险量化评估</p>
        </div>

        <div className="card">
          <div className="card-title">风险评估分析</div>
          <div className="form-group">
            <label className="form-label">案件信息</label>
            <textarea
              className="form-textarea"
              placeholder="输入案件基本情况、证据材料、法律关系等..."
              value={caseInfo}
              onChange={(e) => setCaseInfo(e.target.value)}
            />
          </div>
          <button onClick={handleAssess} disabled={loading} className="btn btn-primary">
            {loading ? '评估中...' : '风险评估'}
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
