'use client';

import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { useContext } from 'react';
import { GrLogin, GrLogout } from 'react-icons/gr';

export default function LoginButton() {
  const { user, setUser } = useContext(AuthContext);

  const handleClick = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&logout_redirect_uri=${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`;
  };

  return (
    <>
      {!user?.userId ? (
        <Link href="/login" className="flex items-center gap-2 text-sm">
          <GrLogin />
          <p>로그인</p>
        </Link>
      ) : (
        <button
          className="flex items-center gap-2 text-sm"
          onClick={handleClick}
        >
          <GrLogout />
          <p>로그아웃</p>
        </button>
      )}
    </>
  );
}
