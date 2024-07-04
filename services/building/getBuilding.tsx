import { apiClient } from '@/lib/api';

export async function getBuilding(id) {
  return apiClient({
    url: `/api/gedung/details/${id}`,
    method: 'get',
  });
}
