'use client';

import { getSession, signIn, useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, CSSProperties } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams?.get('accessToken');

  useEffect(() => {
    localStorage.setItem('accessToken', search || '');
    redirect('/');
  }, [search]);

  return (
    <div className="flex h-[60vh] justify-center items-center">
      <div>
        <CircleLoader size={100} color="#36d7b7" cssOverride={override} />
      </div>
    </div>
  );
}
