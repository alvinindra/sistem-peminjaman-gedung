import { apiClient } from '@/lib/api';

export async function getBuildings(data?: any, id?: any) {
  return apiClient({
    url: '/api/gedung/',
    method: 'get',
    data,
  });
}
