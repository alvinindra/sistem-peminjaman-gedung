import { Badge, Flex, Input, Table, Title } from '@mantine/core';
import { IconEye, IconSearch } from '@tabler/icons-react';

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
  const rows = elements.map((element) => (
    <Table.Tr key={element.nama_gedung}>
      <Table.Td>{element.nama_gedung}</Table.Td>
      <Table.Td>{element.tanggal_peminjam}</Table.Td>
      <Table.Td>{element.peminjam}</Table.Td>
      <Table.Td>{element.kegiatan}</Table.Td>
      <Table.Td>
        <Badge variant="outline" color="blue">
          Berlangsung
        </Badge>
      </Table.Td>
      <Table.Td>
        <Flex gap={8}>
          <IconEye className="cursor-pointer" color="#3A3A3C66" />
          {/* <IconEdit className="cursor-pointer" color="#3A3A3C66" />
          <IconTrash className="cursor-pointer" color="#3A3A3C66" /> */}
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex justify="space-between" mb={24}>
        <Title size={28}>Jadwal Gedung</Title>
        <Input placeholder="Search..." leftSection={<IconSearch size={16} />} />
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
            <Table.Th>Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
