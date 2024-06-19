import { getDaftarGedung } from '@/lib/api';
import { Container, Grid, Input, Text, Card, Image, Skeleton, Paper } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function DaftarGedung() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['data-gedung'],
    queryFn: getDaftarGedung,
  });

  const filteredData = data?.data?.filter(
    (item: { nama: string; alamat: string }) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container size="xl" pt={110}>
      <Input
        placeholder="Cari Gedung..."
        leftSection={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Text size="xl" ta="left" fw={700} mt={24} mb={20}>
        Gedung Tersedia
      </Text>
      <Grid>
        {isLoading && (
          <>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <Card shadow="xs" padding={12} component="a">
                <Skeleton height={160} mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={4} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <Card shadow="xs" padding={12} component="a">
                <Skeleton height={160} mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={4} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <Card shadow="xs" padding={12} component="a">
                <Skeleton height={160} mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={4} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <Card shadow="xs" padding={12} component="a">
                <Skeleton height={160} mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={4} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </Card>
            </Grid.Col>
          </>
        )}
        {!isLoading && filteredData.length === 0 && (
          <>
            <Paper shadow="xs" p="xl" ta="center" w="100%">
              <Text fw={500}>Tidak ada gedung yang ditemukan untuk pencarian Anda</Text>
            </Paper>
          </>
        )}
        {!isLoading &&
          filteredData?.map((item: { image: string; id: number; nama: string; alamat: string }) => (
            <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
              <Card
                key={item.id}
                shadow="xs"
                padding={12}
                component="a"
                href={`/daftar-gedung/${item.id}`}
              >
                <Card.Section>
                  <Image
                    src="/img/bg-login-sistem-peminjaman-gedung2.jpeg"
                    h={160}
                    alt={item.nama}
                  />
                </Card.Section>

                <Text fw={500} size="lg" mt={12}>
                  {item.nama}
                </Text>

                <Text mt={12} c="dimmed" size="sm">
                  {item.alamat}
                </Text>
              </Card>
            </Grid.Col>
          ))}
      </Grid>
    </Container>
  );
}
