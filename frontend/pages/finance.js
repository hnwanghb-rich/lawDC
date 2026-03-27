import { useState } from 'react';
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
    <div style={{ padding: '40px' }}>
      <h1>💰 财务效益Agent</h1>
      <div style={{ marginTop: '20px' }}>
        <input
          type="number"
          placeholder="工时（小时）"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <input
          type="text"
          placeholder="案件类型"
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
          style={{ padding: '10px', width: '200px', marginLeft: '10px' }}
        />
        <button onClick={handleCalculate} style={{ padding: '10px 20px', marginLeft: '10px' }}>
          计算费用
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
