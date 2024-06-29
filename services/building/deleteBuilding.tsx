import { apiClient } from '@/lib/api';

export async function deleteBuildings(data: any) {
    return apiClient({
        url: '/api/gedung/delete',
        method: 'post',
        data,
    });
}
