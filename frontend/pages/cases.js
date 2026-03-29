import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Cases() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cases?lawyer_id=1')
      .then(res => setCases(res.data))
      .catch(console.error);
  }, []);

  const statusClass = (status) => {
    const map = { '进行中': 'badge-active', '待处理': 'badge-pending', '已结案': 'badge-closed', '紧急': 'badge-urgent' };
    return map[status] || 'badge-info';
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title"><span className="page-title-icon" />案件管理</h1>
          <p className="page-subtitle">管理所有在办案件，追踪案件进度与工时</p>
        </div>

        <div className="card">
          <div className="card-title">案件列表</div>
          {cases.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-text">暂无案件数据</div>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>案件编号</th>
                    <th>案件类型</th>
                    <th>案件标题</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map(c => (
                    <tr key={c.id}>
                      <td>{c.case_number}</td>
                      <td>{c.case_type}</td>
                      <td>{c.title}</td>
                      <td><span className={`badge ${statusClass(c.status)}`}>{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
