'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <button
          key={id}
          onClick={() => signIn(id, { callbackUrl })}
        >{`Sign In with ${name}`}</button>
      ))}
    </>
  );
}
