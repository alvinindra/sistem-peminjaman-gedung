import { apiClient } from '@/lib/api';

export async function createUser(data: any) {
    return apiClient({
        url: '/api/register',
        method: 'post',
        data,
    });
}
