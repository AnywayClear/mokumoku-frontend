'use client';
import * as React from 'react';
import Image from 'next/image';
import { BsStar, BsStarFill } from 'react-icons/bs';
import SearchTab from '../../searchTab/searchTab';
import ReviewRow from './ReviewRow';

type reviewType = {
  img: string;
  title: string;
  unit: string;
  nickname: string;
  content: string;
  date: string;
  rate: number;
};

export default function ReviewList() {
  const reviews: reviewType[] = [
    {
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      title: '생생야채모듬',
      unit: '10kg',
      nickname: '송수현짱짱123',
      content:
        '진짜 이건 아니지 않나요...? 아무리 유기농이라고는 해도 야채랑 과일에 모두 상처에 벌레 파먹은 흔적에... 다시는 구매 안합니다 다른 분들도 참고하셔서 여기서 구매하지마세요',
      date: '2023.07.23',
      rate: 1,
    },
    {
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      title: '생생야채모듬',
      unit: '10kg',
      nickname: '송수현짱짱123',
      content:
        '잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다',
      date: '2023.07.23',
      rate: 5,
    },
  ];

  return (
    <div className="mb-20">
      <SearchTab tabType={2} />
      <table className="">
        {reviews.length!==0 && reviews!==undefined?(reviews.map((review, index) => (
          <ReviewRow key={index} review={review} />
        ))):
        <tr className='h-32'><td className="text-xl font-semibold">검색된 게시물이 없습니다.</td></tr>
      }
      </table>
    </div>
  );
}
