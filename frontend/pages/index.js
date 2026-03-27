import Link from 'next/link';

export default function Home() {
  const agents = [
    { name: '案件管理', icon: '📋', path: '/case-manager', desc: '智能立案、流程引擎、工时追踪' },
    { name: '客户关系', icon: '👥', path: '/crm', desc: '客户画像、需求预测、关系维护' },
    { name: '文书智能', icon: '📄', path: '/doc-intelligence', desc: '文书生成、合同审查、多语言支持' },
    { name: '财务效益', icon: '💰', path: '/finance', desc: '智能计费、回款管理、成本核算' },
    { name: '市场引流', icon: '📈', path: '/marketing', desc: '内容引擎、智能获客、活动管理' },
    { name: '知识库', icon: '📚', path: '/knowledge', desc: '智能检索、法规追踪、案例图谱' },
    { name: '合规风控', icon: '🛡️', path: '/compliance', desc: '利益冲突审查、风险评估' },
    { name: '团队协作', icon: '🤝', path: '/collaboration', desc: '项目空间、智能排期、任务分派' },
    { name: '数据洞察', icon: '📊', path: '/analytics', desc: '经营仪表盘、业务预测' },
    { name: '跨境服务', icon: '🌏', path: '/crossborder', desc: '自贸港政策、外资架构设计' }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>海南大成律所业务管理平台</h1>
        <p style={{ fontSize: '18px', color: '#666' }}>基于Agent矩阵的智能化律所管理系统</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {agents.map(agent => (
          <Link href={agent.path} key={agent.name}>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              ':hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{agent.icon}</div>
              <h3 style={{ marginBottom: '10px' }}>{agent.name}</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>{agent.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
