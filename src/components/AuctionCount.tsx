'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type Props = {
  updatedAt: Date;
};

const calTime = (updateAt: Date) => {
  let today = dayjs();
  let expired_at = dayjs(updateAt);
  let result = Math.floor(expired_at.diff(today, 'second', true));
  return result + 300 ;
}

export default function AuctionCount({ updatedAt }: Props) {
  const [time, setTime] = useState<number>(() => calTime(updatedAt));

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
    setTime(() => calTime(updatedAt));
  }, [updatedAt]);

  return (
    <p className="text-sm font-semibold leading-6 text-gray-900">
      {`${Math.floor(time / 60)}분 ${time % 60}초`}
    </p>
  );
}
