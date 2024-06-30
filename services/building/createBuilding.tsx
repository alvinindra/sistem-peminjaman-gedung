import { apiClient } from '@/lib/api';

export async function createBuilding(data: any) {
    return apiClient({
        url: '/api/gedung/create',
        method: 'post',
        data,
    });
}
