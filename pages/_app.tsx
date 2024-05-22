import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@/components/Layout/Sidebar.scss';
import '@/public/global.scss';
import type { AppProps } from 'next/app';
import { useState, type ReactElement, type ReactNode } from 'react';
import Head from 'next/head';
import { MantineProvider, AppShell, Center, Flex, Avatar, Text } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NextPage } from 'next';
import Image from 'next/image';
import clsx from 'clsx';
import {
  IconBuildingSkyscraper,
  IconCalendar,
  IconCalendarUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { theme } from '../theme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [isOnHover, setIsOnHover] = useState(false);
  const router = useRouter();

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
            layout="alt"
            navbar={{
              width: 300,
              breakpoint: 'sm',
            }}
            padding="xl"
          >
            <AppShell.Navbar
              className={clsx('sidebar', !isOnHover && 'close')}
              onMouseEnter={() => setIsOnHover(true)}
              onMouseLeave={() => setIsOnHover(false)}
              p="md"
            >
              <Flex className="logo_items">
                <Center my="auto">
                  <Image src="/img/icon/ic-gedung.svg" width={42} height={42} alt="" />
                </Center>
                <Center my="auto" className="logo_name my-auto">
                  <svg
                    width="55"
                    height="16"
                    viewBox="0 0 55 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.74805 12.9199C7.45768 12.9199 8.03385 12.8418 8.47656 12.6855C9.31641 12.3861 9.73633 11.8294 9.73633 11.0156C9.73633 10.5404 9.52799 10.1725 9.11133 9.91211C8.69466 9.6582 8.04036 9.43359 7.14844 9.23828L5.625 8.89648C4.1276 8.55794 3.09245 8.1901 2.51953 7.79297C1.54948 7.12891 1.06445 6.09049 1.06445 4.67773C1.06445 3.38867 1.5332 2.31771 2.4707 1.46484C3.4082 0.611979 4.78516 0.185547 6.60156 0.185547C8.11849 0.185547 9.41081 0.589193 10.4785 1.39648C11.5527 2.19727 12.1159 3.36263 12.168 4.89258H9.27734C9.22526 4.02669 8.84766 3.41146 8.14453 3.04688C7.67578 2.80599 7.0931 2.68555 6.39648 2.68555C5.62174 2.68555 5.00326 2.8418 4.54102 3.1543C4.07878 3.4668 3.84766 3.90299 3.84766 4.46289C3.84766 4.97721 4.07552 5.36133 4.53125 5.61523C4.82422 5.78451 5.44922 5.98307 6.40625 6.21094L8.88672 6.80664C9.97396 7.06706 10.7943 7.41536 11.3477 7.85156C12.207 8.52865 12.6367 9.50846 12.6367 10.791C12.6367 12.1061 12.1322 13.1999 11.123 14.0723C10.1204 14.9382 8.70117 15.3711 6.86523 15.3711C4.99023 15.3711 3.51562 14.9447 2.44141 14.0918C1.36719 13.2324 0.830078 12.054 0.830078 10.5566H3.70117C3.79232 11.2142 3.97135 11.7057 4.23828 12.0312C4.72656 12.6237 5.56315 12.9199 6.74805 12.9199ZM20.9766 9.82422H17.9199V15H14.9316V0.605469H21.2012C22.6465 0.605469 23.7988 0.976562 24.6582 1.71875C25.5176 2.46094 25.9473 3.61003 25.9473 5.16602C25.9473 6.86523 25.5176 8.06641 24.6582 8.76953C23.7988 9.47266 22.5716 9.82422 20.9766 9.82422ZM22.3828 6.82617C22.7734 6.48112 22.9688 5.93424 22.9688 5.18555C22.9688 4.43685 22.7702 3.90299 22.373 3.58398C21.9824 3.26497 21.4323 3.10547 20.7227 3.10547H17.9199V7.34375H20.7227C21.4323 7.34375 21.9857 7.17122 22.3828 6.82617Z"
                      fill="#08969C"
                    />
                    <path
                      d="M37.0312 14.6484C36.237 15.1367 35.2604 15.3809 34.1016 15.3809C32.194 15.3809 30.6315 14.7201 29.4141 13.3984C28.1445 12.0703 27.5098 10.2539 27.5098 7.94922C27.5098 5.61849 28.151 3.75 29.4336 2.34375C30.7161 0.9375 32.4121 0.234375 34.5215 0.234375C36.3509 0.234375 37.819 0.69987 38.9258 1.63086C40.0391 2.55534 40.6771 3.71094 40.8398 5.09766H37.8809C37.653 4.11458 37.0964 3.42773 36.2109 3.03711C35.7161 2.82227 35.166 2.71484 34.5605 2.71484C33.4017 2.71484 32.4479 3.1543 31.6992 4.0332C30.957 4.9056 30.5859 6.2207 30.5859 7.97852C30.5859 9.74935 30.9896 11.0026 31.7969 11.7383C32.6042 12.474 33.5221 12.8418 34.5508 12.8418C35.5599 12.8418 36.3867 12.5521 37.0312 11.9727C37.6758 11.3867 38.0729 10.6217 38.2227 9.67773H34.8926V7.27539H40.8887V15H38.8965L38.5938 13.2031C38.0143 13.8867 37.4935 14.3685 37.0312 14.6484ZM49.8828 9.82422H46.8262V15H43.8379V0.605469H50.1074C51.5527 0.605469 52.7051 0.976562 53.5645 1.71875C54.4238 2.46094 54.8535 3.61003 54.8535 5.16602C54.8535 6.86523 54.4238 8.06641 53.5645 8.76953C52.7051 9.47266 51.4779 9.82422 49.8828 9.82422ZM51.2891 6.82617C51.6797 6.48112 51.875 5.93424 51.875 5.18555C51.875 4.43685 51.6764 3.90299 51.2793 3.58398C50.8887 3.26497 50.3385 3.10547 49.6289 3.10547H46.8262V7.34375H49.6289C50.3385 7.34375 50.8919 7.17122 51.2891 6.82617Z"
                      fill="#0AA774"
                    />
                  </svg>
                </Center>
              </Flex>

              <div className="menu_container">
                <div className="menu_items">
                  <ul className="menu_item">
                    <li className="item">
                      <Link
                        href="/dashboard/jadwal"
                        className={clsx(
                          'link flex',
                          router.pathname === '/dashboard/jadwal' && 'active'
                        )}
                      >
                        <div className="flex">
                          <IconCalendar stroke={1.5} size={22} />
                          <span>Jadwal</span>
                        </div>
                      </Link>
                    </li>
                    <li className="item">
                      <a
                        href="/dashboard/pengajuan"
                        className={clsx(
                          'link flex',
                          router.pathname === '/dashboard/pengajuan' && 'active'
                        )}
                      >
                        <IconCalendarUser stroke={1.5} size={22} />
                        <span>Pengajuan</span>
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="/dashboard/kelola-gedung"
                        className={clsx(
                          'link flex',
                          router.pathname === '/dashboard/kelola-gedung' && 'active'
                        )}
                      >
                        <IconBuildingSkyscraper stroke={1.5} size={22} />
                        <span>Kelola Gedung</span>
                      </a>
                    </li>
                    <li className="item">
                      <a
                        href="/dashboard/kelola-user"
                        className={clsx(
                          'link flex',
                          router.pathname === '/dashboard/kelola-user' && 'active'
                        )}
                      >
                        <IconUsersGroup stroke={1.5} size={22} />
                        <span>Kelola User</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sidebar_profile flex">
                  <span className="nav_image">
                    <Avatar />
                  </span>
                  <div className="data_text">
                    <Text size="sm" fw={600}>
                      John Doe
                    </Text>
                    <Text size="xs">Administrator</Text>
                  </div>
                </div>
              </div>
            </AppShell.Navbar>
            <AppShell.Main className={clsx(!isOnHover && 'navbar-offset-close')}>
              <Component {...pageProps} />
            </AppShell.Main>
          </AppShell>
        )}
      </ModalsProvider>
    </MantineProvider>
  );
}
