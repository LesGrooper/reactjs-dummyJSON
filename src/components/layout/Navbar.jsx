import { useAuth } from '../../hooks/useAuth';
import { useDarkMode } from '../../hooks/useDarkMode';
import styles from './Navbar.module.css';

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useDarkMode();

  return (
    <header className={styles.navbar}>
      <button className={styles.menuBtn} onClick={onToggleSidebar} aria-label="Toggle sidebar">
        ☰
      </button>

      <span className={styles.brand}>MyApp</span>

      <div className={styles.right}>
        <button className={styles.themeBtn} onClick={toggle} aria-label="Toggle dark mode">
          {isDark ? '☀️' : '🌙'}
        </button>
        {user && (
          <>
            <img
              className={styles.avatar}
              src={user.image || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=6366f1&color=fff`}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <span className={styles.username}>
              {user.firstName} {user.lastName}
            </span>
            <button className={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
