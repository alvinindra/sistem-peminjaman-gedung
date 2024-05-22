import { Button, Flex, Input, Table, Title } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';

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

export default function PengajuanPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.nama_gedung}>
      <Table.Td>{element.nama_gedung}</Table.Td>
      <Table.Td>{element.tanggal_peminjam}</Table.Td>
      <Table.Td>{element.peminjam}</Table.Td>
      <Table.Td>{element.kegiatan}</Table.Td>
      <Table.Td>
        <Flex gap={8}>
          <Button variant="light" color="gray">
            Tolak
          </Button>
          <Button color="green">Terima</Button>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex justify="space-between" mb={24}>
        <Title size={28}>Izin Peminjaman Gedung</Title>
        <Flex gap={16}>
          <Input placeholder="Search..." leftSection={<IconSearch size={16} />} />
          <Button color="cyan">
            Ajukan Peminjaman <IconPlus size={16} style={{ marginLeft: '8px' }} color="white" />
          </Button>
        </Flex>
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
            <Table.Th>Perizinan</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
