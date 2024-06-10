import { Container, Grid, Input, Text, Card, Image } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function DaftarGedung() {
  return (
    <Container size="xl" pt={110}>
      <Input placeholder="Cari Gedung..." leftSection={<IconSearch size={16} />} />
      <Text size="xl" ta="left" fw={700} mt={24} mb={20}>
        Gedung Tersedia
      </Text>
      <Grid>
        {[...Array(12)].map((item) => (
          <Grid.Col key={item} span={{ base: 12, sm: 6, lg: 3 }}>
            <Card shadow="xs" padding={12} component="a" href="/daftar-gedung">
              <Card.Section>
                <Image
                  src="/img/bg-login-sistem-peminjaman-gedung2.jpeg"
                  h={160}
                  alt="Gedung Sederhana Sudirman"
                />
              </Card.Section>

              <Text fw={500} size="lg" mt={12}>
                Gedung Sederhana Sudirman
              </Text>

              <Text mt={12} c="dimmed" size="sm">
                Jl Raya Sudirman
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
