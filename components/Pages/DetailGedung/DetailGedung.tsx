import {
  Container,
  Grid,
  Text,
  Card,
  Image,
  Flex,
  Divider,
  Button,
  TextInput,
  Stack,
  Modal,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import DetailGedungCalendar from './DetailGedungCalendar';
import { getBuilding } from '@/services/building/getBuilding';
import { requestReservation } from '@/services/reservation/requestReservation';
import { useGeneralStore } from '@/stores';
import { notifications } from '@mantine/notifications';

export default function DetailGedung() {
  const form = useForm({
    initialValues: {
      start_peminjaman: '',
      end_peminjaman: '',
      deskripsi_kegiatan: '',
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  const params = useParams();

  const {profile } = useGeneralStore();

  const handleGetBuilding = () => {
    try {
      const { id } = params;
      const response = getBuilding(id);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestReservation = () => {
    try {
      const { id } = params;
      const response = requestReservation({
        ...form.values,
        id_gedung: id,

      });

      if (response.status === 201) {
        notifications.show({
          title: 'Berhasil mengajukan peminjaman',
        });
      }

    } catch (error) {
     
      notifications.show({
        title: 'Gagal mengajukan peminjaman',
        message: 'Silahkan coba lagi',

      });
    } finally {
      close();

    }
  
  }

  useEffect(() => {
    // handleGetBuilding();
  }, []);
  return (
    <>
      <Container size="xl" pt={110}>
        <Card shadow="xs" padding={12}>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <Image
                src="/img/bg-login-sistem-peminjaman-gedung2.jpeg"
                width="100%"
                alt="Gedung Sederhana Sudirman"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 9 }}>
              <Grid>
                <Grid.Col span={{ base: 12 }}>
                  <Text size="lg" ta="left" fw={500}>
                    Detail Gedung
                  </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Text size="md" c="dimmed">
                    Nama Gedung
                  </Text>
                  <Text mt={8} mb={16} c="#3A3A3C" size="sm" fw={500}>
                    Gedung Sederhana Sudirman
                  </Text>
                  <Text size="md" c="dimmed">
                    Lokasi Gedung
                  </Text>
                  <Text mt={8} mb={16} c="#3A3A3C" size="sm" fw={500}>
                    Jl Jend. Sudirman
                  </Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Text size="md" c="dimmed">
                    Deskripsi Gedung
                  </Text>
                  <Text mt={8} mb={16} c="#3A3A3C" size="sm" fw={500}>
                    Jumlah Ruang: 5 <br /> <br />
                    Fasilitas:
                    <Flex ml={24}>
                      <ul>
                        <li>Kursi</li>
                        <li>Proyektor</li>
                      </ul>
                    </Flex>
                    <br />
                    Gedung tersebut adalah sebuah bangunan modern dengan arsitektur megah yang
                    menampilkan fasad kaca berkilau, berdiri kokoh di tengah kota sebagai simbol
                    inovasi dan kemajuan teknologi.
                  </Text>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
          <Divider my={32} />
          <Flex>
            <Button mt="xl" ml="auto" size="md" onClick={open}>
              Ajukan Peminjaman
            </Button>
          </Flex>
          <DetailGedungCalendar />
        </Card>
      </Container>

      <Modal
        opened={opened}
        onClose={close}
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

            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="Tanggal Mulai Peminjaman"
              placeholder="Pilih Tanggal Mulai Peminjaman"
              value={form.values.start_peminjaman}
              onChange={(value) => form.setFieldValue('start_peminjaman', value)}
            />

            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="Tanggal Akhir Peminjaman"
              placeholder="Pilih Tanggal Mulai Peminjaman"
              value={form.values.end_peminjaman}
              onChange={(value) => form.setFieldValue('end_peminjaman', value)}
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
          <Button mt={24} color="cyan" type="button" onClick={() => { handleRequestReservation(); }} fullWidth>
            Ajukan Peminjaman
          </Button>
        </form>
      </Modal>
    </>
  );
}
