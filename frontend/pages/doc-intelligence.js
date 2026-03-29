import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function DocIntelligence() {
  const [docType, setDocType] = useState('起诉状');
  const [caseInfo, setCaseInfo] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    const res = await axios.post('http://localhost:3000/api/agent', {
      agent: 'doc_intelligence',
      type: 'generate_doc',
      data: { doc_type: docType, case_info: caseInfo }
    });
    setResult(res.data.message);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />文书智能</h1>
          <p className="page-subtitle">智能生成法律文书、合同审查与多语言支持</p>
        </div>

        <div className="card">
          <div className="card-title">文书生成</div>
          <div className="form-group">
            <label className="form-label">文书类型</label>
            <select
              className="form-select"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              style={{ maxWidth: '240px' }}
            >
              <option>起诉状</option>
              <option>答辩状</option>
              <option>合同</option>
              <option>法律意见书</option>
              <option>仲裁申请书</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">案件信息</label>
            <textarea
              className="form-textarea"
              placeholder="请输入案件基本信息，包括当事人、事实经过、诉求等..."
              value={caseInfo}
              onChange={(e) => setCaseInfo(e.target.value)}
            />
          </div>
          <button onClick={handleGenerate} className="btn btn-primary">
            生成文书
          </button>
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
