import { apiClient } from '@/lib/api';

export async function requestReservation(data: any) {
    return apiClient({
        url: '/api/reservasi',
        method: 'post',
        data,
    });
}
