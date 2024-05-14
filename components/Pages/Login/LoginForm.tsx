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
import classes from './LoginForm.module.css';

export function LoginForm() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={140}>
        <Center mb={55}>
          <Image src="/img/icon/ic-gedung.svg" width={80} height={80} alt="" />
        </Center>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={12}>
          Selamat Datang
        </Title>
        <Text ta="center" c="gray" mb={38}>
          Login untuk masuk ke Sistem Peminjaman Gedung
        </Text>

        <TextInput label="Username" placeholder="Masukkan username" size="md" />
        <PasswordInput label="Password" placeholder="Masukkan password" mt="md" size="md" />
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>

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
