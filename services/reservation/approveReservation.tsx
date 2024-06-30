import { apiClient } from '@/lib/api';

export async function approveReservation(data: any) {
    return apiClient({
        url: '/api/approval/',
        method: 'patch',
        data,
    });
}
