import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Sidebar.module.css';
import { ROUTES } from '../../utils/constants';

const navItems = [
  { label: 'Home', icon: '🏠', to: ROUTES.HOME },
  { label: 'Products', icon: '📦', to: ROUTES.PRODUCTS },
];

export default function Sidebar({ isCollapsed }) {
  const { logout } = useAuth();

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        {isCollapsed ? '⚡' : '⚡ MyApp'}
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.HOME}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!isCollapsed && <span className={styles.navLabel}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={styles.bottom}>
        <button className={styles.logoutBtn} onClick={logout}>
          <span className={styles.navIcon}>🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
