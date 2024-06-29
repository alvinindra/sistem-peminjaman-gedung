import { apiClient } from '@/lib/api';

export async function getUsers(data: any) {
    return apiClient({
        url: '/api/users',
        method: 'get',
        data,
    });
}
