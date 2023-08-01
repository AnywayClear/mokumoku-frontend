'use client';

import { getSession, signIn, useSession } from 'next-auth/react';

export default function Page() {
  // const { data: session, update } = useSession();

  //   if (!session) {
  // signIn("kakao",{redirect:false});

  // console.log({name: "ereqw"});
  //   }

  // async function updateSession() {
  //   await update({
  //     ...session,
  //     user: {
  //       ...session?.user,
  //       accessToken: 'ddddd',
  //     },
  //   });
  //   console.log("hi");
  // }

  // console.log('session' + session);
  return (
    <>
      <div>hi</div>
      {/* <div onClick={() => updateSession()}>update</div> */}
      {/* <div onClick={() => console.log(session?.user)}>print session</div> */}
    </>
  );
}
