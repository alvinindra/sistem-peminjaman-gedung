import { apiClient } from '@/lib/api';

export async function editUser(data: any, id: any) {
    return apiClient({
        url: '/api/users/' + id,
        method: 'patch',
        data,
    });
}
