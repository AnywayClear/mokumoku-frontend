'use client';
import * as React from 'react';
import Image from 'next/image';
import { BsStar, BsStarFill } from 'react-icons/bs';
import SearchTab from '../../searchTab/searchTab';
import ReviewRow from './ReviewRow';
import { useContext } from 'react';
import { searchType } from '@/model/mypage';
import { useRecoilState } from 'recoil';
import { searchState } from '@/store/mypage';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ReviewList } from '@/model/review';
import { getReviews } from '@/service/api/review';
import { AuthContext } from '@/context/AuthContext';


export default function ReviewList() {

  const { user } = useContext(AuthContext);
  const [{ auctionState, title }] = useRecoilState<searchType>(searchState);

  const { data: reviewList }: UseQueryResult<ReviewList> = useQuery({
    queryKey: ['reviewList',auctionState, title],
    queryFn: () => getReviews(user?.userId, 0, 10,"start"),
  });


  return (
    <div className="mb-20">
      <SearchTab tabType={2} />
      <table className="w-full mt-12">
        {reviewList?.reviews?.length!==0 && reviewList?.reviews!==undefined?(reviewList?.reviews?.map((review, index) => (
          <ReviewRow key={index} review={review} />
        ))):
        <tr className='h-32 border-y-2'><td className="text-xl font-semibold text-center">검색된 게시물이 없습니다.</td></tr>
      }
      </table>
    </div>
  );
}
