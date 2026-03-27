import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

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
      {/* 侧边栏 */}
      <div style={{ width: collapsed ? '60px' : '260px', background: '#202123', color: 'white', transition: 'width 0.3s', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #444' }}>
          {!collapsed && <h2>海南大成律所</h2>}
        </div>

        <nav style={{ flex: 1, padding: '10px' }}>
          <Link href="/"><div style={{ padding: '12px', marginBottom: '5px', borderRadius: '6px', cursor: 'pointer' }}>🏠 {!collapsed && '首页'}</div></Link>
          <Link href="/chat"><div style={{ padding: '12px', marginBottom: '5px', borderRadius: '6px', cursor: 'pointer' }}>💬 {!collapsed && 'AI对话'}</div></Link>
          <div style={{ margin: '10px 0', borderTop: '1px solid #444' }}></div>
          <Link href="/case-manager"><div style={{ padding: '12px', marginBottom: '5px', borderRadius: '6px', cursor: 'pointer' }}>📋 {!collapsed && '案件管理'}</div></Link>
          <Link href="/crm"><div style={{ padding: '12px', marginBottom: '5px', borderRadius: '6px', cursor: 'pointer' }}>👥 {!collapsed && '客户关系'}</div></Link>
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid #444' }}>
          {!collapsed && <div>{user.name}</div>}
          <button onClick={handleLogout} style={{ marginTop: '10px', padding: '8px', background: '#444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
            {!collapsed ? '退出登录' : '🚪'}
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
