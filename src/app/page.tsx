'use client';
import { AuthContext } from '@/context/AuthContext';
import { get } from '@/service/api/http';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useContext } from 'react';
import KaKaoLoginImage from '../../public/images/kakao_login_large_narrow.png';

export default function Home() {
  const { user } = useContext(AuthContext);

  if (!user?.userId) {
    // redirect('/product');
  }

  console.log(user);

  return (
    <>
      <h1>main</h1>
      <Link href={'/consumer/register'}>오오</Link>
    </>
  );
}
