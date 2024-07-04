import { apiClient } from '@/lib/api';

export async function createBuilding(data: any) {
  const formData = new FormData();
  formData.append('nama', data.nama);
  formData.append('alamat', data.alamat);
  formData.append('deskripsi', data.deskripsi);
  formData.append('image', data.image);

  return apiClient({
    url: '/api/gedung/create',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
