'use client';
import { get } from '@/service/api/http';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  // const data = await get('http://13.125.251.1:8080/api/produces/1');
  // console.log(data);
  return (
    <>
      <h1>main</h1>
      <a href="http://13.125.251.1:8080/oauth2/authorization/kakao">카카오</a>
      {/* <button onClick={() => signIn("kakao2", {callbackUrl: "http://localhost:3000/oauth2/redirect"})}>login</button> */}
      <button onClick={() => signIn()}>login</button>
    </>
  );
}
