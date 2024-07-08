import { apiClient } from '@/lib/api';

export async function createBuilding(data: any) {
  const formData = new FormData();
  formData.append('nama', data.nama);
  formData.append('alamat', data.alamat);
  formData.append('deskripsi_gedung', data.deskripsi_gedung);
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
