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
  Grid,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { createUser } from '@/services/user/createUser';
import { getUsers } from '@/services/user/getUser';
import { editUser } from '@/services/user/editUser';
import { deleteUser } from '@/services/user/deleteUser';

export default function KelolaUserPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      fullname: '',
      username: '',
      email: '',
      role: '' as any,
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Email tidak valid'),
      password: (val) => (val.length <= 6 ? 'Password minimal 6 karakter' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords tidak sama' : null,
    },
  });

  console.log(form.errors);

  const formEdit = useForm({
    fullname: '',
    username: '',
    role: '',
  } as any);

  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [openedDetail, { open: openDetail, close: closeDetail }] = useDisclosure(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({} as any);

  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = users?.filter(
    (item: { fullname: string; username: string }) =>
      item.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGetUser = async () => {
    try {
      const response = await getUsers();

      setUsers(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    try {
      setIsLoading(true);
      const payload = {
        fullname: form.values.fullname,
        username: form.values.username,
        role: form.values.role,
        email: form.values.email,
        password: form.values.password,
      };

      const response = await createUser(payload);

      if (response?.status === 201) {
        notifications.show({
          title: 'User Berhasil Dibuat',
          message: '',
        });
        close();
        handleGetUser();
      }
    } catch (error: any) {
      notifications.show({
        title: 'User Gagal Dibuat',
        message: error.response.data.message || 'Silakan coba lagi',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  const handleEditUser = async () => {
    try {
      setIsLoading(true);
      const payload = {
        fullname: formEdit.values.fullname,
        username: formEdit.values.username,
        role: formEdit.values.role,
      };

      const response = await editUser(payload, selectedUser.id);

      if (response?.status === 200) {
        notifications.show({
          title: 'User Berhasil Diubah',
          message: '',
        });
        closeEdit();
        handleGetUser();
      }
    } catch (error: any) {
      notifications.show({
        title: 'User Gagal Diubah',
        message: error.response.data.message || 'Silakan coba lagi',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser({ id: selectedUser.id });
      if (response?.status === 204) {
        notifications.show({
          title: 'User Berhasil Dihapus',
          message: '',
        });
        closeDelete();
        handleGetUser();
      }
    } catch (error: any) {
      notifications.show({
        title: 'User Gagal Dihapus',
        message: error.response.data.message || 'Silakan coba lagi',
        color: 'red',
      });
    }
  };

  const handleSetSelected = (user: any, type = 'detail') => {
    setSelectedUser(user);

    if (type === 'edit') {
      formEdit.setFieldValue('fullname', user.fullname);
      formEdit.setFieldValue('username', user.username);
      formEdit.setFieldValue('role', user.role);
      formEdit.setFieldValue('email', user.email);
      openEdit();
    } else if (type === 'delete') {
      openDelete();
    } else if (type === 'detail') {
      openDetail();
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const rows = filteredData.map((user: any) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.fullname}</Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>
        <Badge variant="outline" color={user.is_active ? 'green' : 'red'}>
          {user.is_active ? 'Aktif' : 'Tidak Aktif'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Flex gap={8}>
          <IconEye
            className="cursor-pointer"
            color="#3A3A3C66"
            onClick={() => {
              handleSetSelected(user, 'detail');
            }}
          />
          <IconEdit
            className="cursor-pointer"
            color="#3A3A3C66"
            onClick={() => {
              handleSetSelected(user, 'edit');
            }}
          />
          <IconTrash
            className="cursor-pointer"
            color="#3A3A3C66"
            onClick={() => {
              handleSetSelected(user, 'delete');
            }}
          />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex justify="space-between" mb={24}>
        <Title size={28}>Kelola Pengguna</Title>
        <Flex gap={16}>
          <Input
            placeholder="Search..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="cyan" onClick={open}>
            Tambahkan Pengguna <IconPlus size={16} style={{ marginLeft: '8px' }} color="white" />
          </Button>
        </Flex>
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
            <Table.Th>Nama Pengguna</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Email</Table.Th>
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
        <form
          onSubmit={form.onSubmit(() => {
            handleAddUser();
          })}
        >
          <Stack>
            <Divider />
            <TextInput
              required
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              value={form.values.fullname}
              onChange={(event) => form.setFieldValue('fullname', event.currentTarget.value)}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="Masukkan email"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              radius="md"
              {...form.getInputProps('email')}
            />

            <TextInput
              required
              label="Username"
              placeholder="Masukkan username"
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              radius="md"
            />

            <Select
              required
              label="Role"
              placeholder="Pilih role"
              value={form.values.role}
              data={[
                { value: 'Admin', label: 'Administration' },
                { value: 'Peminjam', label: 'Peminjam' },
              ]}
              onChange={(_value, option) => form.setFieldValue('role', option.value)}
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
              {...form.getInputProps('password')}
            />

            <PasswordInput
              required
              label="Konfirmasi Password"
              placeholder="Masukkan konfirmasi password"
              value={form.values.confirmPassword}
              onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
              radius="md"
              {...form.getInputProps('confirmPassword')}
            />
          </Stack>
          <Button mt={24} color="cyan" type="submit" loading={isLoading} fullWidth>
            Tambahkan Pengguna <IconPlus size={16} style={{ marginLeft: '8px' }} color="white" />
          </Button>
        </form>
      </Modal>
      <Modal
        opened={openedEdit}
        onClose={closeEdit}
        centered
        padding={32}
        title={
          <Text size="md" fw={600}>
            Form Edit Pengguna
          </Text>
        }
      >
        <form
          onSubmit={formEdit.onSubmit(() => {
            handleEditUser();
          })}
        >
          <Stack>
            <Divider />
            <TextInput
              required
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              value={formEdit.values.fullname}
              onChange={(event) => formEdit.setFieldValue('fullname', event.currentTarget.value)}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="Masukkan email"
              value={formEdit.values.email}
              onChange={(event) => formEdit.setFieldValue('email', event.currentTarget.value)}
              radius="md"
              disabled
            />

            <TextInput
              required
              label="Username"
              placeholder="Masukkan username"
              value={formEdit.values.username}
              onChange={(event) => formEdit.setFieldValue('username', event.currentTarget.value)}
              radius="md"
            />

            <Select
              required
              label="Role"
              placeholder="Pilih role"
              value={formEdit.values.role}
              data={[
                { value: 'Admin', label: 'Administration' },
                { value: 'Peminjam', label: 'Peminjam' },
              ]}
              onChange={(_value, option) => formEdit.setFieldValue('role', option.value)}
              radius="md"
            />
          </Stack>
          <Button mt={24} color="cyan" type="submit" fullWidth loading={isLoading}>
            Edit Pengguna <IconEdit size={16} style={{ marginLeft: '8px' }} color="white" />
          </Button>
        </form>
      </Modal>
      <Modal
        opened={openedDelete}
        onClose={closeDelete}
        centered
        padding={32}
        title={
          <Text size="md" fw={600}>
            Hapus Pengguna
          </Text>
        }
      >
        <Text>Apakah anda yakin ingin menghapus pengguna ini?</Text>
        <Button
          mt={24}
          color="red"
          fullWidth
          onClick={() => {
            handleDeleteUser();
          }}
        >
          Hapus Pengguna <IconTrash size={16} style={{ marginLeft: '8px' }} color="white" />
        </Button>
      </Modal>
      <Modal
        opened={openedDetail}
        onClose={closeDetail}
        centered
        padding={32}
        title={
          <Text size="md" fw={600}>
            Detail Pengguna
          </Text>
        }
      >
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, lg: 9 }}>
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Text size="md" c="dimmed">
                  Nama Lengkap
                </Text>
                <Text mt={8} mb={16} c="#3A3A3C" size="sm" fw={500}>
                  {selectedUser.fullname}
                </Text>
                <Text size="md" c="dimmed">
                  Username
                </Text>
                <Text mt={8} mb={16} c="#3A3A3C" size="sm" fw={500}>
                  {selectedUser.username}
                </Text>
                <Text size="md" c="dimmed">
                  Role
                </Text>
                <Text mt={8} mb={16} c="#3A3A3C" size="sm" fw={500}>
                  {selectedUser.role}
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
}
