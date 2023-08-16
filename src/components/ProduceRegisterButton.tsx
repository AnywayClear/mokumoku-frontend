'use client';

import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { useContext } from 'react';
import { FaBagShopping } from 'react-icons/fa6';

export default function ProduceRegisterButton() {
  const { user, setUser } = useContext(AuthContext);

  const handleClick = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&logout_redirect_uri=${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`;
  };

  return (
    <>
      {!!user?.role && (
        <Link
          href={'/product/register'}
          className="flex items-center gap-2 text-sm"
        >
          <FaBagShopping /> <p>물품등록</p>
        </Link>
      )}
    </>
  );
}
