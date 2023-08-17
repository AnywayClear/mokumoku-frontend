'use client';
import { subscribeUserType } from '@/model/mypage';
import React, {
  useState,
  MouseEvent,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import Image from 'next/image';
import styles from '../Scrollbar.module.css';
import { UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSubscribeList } from '@/service/api/subscribe';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { tapState } from '@/store/mypage';
import { useRecoilState } from 'recoil';
type Props = {
  selected: string;
  selectNickname: Function;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export default function SubscribeScroll({
  selected,
  selectNickname,
  setCurrentPage,
}: Props) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [status, setStatus] = useRecoilState<number>(tapState);
  
  const handleClick = (e: MouseEvent<HTMLDivElement>, id: string) => {
    router.push(`/otherpage/${id}`);
  };
  
  const { data: subscribeUsers }: UseQueryResult<subscribeUserType> = useQuery({
    queryKey: ['subscribeUsers',status],
    queryFn: () => getSubscribeList(user?.userId),
  });

  const [isDragging, setIsDragging] = useState(false);
  const [endPos, setEndPos] = useState(0);
  const [startPos, setStartPos] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos(e.clientX);
    setScrollLeft(e.currentTarget.scrollLeft);
  };
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = e.clientX - startPos;
    e.currentTarget.scrollLeft = scrollLeft - delta;
  };
  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setEndPos(e.clientX);
  };
  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setEndPos(e.clientX);
  };

  return (
    <div
      className={`${styles.scroll} flex items-center overflow-x-scroll place-items-center mt-12 select-none`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {subscribeUsers?.subscribeResponseList.length !== 0 ? (
        subscribeUsers?.subscribeResponseList?.map((subscribeUser, index) => (
          <div
            className={`${
              selected === subscribeUser.userId
                ? ''
                : 'hover:opacity-80 opacity-30'
            } px-4 select-none cursor-pointer`}
            onClick={(e) => {
              if (startPos - endPos < 30) {
                if (selected === subscribeUser.userId) {
                  handleClick(e,subscribeUser.userId);
                } else {
                  setCurrentPage(1);
                  selectNickname(subscribeUser.userId);
                }
              }
            }}
            key={index}
          >
            <Image
              src={subscribeUser.image}
              width={200}
              height={200}
              alt={'UserImg' + `${subscribeUser.userId}`}
              className="h-48 w-48 object-cover rounded-full pointer-events-none"
            />
            <p className="truncate text-2xl w-48 font-bold text-cente my-4 text-center select-none">
              {subscribeUser.nickName}
            </p>
          </div>
        ))
      ) : (
        <p className="w-full text-center text-xl font-bold border-y py-10">
          구독하고 있는 판매자가 없습니다
        </p>
      )}
    </div>
  );
}

