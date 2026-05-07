import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { authService } from '../services/authService';
import { ROUTES } from '../utils/constants';

export function useAuth() {
  const { token, user, isAuthenticated, setAuth, setToken, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setAuth(data.accessToken, data.refreshToken, {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    });
    toast.success(`Welcome back, ${data.firstName}!`);
    navigate(ROUTES.HOME);
  };

  // Silently refresh the access token using the stored refresh token
  const refreshToken = async () => {
    try {
      const data = await authService.refresh();
      setToken(data.accessToken);
      return data.accessToken;
    } catch {
      clearAuth();
      navigate(ROUTES.LOGIN);
      toast.error('Session expired. Please log in again.');
    }
  };

  const logout = () => {
    clearAuth();
    navigate(ROUTES.LOGIN);
    toast.success('Logged out successfully');
  };

  return { token, user, isAuthenticated, login, logout, refreshToken };
}
