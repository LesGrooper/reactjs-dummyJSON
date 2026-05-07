import axiosInstance from '../api/axiosInstance';
import { STORAGE_KEYS } from '../utils/constants';

// Fallback user — matches the real DummyJSON response shape exactly
// Used only when the real API is rate-limited (429)
const FALLBACK_USERS = {
  emilys: {
    password: 'emilyspass',
    response: {
      id: 1,
      username: 'emilys',
      email: 'emily.johnson@x.dummyjson.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      gender: 'female',
      image: 'https://dummyjson.com/icon/emilys/128',
      accessToken: 'fallback-token-emilys',
      refreshToken: 'fallback-refresh-emilys',
    },
  },
};

export const authService = {
  async login(username, password) {
    try {
      // Always try the real API first
      const { data } = await axiosInstance.post('/auth/login', {
        username,
        password,
        expiresInMins: 30,
      });
      return data;
    } catch (err) {
      // Fallback on rate-limit only
      if (err.isRateLimit) {
        const match = FALLBACK_USERS[username];
        if (!match) {
          throw new Error('Invalid credentials.');
        }
        if (match.password !== password) {
          throw new Error('Invalid credentials. Please check your username and password.');
        }
        return match.response;
      }
      throw err;
    }
  },

  async getMe() {
    const { data } = await axiosInstance.get('/auth/me');
    return data;
  },

  async refresh() {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    const { data } = await axiosInstance.post('/auth/refresh', {
      refreshToken,
      expiresInMins: 30,
    });
    return data;
  },
};

