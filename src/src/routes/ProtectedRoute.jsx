import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { ROUTES } from '../utils/constants';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
}
