import { useState } from 'react';
import axios from 'axios';

export default function CaseManager() {
  const [caseType, setCaseType] = useState('');
  const [result, setResult] = useState('');

  const handleAnalyze = async () => {
    const res = await axios.post('http://localhost:3000/api/agent', {
      agent: 'case_manager',
      type: 'create_case',
      data: { case_type: caseType }
    });
    setResult(res.data.result);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>📋 案件管理Agent</h1>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="输入案件类型"
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
          style={{ padding: '10px', width: '300px' }}
        />
        <button onClick={handleAnalyze} style={{ padding: '10px 20px', marginLeft: '10px' }}>
          智能分析
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
