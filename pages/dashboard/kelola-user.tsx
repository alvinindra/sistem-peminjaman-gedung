import {
  Badge,
  Button,
  TextInput,
  PasswordInput,
  Stack,
  Flex,
  Input,
  Table,
  Title,
  Modal,
  Divider,
  Select,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

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
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      role: '' as any,
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

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
          <Button variant="cyan" onClick={open}>
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
      <Modal
        opened={opened}
        onClose={close}
        centered
        padding={32}
        title={
          <Text size="md" fw={600}>
            Form Tambah Pengguna
          </Text>
        }
      >
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <Divider />
            <TextInput
              required
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="Masukkan email"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <Select
              required
              label="Role"
              placeholder="Pilih role"
              value={form.values.role}
              data={[{ value: 'admin', label: 'Administration' }]}
              onChange={(_value, option) => form.setFieldValue('role', option)}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Masukkan password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />

            <PasswordInput
              required
              label="Konfirmasi Password"
              placeholder="Masukkan konfirmasi password"
              value={form.values.confirmPassword}
              onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
              radius="md"
            />
          </Stack>
          <Button mt={24} color="cyan" type="submit" fullWidth>
            Tambahkan Pengguna <IconPlus size={16} style={{ marginLeft: '8px' }} color="white" />
          </Button>
        </form>
      </Modal>
    </>
  );
}
