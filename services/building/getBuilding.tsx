import { apiClient } from '@/lib/api';

export async function getBuilding(id) {
    return apiClient({
        url: '/api/gedung/' + id,
        method: 'post',
        data,
    });
}
