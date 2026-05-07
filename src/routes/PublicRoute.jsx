import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { ROUTES } from '../utils/constants';

// Public route: redirect to home if already authenticated
export default function PublicRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
}
