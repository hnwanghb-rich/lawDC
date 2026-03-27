import { useState } from 'react';
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
    <div style={{ padding: '40px' }}>
      <h1>📄 文书智能Agent</h1>
      <div style={{ marginTop: '20px' }}>
        <select value={docType} onChange={(e) => setDocType(e.target.value)} style={{ padding: '10px', width: '200px' }}>
          <option>起诉状</option>
          <option>答辩状</option>
          <option>合同</option>
        </select>
        <textarea
          placeholder="输入案件信息"
          value={caseInfo}
          onChange={(e) => setCaseInfo(e.target.value)}
          style={{ padding: '10px', width: '100%', height: '100px', marginTop: '10px' }}
        />
        <button onClick={handleGenerate} style={{ padding: '10px 20px', marginTop: '10px' }}>
          生成文书
        </button>
      </div>
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
