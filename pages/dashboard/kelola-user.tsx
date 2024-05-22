import { Badge, Button, Flex, Input, Table, Title } from '@mantine/core';
import { IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';

const elements = [
  {
    username: 'connell',
    role: 'Admin',
    nama_pengguna: 'Connell Waldron',
  },
  {
    username: 'marianne',
    role: 'Admin',
    nama_pengguna: 'Marianne Sheridan',
  },
];

export default function KelolaUserPage() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.nama_pengguna}>
      <Table.Td>{element.nama_pengguna}</Table.Td>
      <Table.Td>{element.username}</Table.Td>
      <Table.Td>{element.role}</Table.Td>
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
        <Title size={28}>Kelola Pengguna</Title>
        <Flex gap={16}>
          <Input placeholder="Search..." leftSection={<IconSearch size={16} />} />
          <Button variant="cyan">
            Tambahkan Pengguna <IconPlus size={16} style={{ marginLeft: '8px' }} color="white" />
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
            <Table.Th>Nama Pengguna</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Aksi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
