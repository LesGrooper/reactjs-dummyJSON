import styles from './Pagination.module.css';
import Button from './Button';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      <Button
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Prev
      </Button>

      <div className={styles.pages}>
        {pages.map((p) => (
          <button
            key={p}
            className={`${styles.page} ${p === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </Button>
    </div>
  );
}
