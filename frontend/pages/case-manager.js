import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function CaseManager() {
  const [caseType, setCaseType] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/agent', {
        agent: 'case_manager',
        type: 'create_case',
        data: { case_type: caseType }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResult(res.data.result);
    } catch (error) {
      alert('分析失败');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />案件管理</h1>
          <p className="page-subtitle">智能立案、流程引擎与工时追踪</p>
        </div>

        <div className="card">
          <div className="card-title">智能立案分析</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">案件类型</label>
              <input
                type="text"
                className="form-input"
                placeholder="输入案件类型（如：合同纠纷、知识产权等）"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ flexShrink: 0, flexGrow: 0 }}>
              <label className="form-label">&nbsp;</label>
              <button onClick={handleAnalyze} disabled={loading} className="btn btn-primary">
                {loading ? '分析中...' : '智能分析'}
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
