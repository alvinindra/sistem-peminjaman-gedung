import { apiClient } from '@/lib/api';

export async function editBuilding(data: any, id: any) {
  const formData = new FormData();
  data.nama && formData.append('nama', data.nama);
  data.alamat && formData.append('alamat', data.alamat);
  data.deskripsi_gedung && formData.append('deskripsi_gedung', data.deskripsi_gedung);
  data.image && formData.append('image', data.image);

  return apiClient({
    url: `/api/gedung/${id}`,
    method: 'patch',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
