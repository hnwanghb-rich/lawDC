import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const router = useRouter();

  const menuItems = [
    { name: '案件管理', path: '/case-manager', icon: '📋', sub: ['智能立案', '流程引擎', '工时追踪'] },
    { name: '客户关系', path: '/crm', icon: '👥', sub: ['客户画像', '需求预测', '关系维护'] },
    { name: '文书智能', path: '/doc-intelligence', icon: '📄', sub: ['文书生成', '合同审查', '多语言支持'] },
    { name: '财务效益', path: '/finance', icon: '💰', sub: ['智能计费', '回款管理', '成本核算'] },
    { name: '市场引流', path: '/marketing', icon: '📈', sub: ['内容引擎', '智能获客', '活动管理'] },
    { name: '知识库', path: '/knowledge', icon: '📚', sub: ['智能检索', '法规追踪', '案例图谱'] },
    { name: '合规风控', path: '/compliance', icon: '🛡️', sub: ['利益冲突审查', '风险评估'] },
    { name: '团队协作', path: '/collaboration', icon: '🤝', sub: ['项目空间', '智能排期', '任务分派'] },
    { name: '数据洞察', path: '/analytics', icon: '📊', sub: ['经营仪表盘', '业务预测'] },
    { name: '跨境服务', path: '/crossborder', icon: '🌏', sub: ['自贸港政策', '外资架构设计'] },
    { name: '控制台', path: '/settings', icon: '⚙️', sub: ['个人信息', '行程表', '修改密码'] }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 左侧菜单 */}
      <div style={{ width: '240px', background: '#202123', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #444' }}>
          <Link href="/"><h2 style={{ cursor: 'pointer' }}>海南大成律所</h2></Link>
        </div>

        <nav style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
          {menuItems.map(item => (
            <div key={item.name} style={{ position: 'relative' }}>
              <Link href={item.path}>
                <div
                  onMouseEnter={() => setHoveredMenu(item.name)}
                  onMouseLeave={() => setHoveredMenu(null)}
                  style={{
                    padding: '12px',
                    marginBottom: '5px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: router.pathname === item.path ? '#444' : 'transparent'
                  }}
                >
                  {item.icon} {item.name}
                </div>
              </Link>
              {hoveredMenu === item.name && (
                <div style={{
                  position: 'absolute',
                  left: '250px',
                  top: '0',
                  background: '#333',
                  padding: '10px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  zIndex: 1000
                }}>
                  {item.sub.map(s => <div key={s} style={{ padding: '5px 0' }}>{s}</div>)}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid #444' }}>
          <div>{user.name}</div>
          <button onClick={handleLogout} style={{ marginTop: '10px', padding: '8px', background: '#444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
            退出登录
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
