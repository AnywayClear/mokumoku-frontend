'use client';
import * as React from 'react';
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
import { Pagination } from '@mui/material';


export default function ReviewList() {

  const { user } = useContext(AuthContext);
  const [{ auctionState, title }] = useRecoilState<searchType>(searchState);

  const [currentPage, setCurrentPage] = React.useState(1);
  const size = 5;
  const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
  };

  const { data: reviewList }: UseQueryResult<ReviewList> = useQuery({
    queryKey: ['reviewList',auctionState, title, currentPage],
    queryFn: () => getReviews(user?.userId, currentPage-1, size,"start"),
  });

  return (
    <div className="mb-20">
      {/* <SearchTab tabType={2} /> */}
      <table className="w-full mt-12">
        {reviewList?.data?.length!==0 && reviewList?.data!==undefined?(reviewList?.data?.map((review, index) => (
          <ReviewRow key={index} review={review} />
        ))):
        <tr className='h-32 border-y-2'><td className="text-xl font-semibold text-center">검색된 게시물이 없습니다.</td></tr>
      }
      </table>
      <Pagination
        count={reviewList?.pageInfo.totalPages||0}
        page={currentPage}
        onChange={onPageChange}
        size="medium"
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "15px 0",
        }}
      />
    </div>
  );
}
