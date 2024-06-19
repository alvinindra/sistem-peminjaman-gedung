import { ReactElement } from 'react';
import { AppShell } from '@mantine/core';
import DaftarGedung from '@/components/Pages/DaftarGedung/DaftarGedung';
import LayoutNavbar from '@/components/Layout/LayoutNavbar';

export default function DaftarGedungPage() {
  return (
    <>
      <AppShell header={{ height: 73, offset: false }} padding="md">
        <AppShell.Header>
          <LayoutNavbar />
        </AppShell.Header>

        <div className="bg-gray">
          <DaftarGedung />
        </div>
      </AppShell>
    </>
  );
}

DaftarGedungPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
