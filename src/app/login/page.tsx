'use client';

import KaKaoLoginImage from '../../../public/images/kakao_login_medium_wide.png';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center border-b-4 border-b-black w-4/12 pb-4 mb-8">
        로그인
      </h2>
      <Image
        alt="kakao"
        src={KaKaoLoginImage}
        className="cursor-pointer"
        onClick={() =>
          (location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao`)
        }
      />
      <div className="flex flex-col items-center mt-8">
        <p className="font-bold">아직 가입을 안하셨나요?</p>
        <p className='text-sm underline'>카카오로 회원가입하기</p>
      </div>
    </div>
  );
}
