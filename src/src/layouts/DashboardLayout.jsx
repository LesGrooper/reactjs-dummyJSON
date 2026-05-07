import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar isCollapsed={collapsed} />
      <div className={styles.main}>
        <Navbar onToggleSidebar={() => setCollapsed((c) => !c)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
