import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required';
    if (!form.password.trim()) e.password = 'Password is required';
    else if (form.password.length < 4) e.password = 'Password is too short';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setLoading(true);
    setApiError('');
    try {
      await login(form.username, form.password);
    } catch (err) {
      setApiError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>⚡</div>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="Username"
            type="text"
            placeholder="emilys"
            value={form.username}
            onChange={handleChange('username')}
            error={errors.username}
            autoComplete="username"
          />

          <div className={styles.passwordWrapper}>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.showPasswordBtn}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {apiError && <p className={styles.apiError}>{apiError}</p>}

          <Button
            type="submit"
            loading={loading}
            className={styles.submitBtn}
          >
            Sign In
          </Button>
        </form>

        <p className={styles.hint}>
          Demo: <strong>emilys</strong> / <strong>emilyspass</strong>
        </p>
      </Card>
    </div>
  );
}
