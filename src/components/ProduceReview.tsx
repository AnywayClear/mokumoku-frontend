'use client';
import * as React from 'react';
import ReviewRow from './MyPage/sellerSelf/ReviewList/ReviewRow';
import { ReviewList } from '@/model/review';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getReviews } from '@/service/api/review';

type Props = {
  sellerId: string;
};

export default function ProduceReview({ sellerId }: Props) {
  const { data: reviewList }: UseQueryResult<ReviewList> = useQuery({
    queryKey: ['reviewList', sellerId],
    queryFn: () => getReviews(sellerId, 0, 10, 'start'),
  });

  return (
    <div className="mb-20">
      <table className="w-full mt-12">
        {!!reviewList?.data ? (
          reviewList?.data?.map((review, index) => (
            <ReviewRow key={index} review={review} />
          ))
        ) : (
          <tr>
            <td className="my-4 text-center">
              리뷰가 없습니다.
            </td>
          </tr>
        )}
      </table>
    </div>
  );
}
