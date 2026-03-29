import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Finance() {
  const [hours, setHours] = useState('');
  const [caseType, setCaseType] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = async () => {
    const res = await axios.post('http://localhost:3000/api/agent', {
      agent: 'finance',
      type: 'calculate_fee',
      data: { hours, case_type: caseType }
    });
    setResult(res.data.message);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />财务效益</h1>
          <p className="page-subtitle">智能计费、回款管理与成本核算</p>
        </div>

        <div className="card">
          <div className="card-title">费用计算</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">工时（小时）</label>
              <input
                type="number"
                className="form-input"
                placeholder="请输入工时"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">案件类型</label>
              <input
                type="text"
                className="form-input"
                placeholder="请输入案件类型"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ flexShrink: 0, flexGrow: 0 }}>
              <label className="form-label">&nbsp;</label>
              <button onClick={handleCalculate} className="btn btn-primary">
                计算费用
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
