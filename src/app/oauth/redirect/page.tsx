'use client';

import { AuthContext } from '@/context/AuthContext';
import { get } from '@/service/api/http';
import { getSession, signIn, useSession } from 'next-auth/react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem('accessToken', token || '');
    if (token) {
      const base64Payload = token.split('.')[1];
      const payload = Buffer.from(base64Payload, 'base64');
      const { userId, role } = JSON.parse(payload.toString());
      setUser({
        userId,
        role: role === 'ROLE_CONSUMER' ? 0 : 1,
      });
    }
    router.replace('/');
  }, [router, setUser, token]);

  return (
    <div className="flex h-[60vh] justify-center items-center">
      <div>
        <CircleLoader size={100} color="#36d7b7" cssOverride={override} />
      </div>
    </div>
  );
}
