import { apiClient } from '@/lib/api';

export async function deleteUser(data: any) {
    return apiClient({
        url: '/api/users/delete/',
        method: 'delete',
        data,
    });
}
