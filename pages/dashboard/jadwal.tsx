import { Badge, Flex, Input, Paper, Table, Text, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { formatDate } from '@/lib/helper';
import { getAdminJadwal } from '@/lib/api';

export default function JadwalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data } = useQuery({
    queryKey: ['data-jadwal'],
    queryFn: getAdminJadwal,
  });

  const filteredData = data?.data.Message
    ? data?.data?.filter(
        (item: { id_gedung: any; deskripsi_kegiatan: string; status: string }) =>
          item?.id_gedung?.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.deskripsi_kegiatan?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const rows = filteredData?.map(
    (item: {
      id: number;
      id_gedung: any;
      start_peminjaman: string;
      end_peminjaman: string;
      id_peminjam: any;
      deskripsi_kegiatan: string;
      status: string;
    }) => (
      <Table.Tr key={item.id}>
        <Table.Td tt="capitalize">{item?.id_gedung?.nama ? item?.id_gedung?.nama : '-'}</Table.Td>
        <Table.Td>{formatDate(item?.start_peminjaman, item?.end_peminjaman)}</Table.Td>
        <Table.Td tt="capitalize">
          {item?.id_peminjam?.fullname ? item?.id_peminjam?.fullname : '-'}
        </Table.Td>
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
        stickyHeaderOffset={0}
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
        <Table.Tbody>
          {rows?.length > 0
            ? rows
            : rows?.length === 0 && (
                <>
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      <Paper p="xl" ta="center" w="100%">
                        <Text fw={500} c="gray">
                          Tidak ada data jadwal gedung.
                        </Text>
                      </Paper>
                    </Table.Td>
                  </Table.Tr>
                </>
              )}
        </Table.Tbody>
      </Table>
    </>
  );
}
