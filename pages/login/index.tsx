import { ReactElement } from 'react';
import { LoginForm } from '@/components/Pages/Login/LoginForm';

export default function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
