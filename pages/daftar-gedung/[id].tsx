import { ReactElement } from 'react';
import { AppShell } from '@mantine/core';
import dynamic from 'next/dynamic';
import LayoutNavbar from '@/components/Layout/LayoutNavbar';

const DetailGedung = dynamic(() => import('@/components/Pages/DetailGedung/DetailGedung'), {
  ssr: false,
});

export default function DetailGedungPage() {
  return (
    <>
      <AppShell header={{ height: 73, offset: false }} padding="md">
        <AppShell.Header>
          <LayoutNavbar />
        </AppShell.Header>

        <div className="bg-gray">
          <DetailGedung />
        </div>
      </AppShell>
    </>
  );
}

DetailGedungPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
