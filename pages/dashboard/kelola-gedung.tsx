import { getDaftarGedung } from '@/lib/api';
import { createBuilding } from '@/services/building/createBuilding';
import { getBuildings } from '@/services/building/getBuildings';
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
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
import { IconEdit, IconEye, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function KelolaUserPage() {
  const form = useForm({
    initialValues: {
      name: '',
      alamat: '',
      deskripsi: '',
    },
  });

  const handleGetBuildings = async () => {
    try {
      const response = await getBuildings();
      return response
    } catch (error) {
      console.error(error);
    }
  }

  const [buildings, setBuildings] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDetail, { open: openDetail, close: closeDetail }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-data-gedung'],
    queryFn: handleGetBuildings,
  });



  const filteredData = data?.data?.filter(
    (item: { nama: string; alamat: string }) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = filteredData?.map(
    (item: { image: string; id: number; nama: string; alamat: string }) => (
      <Table.Tr key={item.id}>
        <Table.Td tt="capitalize">{item.nama}</Table.Td>
        <Table.Td tt="capitalize">{item.alamat}</Table.Td>
        {/* <Table.Td>
        <Badge variant="outline" color="green">
          Aktif
        </Badge>
      </Table.Td> */}
        <Table.Td>
          <Flex gap={8}>
            <IconEye className="cursor-pointer" color="#3A3A3C66" onClick={openDetail} />
            <IconEdit className="cursor-pointer" color="#3A3A3C66" />
            <IconTrash className="cursor-pointer" color="#3A3A3C66" />
          </Flex>
        </Table.Td>
      </Table.Tr>
    )
  );

  const handleCreateBuilding = async () => {
    try {
     const response = await createBuilding({
      nama: form.values.name,
      alamat: form.values.alamat,
     });

     refetch();
     console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

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
        stickyHeaderOffset={60}
        verticalSpacing="sm"
        horizontalSpacing="lg"
        withTableBorder
      >
        <Table.Thead>
          <Table.Tr className="spgp-table-header">
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
        <form onSubmit={form.onSubmit(() => {handleCreateBuilding()})}>
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

            {/* <Textarea
              required
              label="Deskripsi"
              placeholder="Masukkan deskripsi"
              value={form.values.deskripsi}
              onChange={(event) => form.setFieldValue('deskripsi', event.currentTarget.value)}
              radius="md"
            /> */}
          </Stack>
          <Button mt={24} color="cyan" type="submit" fullWidth>
            Tambahkan Gedung <IconPlus size={16} style={{ marginLeft: '8px' }} color="white" />
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
            Detail Gedung A
          </Text>
        }
      >
        <Grid>
          <Grid.Col span={12}>
            <Text size="md" c="#3A3A3C99">
              Nama Gedung
            </Text>
            <Text size="md" mt={8} mb={16}>
              Gedung Serbaguna Sudirman
            </Text>
            <Text size="md" c="#3A3A3C99">
              Lokasi Gedung
            </Text>
            <Text size="md" mt={8} mb={16}>
              JL Jendral Sudirman
            </Text>
            <Text size="md" c="#3A3A3C99">
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
            </Text>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
}
