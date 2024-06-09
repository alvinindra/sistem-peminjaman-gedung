import { Button, Flex, Input, Table, Title, Modal, Center, Text, Grid } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

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
  const [opened, { open, close }] = useDisclosure(false);
  const [openedTerima, { open: openTerima, close: closeTerima }] = useDisclosure(false);

  const rows = elements.map((element) => (
    <Table.Tr key={element.nama_gedung}>
      <Table.Td>{element.nama_gedung}</Table.Td>
      <Table.Td>{element.tanggal_peminjam}</Table.Td>
      <Table.Td>{element.peminjam}</Table.Td>
      <Table.Td>{element.kegiatan}</Table.Td>
      <Table.Td>
        <Flex gap={8}>
          <Button variant="light" color="gray" onClick={open}>
            Tolak
          </Button>
          <Button color="green" onClick={openTerima}>
            Terima
          </Button>
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
            <Button color="red" onClick={close} fullWidth>
              Ya, Tolak
            </Button>
          </Grid.Col>
        </Grid>
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
            <Button color="cyan" onClick={closeTerima} fullWidth>
              Ya, Terima
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
}
