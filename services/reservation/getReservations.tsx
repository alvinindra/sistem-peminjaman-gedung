import { apiClient } from '@/lib/api';

export async function getReservations(data: any) {
    return apiClient({
        url: '/api/reservasi/',
        method: 'get',
        data,
    });
}
