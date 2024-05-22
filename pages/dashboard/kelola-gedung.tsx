import { Badge, Button, Flex, Input, Table, Title } from '@mantine/core';
import { IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';

const elements = [
  {
    alamat_gedung: 'Jln. Peckham House',
    nama_gedung: 'Gedung A',
  },
  {
    alamat_gedung: 'Jln. Peckham House',
    nama_gedung: 'Gedung B',
  },
  {
    alamat_gedung: 'Regent’s Canal',
    nama_gedung: 'Gedung C',
  },
  {
    alamat_gedung: 'Old Naval College',
    nama_gedung: 'Gedung D',
  },
  {
    alamat_gedung: 'Ezra Street Market',
    nama_gedung: 'Gedung E',
  },
];

export default function KelolaUserPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.nama_gedung}>
      <Table.Td>{element.nama_gedung}</Table.Td>
      <Table.Td>{element.alamat_gedung}</Table.Td>
      <Table.Td>
        <Badge variant="outline" color="green">
          Aktif
        </Badge>
      </Table.Td>
      <Table.Td>
        <Flex gap={8}>
          <IconEye className="cursor-pointer" color="#3A3A3C66" />
          <IconEdit className="cursor-pointer" color="#3A3A3C66" />
          <IconTrash className="cursor-pointer" color="#3A3A3C66" />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex justify="space-between" mb={24}>
        <Title size={28}>Kelola Gedung</Title>
        <Flex gap={16}>
          <Input placeholder="Search..." leftSection={<IconSearch size={16} />} />
          <Button variant="cyan">
            Tambahkan Gedung <IconPlus size={16} style={{ marginLeft: '8px' }} color="white" />
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
            <Table.Th>Alamat Gedung</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
