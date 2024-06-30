import { apiClient } from '@/lib/api';

export async function getReservations() {
    return apiClient({
        url: '/api/reservasi',
        method: 'get',
    });
}
