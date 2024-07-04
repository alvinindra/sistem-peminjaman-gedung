import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Center,
} from '@mantine/core';
import Image from 'next/image';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGeneralStore } from '@/stores';
import { apiClient } from '@/lib/api';
import classes from './LoginForm.module.css';

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setProfile } = useGeneralStore((state) => state);
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.post('/api/login/', JSON.stringify(form.values));
      Cookies.set('token', res.data.access);
      Cookies.set('refresh_token', res.data.refresh);
      Cookies.set('role', res.data.user.role);
      setProfile(res.data.user);
      notifications.show({
        title: 'Berhasil melakukan login',
        message: '',
      });

      if (res.data.user.role === 'Peminjam') {
        router.push('/daftar-gedung');
      } else {
        router.push('/dashboard/jadwal');
      }
    } catch (error: any) {
      notifications.show({
        color: 'red',
        title: 'Gagal melakukan login',
        message: 'Silakan coba lagi',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={{ base: 32, xs: 32, md: 140, lg: 140 }}>
        <Center mb={55}>
          <Image src="/img/icon/ic-gedung.svg" width={80} height={80} alt="" />
        </Center>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={12}>
          Selamat Datang
        </Title>
        <Text ta="center" c="gray" mb={38}>
          Login untuk masuk ke Sistem Peminjaman Gedung
        </Text>

        <form onSubmit={form.onSubmit(handleLogin)}>
          <TextInput
            label="Username"
            placeholder="Masukkan username"
            value={form.values.username}
            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
            size="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Masukkan password"
            mt="md"
            size="md"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
          />
          <Button fullWidth type="submit" mt="xl" size="md" loading={isLoading}>
            Login
          </Button>
        </form>

        <Text ta="center" size="md" mt="md">
          Belum punya akun?&nbsp;
          <Anchor<'a'>
            href="https://bpsdm.pu.go.id/v2/informasi"
            fw={600}
            onClick={(event) => event.preventDefault()}
          >
            Hubungi IT Support
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
