import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { MantineProvider, AppShell, Burger, Group, Skeleton, Title } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { NextPage } from 'next';
import { theme } from '../theme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Head>
          <title>Sistem Peminjaman Gedung</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        {Component.getLayout ? (
          <Component {...pageProps} />
        ) : (
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
          >
            <AppShell.Header>
              <Group h="100%" px="md">
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                <Title order={2}>Sistem Peminjaman Gedung</Title>
              </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
              Navbar
              {Array(15)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} h={28} mt="sm" animate={false} />
                ))}
            </AppShell.Navbar>
            <AppShell.Main>
              <Component {...pageProps} />
            </AppShell.Main>
          </AppShell>
        )}
      </ModalsProvider>
    </MantineProvider>
  );
}
