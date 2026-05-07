import { useEffect, useRef } from 'react';
import { debounce } from '../../utils/helpers';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  const debouncedRef = useRef(debounce(onChange, 400));

  useEffect(() => {
    debouncedRef.current = debounce(onChange, 400);
  }, [onChange]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.input}
        defaultValue={value}
        onChange={(e) => debouncedRef.current(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
