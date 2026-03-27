import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cases() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cases?lawyer_id=1')
      .then(res => setCases(res.data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>案件管理</h1>
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>案件编号</th>
            <th>案件类型</th>
            <th>标题</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(c => (
            <tr key={c.id}>
              <td>{c.case_number}</td>
              <td>{c.case_type}</td>
              <td>{c.title}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
