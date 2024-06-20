import axios from 'axios';
import Cookies from 'js-cookie';

export const apiClient = axios.create({
  baseURL: String(process.env.API_URL),
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export async function getDaftarGedung() {
  const data = await apiClient.get('/api/gedung/');
  return data;
}

export async function getAdminJadwal() {
  const data = await apiClient.get('/api/reservasi');
  return data;
}
