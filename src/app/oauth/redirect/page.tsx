'use client';

import { AuthContext } from '@/context/AuthContext';
import { get } from '@/service/api/http';
import { getSession, signIn, useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, CSSProperties, useContext } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('accessToken');
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem('accessToken', token || '');
    redirect('/');
    // get(`/api/members/S0001`).then(console.log);
    // console.log(user);
  }, [token]);

  return (
    <div className="flex h-[60vh] justify-center items-center">
      <div>
        <CircleLoader size={100} color="#36d7b7" cssOverride={override} />
      </div>
    </div>
  );
}
