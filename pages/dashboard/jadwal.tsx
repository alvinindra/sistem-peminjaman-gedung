import { getAdminJadwal } from '@/lib/api';
import { formatDate } from '@/lib/helper';
import { Badge, Flex, Input, Table, Title } from '@mantine/core';
import { getFormattedDate } from '@mantine/dates';
import { IconEye, IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const elements = [
  {
    peminjam: 'Oliver',
    kegiatan: 'Pernikahan',
    tanggal_peminjam: '26 April 2024 08.00 - 12.00',
    nama_gedung: 'Gedung A',
  },
  {
    peminjam: 'Hadley',
    kegiatan: 'Pernikahan',
    tanggal_peminjam: '26 April 2024 08.00 - 12.00',
    nama_gedung: 'Gedung B',
  },
  {
    peminjam: 'Tom Hansen',
    kegiatan: 'Depresi',
    tanggal_peminjam: '27 April 2024 08.00 - 12.00',
    nama_gedung: 'Gedung C',
  },
  {
    peminjam: 'Summer',
    kegiatan: 'Nangis',
    tanggal_peminjam: '28 April 2024 08.00 - 12.00',
    nama_gedung: 'Gedung D',
  },
  {
    peminjam: 'Marianne',
    kegiatan: 'Me Time',
    tanggal_peminjam: '29 April 2024 08.00 - 12.00',
    nama_gedung: 'Gedung E',
  },
];

export default function JadwalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['data-jadwal'],
    queryFn: getAdminJadwal,
  });

  const filteredData = data?.data?.filter(
    (item: { nama_gedung: string; deskripsi_kegiatan: string }) =>
      item?.nama_gedung?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.deskripsi_kegiatan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = filteredData?.map(
    (item: {
      id: number;
      nama_gedung: string;
      start_peminjaman: string;
      end_peminjaman: string;
      peminjam: string;
      deskripsi_kegiatan: string;
      status: string;
    }) => (
      <Table.Tr key={item.id}>
        <Table.Td>{item?.nama_gedung}</Table.Td>
        <Table.Td>{formatDate(item?.start_peminjaman, item?.end_peminjaman)}</Table.Td>
        <Table.Td>{item?.peminjam}</Table.Td>
        <Table.Td tt="capitalize">{item?.deskripsi_kegiatan}</Table.Td>
        <Table.Td>
          <Badge
            variant="outline"
            color={
              item?.status?.toLowerCase() === 'rejected'
                ? 'red'
                : item?.status?.toLowerCase() === 'approved'
                  ? 'blue'
                  : 'green'
            }
          >
            {item?.status}
          </Badge>
        </Table.Td>
        {/*<Table.Td>
          <Flex gap={8}>
            <IconEye className="cursor-pointer" color="#3A3A3C66" />
            <IconEdit className="cursor-pointer" color="#3A3A3C66" />
          <IconTrash className="cursor-pointer" color="#3A3A3C66" />
          </Flex>
        </Table.Td> */}
      </Table.Tr>
    )
  );

  return (
    <>
      <Flex justify="space-between" mb={24}>
        <Title size={28}>Jadwal Gedung</Title>
        <Input
          placeholder="Search..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Flex>
      <Table
        stickyHeader
        stickyHeaderOffset={60}
        verticalSpacing="sm"
        horizontalSpacing="lg"
        withTableBorder
      >
        <Table.Thead>
          <Table.Tr className="spgp-table-header">
            <Table.Th>Nama Gedung</Table.Th>
            <Table.Th>Tanggal Peminjaman</Table.Th>
            <Table.Th>Peminjam</Table.Th>
            <Table.Th>Kegiatan</Table.Th>
            <Table.Th>Status</Table.Th>
            {/* <Table.Th>Aksi</Table.Th> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
