import React from 'react';
import Image from 'next/image';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { Review, ReviewItem } from '@/model/review';
import { getProduce } from '@/service/api/produce';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Produce } from '@/model/produce';
import { dateToStringDot, dayjsToStringDash } from '@/service/myFunc';
import dayjs from 'dayjs';
import Link from 'next/link';

type Props = {
  review: ReviewItem;
};

function getStar(num: number) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(<BsStarFill key={i} />);
  }
  for (let i = 0; i < 5 - num; i++) {
    arr.push(<BsStar key={num + i} />);
  }
  return arr;
}

export default function ReviewRow({ review }: Props) {
  function dateTotString(createdAt: string): React.ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <tr className="border-y-2 border-neutral-300 border-collapse">
        <div className="flex h-fit items-top my-6">
          <Image
            className="h-40 w-60 object-cover"
            src={review.deal.produce.image}
            alt="이미지입니다."
            width={250}
            height={120}
          />
          <div className="ml-7 w-full">
            <div className="flex justify-between">
              <div className="w-full">
                <div className="flex items-end">
                  <Link href={`/product/${review.deal.produce.id}`}>
                    <p className="font-bold text-2xl mr-2 underline underline-offset-4 hover:opacity-70">
                      {review.deal.produce.name}
                    </p>
                  </Link>
                  <p className="text-lg text-gray-600 mr-2">
                    {review.deal.produce.kg}kg
                  </p>
                </div>
              </div>
              <div className="w-1/5 text-right text-lg text-gray-600">
                <p className="my-auto">
                  {dayjsToStringDash(dayjs(review.createdAt))}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <p className="text-xl font-bold mr-2">
                  {review.reviewerNickname}
                </p>
                <div className="flex items-start text-xl text-yellow-300">
                  {getStar(review.score)}
                </div>
              </div>
              <p className="text-lg text-justify">{review.comment}</p>
            </div>
          </div>
        </div>
      </tr>
    </>
  );
}
