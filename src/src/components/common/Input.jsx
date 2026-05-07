import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  { label, error, className = '', ...rest },
  ref
) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        ref={ref}
        className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
        {...rest}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
});

export default Input;
