import {
  Button,
  Divider,
  FileInput,
  Flex,
  Grid,
  Image,
  Input,
  Modal,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getBuildings } from '@/services/building/getBuildings';
import { createBuilding } from '@/services/building/createBuilding';
import { editBuilding } from '@/services/building/editBuilding';
import { deleteBuildings } from '@/services/building/deleteBuilding';

export default function KelolaUserPage() {
  const [valueImage, setValueImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: '',
      alamat: '',
      deskripsi_gedung: '',
    },
  });

  const formEdit = useForm({
    initialValues: {
      name: '',
      alamat: '',
      deskripsi_gedung: '',
    },
  });

  const handleGetBuildings = async () => {
    try {
      const response = await getBuildings();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedBuilding, setSelectedBuilding] = useState<any>();

  const [opened, { open, close }] = useDisclosure(false);
  const [openedDetail, { open: openDetail, close: closeDetail }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);

  const [searchQuery, setSearchQuery] = useState('');
  const { data, refetch } = useQuery({
    queryKey: ['admin-data-gedung'],
    queryFn: handleGetBuildings,
  });

  const filteredData = data?.data?.filter(
    (item: { nama: string; alamat: string }) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSetSelected = (building: any, type = 'detail') => {
    setSelectedBuilding(building);

    if (type === 'edit') {
      formEdit.setFieldValue('name', building.nama);
      formEdit.setFieldValue('alamat', building.alamat);
      formEdit.setFieldValue('deskripsi_gedung', building.deskripsi_gedung);
      openEdit();
    } else if (type === 'delete') {
      openDelete();
    } else if (type === 'detail') {
      // handleGetDetailBuilding(building.id);
      openDetail();
    }
  };

  const rows = filteredData?.map(
    (item: { id: number; image: string; nama: string; alamat: string }) => (
      <Table.Tr key={item.id}>
        <Table.Td tt="capitalize">
          <Image
            src={item.image ? item.image : '/img/bg-login-sistem-peminjaman-gedung2.jpeg'}
            h={200}
            w={320}
            mx="auto"
            fallbackSrc="/img/bg-login-sistem-peminjaman-gedung2.jpeg"
            alt={item.nama}
          />
        </Table.Td>
        <Table.Td tt="capitalize">{item.nama}</Table.Td>
        <Table.Td tt="capitalize">{item.alamat}</Table.Td>
        <Table.Td>
          <Flex gap={8}>
            <IconEye
              className="cursor-pointer"
              color="#3A3A3C66"
              onClick={() => handleSetSelected(item, 'detail')}
            />
            <IconEdit
              className="cursor-pointer"
              color="#3A3A3C66"
              onClick={() => handleSetSelected(item, 'edit')}
            />
            <IconTrash
              className="cursor-pointer"
              color="#3A3A3C66"
              onClick={() => handleSetSelected(item, 'delete')}
            />
          </Flex>
        </Table.Td>
      </Table.Tr>
    )
  );

  const handleCreateBuilding = async () => {
    try {
      setIsLoading(true);
      const response = await createBuilding({
        nama: form.values.name,
        alamat: form.values.alamat,
        deskripsi_gedung: form.values.deskripsi_gedung,
        image: valueImage,
      });

      if (response?.status === 201) {
        notifications.show({
          title: 'Berhasil menambahkan gedung',
          message: '',
        });
        close();
        refetch();
      }
    } catch (error) {
      notifications.show({
        title: 'Gagal menambahkan gedung',
        message: 'Silakan coba lagi',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
      form.reset();
      setValueImage(null);
    }
  };

  const handleEditBuilding = async () => {
    try {
      setIsLoading(true);
      const payload = {
        nama: formEdit.values.name,
        alamat: formEdit.values.alamat,
        deskripsi_gedung: formEdit.values.deskripsi_gedung,
        image: valueImage,
      };

      const response = await editBuilding(payload, selectedBuilding.id);

      if (response?.status === 200) {
        notifications.show({
          title: 'Gedung Berhasil Diubah',
          message: '',
        });
        closeEdit();
        refetch();
      }
    } catch (error: any) {
      notifications.show({
        title: 'Gedung Gagal Diubah',
        message: error.response.data.message || 'Silakan coba lagi',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
      setValueImage(null);
    }
  };

  const handleDeleteBuilding = async () => {
    try {
      const response = await deleteBuildings({ id: selectedBuilding.id });
      if (response?.status === 204) {
        notifications.show({
          title: 'Gedung Berhasil Dihapus',
          message: '',
        });
        closeDelete();
        refetch();
      }
    } catch (error: any) {
      notifications.show({
        title: 'Gedung Gagal Dihapus',
        message: error.response.data.message || 'Silakan coba lagi',
        color: 'red',
      });
    }
  };

  return (
    <>
      <Flex justify="space-between" mb={24}>
        <Title size={28}>Kelola Gedung</Title>
        <Flex gap={16}>
          <Input
            placeholder="Search..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="cyan" onClick={open}>
            Tambahkan Gedung <IconPlus size={16} style={{ marginLeft: '8px' }} color="white" />
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
            <Table.Th ta="center">Gambar Gedung</Table.Th>
            <Table.Th>Nama Gedung</Table.Th>
            <Table.Th>Alamat Gedung</Table.Th>
            {/* <Table.Th>Status</Table.Th> */}
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
            Form Tambah Gedung
          </Text>
        }
      >
        <form
          onSubmit={form.onSubmit(() => {
            handleCreateBuilding();
          })}
        >
          <Stack>
            <Divider />
            <TextInput
              required
              label="Nama Gedung"
              placeholder="Masukkan nama gedung"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
            <TextInput
              required
              label="Alamat"
              placeholder="Masukkan alamat lengkap"
              value={form.values.alamat}
              onChange={(event) => form.setFieldValue('alamat', event.currentTarget.value)}
              radius="md"
            />
            <Textarea
              required
              label="Deskripsi"
              placeholder="Masukkan deskripsi"
              value={form.values.deskripsi_gedung}
              onChange={(event) =>
                form.setFieldValue('deskripsi_gedung', event.currentTarget.value)
              }
              radius="md"
            />
            <FileInput
              accept="image/png,image/jpeg"
              label="Unggah Gambar"
              placeholder="Unggah gambar gedung"
              value={valueImage}
              onChange={setValueImage}
            />
          </Stack>
          <Button mt={24} color="cyan" type="submit" fullWidth loading={isLoading}>
            Tambahkan Gedung <IconPlus size={16} style={{ marginLeft: '8px' }} color="white" />
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
            Form Edit Gedung
          </Text>
        }
      >
        <form
          onSubmit={formEdit.onSubmit(() => {
            handleEditBuilding();
          })}
        >
          <Stack>
            <Divider />
            <TextInput
              required
              label="Nama Gedung"
              placeholder="Masukkan nama gedung"
              value={formEdit.values.name}
              onChange={(event) => formEdit.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />

            <TextInput
              required
              label="Alamat"
              placeholder="Masukkan alamat lengkap"
              value={formEdit.values.alamat}
              onChange={(event) => formEdit.setFieldValue('alamat', event.currentTarget.value)}
              radius="md"
            />

            <Textarea
              required
              label="Deskripsi"
              placeholder="Masukkan deskripsi"
              value={formEdit.values.deskripsi_gedung}
              onChange={(event) =>
                formEdit.setFieldValue('deskripsi_gedung', event.currentTarget.value)
              }
              radius="md"
            />

            <FileInput
              accept="image/png,image/jpeg"
              label="Unggah Gambar"
              placeholder="Unggah gambar gedung"
              value={valueImage}
              onChange={setValueImage}
            />
          </Stack>
          <Button mt={24} color="cyan" type="submit" fullWidth>
            Edit Gedung <IconEdit size={16} style={{ marginLeft: '8px' }} color="white" />
          </Button>
        </form>
      </Modal>

      <Modal
        opened={openedDetail}
        onClose={closeDetail}
        centered
        size="lg"
        padding={32}
        title={
          <Text size="md" fw={600}>
            Detail Gedung {selectedBuilding?.nama}
          </Text>
        }
      >
        <Grid>
          <Grid.Col span={12}>
            <Text size="md" c="#3A3A3C99">
              Nama Gedung
            </Text>
            <Text size="md" mt={8} mb={16}>
              {selectedBuilding?.nama}
            </Text>
            <Text size="md" c="#3A3A3C99">
              Lokasi Gedung
            </Text>
            <Text size="md" mt={8} mb={16}>
              {selectedBuilding?.alamat}
            </Text>
            {/* <Text size="md" c="#3A3A3C99">
              Deskripsi Gedung
            </Text>
            <Text size="md" mt={8} mb={16}>
              Jumlah Ruang: 5
              <br />
              Fasilitas: <br />
              - Kursi
              <br />
              - Proyektor
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem architecto dolores culpa
              animi, maiores quo beatae soluta a voluptatibus doloremque nesciunt esse odit?
              Officiis cupiditate sed saepe, perspiciatis veniam deserunt?
            </Text> */}
          </Grid.Col>
        </Grid>
      </Modal>
      <Modal
        opened={openedDelete}
        onClose={closeDelete}
        centered
        padding={32}
        title={
          <Text size="md" fw={600}>
            Hapus Gedung
          </Text>
        }
      >
        <Text>Apakah anda yakin ingin menghapus Gedung ini?</Text>
        <Button
          mt={24}
          color="red"
          fullWidth
          onClick={() => {
            handleDeleteBuilding();
          }}
        >
          Hapus Gedung <IconTrash size={16} style={{ marginLeft: '8px' }} color="white" />
        </Button>
      </Modal>
    </>
  );
}
