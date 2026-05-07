import useAuthStore from '../store/authStore';
import Card from '../components/common/Card';
import styles from './HomePage.module.css';

export default function HomePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className={styles.page}>
      <Card className={styles.welcomeCard}>
        <div className={styles.avatar}>
          <img
            src={
              user?.image ||
              `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&size=80&background=6366f1&color=fff`
            }
            alt={`${user?.firstName} ${user?.lastName}`}
          />
        </div>
        <h1 className={styles.welcome}>
          Welcome user: {user?.firstName} {user?.lastName}
        </h1>
        <p className={styles.sub}>
          You are logged in as <strong>{user?.username}</strong> · {user?.email}
        </p>
      </Card>

      <div className={styles.statsGrid}>
        {[
          { label: 'Total Products', value: '100+', icon: '📦' },
          { label: 'Categories', value: '10+', icon: '🗂️' },
          { label: 'Brands', value: '20+', icon: '🏷️' },
        ].map((stat) => (
          <Card key={stat.label} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
