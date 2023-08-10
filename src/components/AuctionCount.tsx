'use client';

import { useEffect, useState } from 'react';

type Props = {
  updatedAt: Date;
};

export default function AuctionCount({ updatedAt }: Props) {
  const [time, setTime] = useState<number>(300);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (time > 0) {
  //         setTime((prev) => prev - 1);
  //       } else {
  //         clearInterval(interval);
  //       }
  //     }, 1000);

  //     console.log("계속??");

  //     return () => {
  //         console.log("클리어도?");
  //         clearInterval(interval);}

  //   }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTime(300);
  }, [updatedAt]);

  return (
    <p className="text-sm font-semibold leading-6 text-gray-900">
      {`${Math.floor(time / 60)}분 ${time % 60}초`}
    </p>
  );
}
