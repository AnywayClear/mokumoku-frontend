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

  if (!user?.id) {
    // redirect('/product');
  }

  return (
    <>
      <h1>main</h1>
      <a
        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao`}
      >
        카카오
      </a>

      <Image
        alt="kakao"
        src={KaKaoLoginImage}
        className='cursor-pointer'
        onClick={() =>
          (location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao`)
        }
      />
    </>
  );
}
