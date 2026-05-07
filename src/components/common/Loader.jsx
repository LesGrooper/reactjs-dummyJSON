import styles from './Loader.module.css';

export function Loader({ size = 'md', fullPage = false }) {
  const spinner = (
    <div className={`${styles.spinner} ${styles[size]}`} role="status" aria-label="Loading" />
  );

  if (fullPage) {
    return <div className={styles.fullPage}>{spinner}</div>;
  }
  return spinner;
}

export function SkeletonRow({ cols = 6 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i}>
          <div className={styles.skeleton} />
        </td>
      ))}
    </tr>
  );
}
