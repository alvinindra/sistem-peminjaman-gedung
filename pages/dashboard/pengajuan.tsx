import {
  Button,
  Flex,
  Input,
  Table,
  Title,
  Modal,
  Center,
  Text,
  Grid,
  Paper,
  Divider,
  Stack,
  TextInput,
  Select,
} from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { start } from 'repl';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { getAdminJadwal } from '@/lib/api';
import { formatDate } from '@/lib/helper';
import { getReservations } from '@/services/reservation/getReservations';
import { getBuildings } from '@/services/building/getBuildings';
import { requestReservation } from '@/services/reservation/requestReservation';
import { getUsers } from '@/services/user/getUser';
import { parse } from 'path';
import { approveReservation } from '@/services/reservation/approveReservation';
import { notifications } from '@mantine/notifications';

export default function PengajuanPage() {
  const form = useForm({
    initialValues: {
      start_peminjaman: '',
      end_peminjaman: '',
      deskripsi_kegiatan: '',
      id_gedung: '',
      id_peminjam: '',
    },
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [openedTerima, { open: openTerima, close: closeTerima }] = useDisclosure(false);
  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [buildings, setBuildings] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState({} as any);

  const [users, setUsers] = useState([]);
  const handleGetBuilding = async () => {
    try {
      const response = await getBuildings();

      // eslint-disable-next-line max-len
      setBuildings(
        response.data.map((item: { id: any; nama: any }) => ({
          value: item.id.toString(),
          label: item.nama,
        }))
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleGetUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(
        response.data
          .filter((user) => user.role === 'Peminjam')
          .map((item: { id: any; fullname: any }) => ({
            value: item.id.toString(),
            label: item.fullname,
          }))
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleGetData = async () => {
    try {
      const response = await getReservations();

      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['data-pengajuan-jadwal'],
    queryFn: handleGetData,
  });

  const filteredData = data?.data?.filter(
    (item: { id_gedung: any; deskripsi_kegiatan: string; status: string }) =>
      (item?.id_gedung?.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.deskripsi_kegiatan?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      item?.status.toLowerCase() === 'pending'
  );

  const handleRequestApproval = async (reservation, type) => {
    try {
      const payload = {
        id_reservasi: reservation.id,
        status: type,
      };

      const response = await approveReservation(payload);

      if (response?.status === 200) {
        if (type === 'Approved') {
          notifications.show({
            title: 'Berhasil',
            message: 'Peminjaman Berhasil Disetujui',
          });

          closeTerima();
        }

        if (type === 'Rejected') {
          notifications.show({
            title: 'Berhasil',
            message: 'Peminjaman Berhasil Ditolak',
            color: 'red',
          });

          close();
        }
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestReservation = async () => {
    try {
      const response = await requestReservation({
        ...form.values,
        id_gedung: parseInt(form.values.id_gedung),
        id_peminjam: parseInt(form.values.id_peminjam),
      });
      if (response?.status === 201) {
        refetch();

        closeCreate();
        notifications.show({
          title: 'Berhasil',
          message: 'Peminjaman berhasil diajukan',
          color: 'teal',
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleOpenApproval = (reservation: any, type: string) => {
    if (type === 'approve') {
      openTerima();
    } else if (type === 'reject') {
      open();
    }
    setSelectedReservation(reservation);
  };

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
          <Flex gap={8}>
            <Button variant="light" color="gray" onClick={() => handleOpenApproval(item, 'reject')}>
              Tolak
            </Button>
            <Button color="green" onClick={() => handleOpenApproval(item, 'approve')}>
              Terima
            </Button>
          </Flex>
        </Table.Td>
      </Table.Tr>
    )
  );

  useEffect(() => {
    handleGetBuilding();
    handleGetUsers();
  }, []);
  return (
    <>
      <Flex justify="space-between" mb={24}>
        <Title size={28}>Izin Peminjaman Gedung</Title>
        <Flex gap={16}>
          <Input
            placeholder="Search..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            color="cyan"
            onClick={() => {
              openCreate();
            }}
          >
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
        <Table.Tbody>
          {rows?.length > 0
            ? rows
            : rows?.length === 0 && (
                <>
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      <Paper p="xl" ta="center" w="100%">
                        <Text fw={500} c="gray">
                          Tidak ada data izin peminjaman gedung saat ini.
                        </Text>
                      </Paper>
                    </Table.Td>
                  </Table.Tr>
                </>
              )}
        </Table.Tbody>
      </Table>
      <Modal opened={opened} onClose={close} centered padding={32}>
        <Center>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="56" height="56" rx="28" fill="#FED9DF" />
            <path
              d="M21.6357 21.636L34.3637 34.3639"
              stroke="#F9405F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.6357 34.364L34.3637 21.6361"
              stroke="#F9405F"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Center>
        <Center>
          <Text size="xl" fw={600} mt={28}>
            Tolak Peminjaman
          </Text>
        </Center>
        <Center>
          <Text size="md" mt={8} mb={28}>
            Anda akan menolak peminjaman ini, yakin?
          </Text>
        </Center>
        <Grid gutter={8}>
          <Grid.Col span={6}>
            <Button variant="outline" color="red" onClick={close} fullWidth>
              Batal
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              color="red"
              fullWidth
              onClick={() => handleRequestApproval(selectedReservation, 'Rejected')}
            >
              Ya, Tolak
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
      <Modal
        opened={openedCreate}
        onClose={closeCreate}
        centered
        padding={32}
        title={
          <Text size="md" fw={600}>
            Form Peminjaman Gedung
          </Text>
        }
      >
        <form>
          <Stack>
            <Divider />

            <Select
              required
              label="Peminjam"
              placeholder="Masukkan Peminjam Gedung"
              value={form.values.id_peminjam}
              data={users}
              onChange={(_value, option) => form.setFieldValue('id_peminjam', option.value)}
              radius="md"
            />

            <Select
              required
              label="Gedung"
              placeholder="Masukkan nama gedung"
              value={form.values.id_gedung}
              data={buildings}
              onChange={(_value, option) => form.setFieldValue('id_gedung', option.value)}
              radius="md"
            />

            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="Tanggal Mulai Peminjaman"
              placeholder="Pilih Tanggal Mulai Peminjaman"
              value={form.values.start_peminjaman as any}
              onChange={(value: any) => form.setFieldValue('start_peminjaman', value)}
            />

            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="Tanggal Akhir Peminjaman"
              placeholder="Pilih Tanggal Mulai Peminjaman"
              value={form.values.end_peminjaman as any}
              onChange={(value: any) => form.setFieldValue('end_peminjaman', value)}
            />

            <TextInput
              required
              label="Deskripsi Kegiatan"
              placeholder="Masukkan deskripsi kegiatan"
              value={form.values.deskripsi_kegiatan}
              onChange={(event) =>
                form.setFieldValue('deskripsi_kegiatan', event.currentTarget.value)
              }
              radius="md"
            />
          </Stack>
          <Button
            mt={24}
            color="cyan"
            type="button"
            onClick={() => {
              handleRequestReservation();
            }}
            fullWidth
          >
            Ajukan Peminjaman
          </Button>
        </form>
      </Modal>
      <Modal opened={openedTerima} onClose={closeTerima} centered padding={32}>
        <Center>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="56" height="56" rx="28" fill="#CCF1E6" />
            <path
              d="M20 28.6889L25.0909 33.6667L36 23"
              stroke="#00B884"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Center>
        <Center>
          <Text size="xl" fw={600} mt={28}>
            Terima Peminjaman
          </Text>
        </Center>
        <Center>
          <Text size="md" mt={8} mb={28}>
            Anda akan menerima peminjaman ini, yakin?
          </Text>
        </Center>
        <Grid gutter={8}>
          <Grid.Col span={6}>
            <Button variant="outline" color="cyan" onClick={closeTerima} fullWidth>
              Batal
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              color="cyan"
              fullWidth
              onClick={() => handleRequestApproval(selectedReservation, 'Approved')}
            >
              Ya, Terima
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
}
