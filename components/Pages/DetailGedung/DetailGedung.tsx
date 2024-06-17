'use client';

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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import DetailGedungCalendar from './DetailGedungCalendar';

export default function DetailGedung() {
  const form = useForm({
    initialValues: {
      name: '',
      start_peminjaman: '',
      end_peminjaman: '',
      deskripsi_kegiatan: '',
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

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
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <Divider />
            <TextInput
              required
              label="Gedung"
              placeholder="Masukkan nama gedung"
              disabled
              value="Gedung Sederhana Sudirman"
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />

            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="Tanggal Mulai Peminjaman"
              placeholder="Pilih Tanggal Mulai Peminjaman"
            />

            <DateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              label="Tanggal Akhir Peminjaman"
              placeholder="Pilih Tanggal Mulai Peminjaman"
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
          <Button mt={24} color="cyan" type="submit" fullWidth>
            Ajukan Peminjaman
          </Button>
        </form>
      </Modal>
    </>
  );
}
