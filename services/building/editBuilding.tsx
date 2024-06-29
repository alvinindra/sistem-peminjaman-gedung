import { apiClient } from '@/lib/api';

export async function editBuilding(data: any, id: any) {
    return apiClient({
        url: '/api/gedung/' + id,
        method: 'post',
        data,
    });
}
