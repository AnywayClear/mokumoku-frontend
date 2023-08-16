"use client"
import { subscribeUserType } from '@/model/mypage';
import React, { useState, MouseEvent, useContext } from 'react'
import Image from 'next/image';
import styles from '../Scrollbar.module.css';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getSubscribeList } from '@/service/api/subscribe';
import { AuthContext } from '@/context/AuthContext';

type Props = {
    selected: string;
    selectNickname: Function;
};

export default function SubscribeScroll({
    selected, selectNickname
}: Props) {
  
  const { user } = useContext(AuthContext);

    const { data: subscribeUsers }: UseQueryResult<subscribeUserType> = useQuery({
      queryKey: ['subscribeUsers'],
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
      console.log(e.clientX);
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
    <div className={`${styles.scroll } flex items-center overflow-x-scroll place-items-center mt-12 select-none`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}>
        {subscribeUsers?.subscribeResponseList.length!==0?(subscribeUsers?.subscribeResponseList?.map((subscribeUser, index) => (
                <div
                    className={`${selected===subscribeUser.userId ? '' : 'hover:opacity-80 opacity-30'} px-4 select-none cursor-pointer`}
                    onClick={()=>{
                      if(startPos-endPos<30){
                        selectNickname(subscribeUser.userId);
                      }
                    }}
                    key={index}>
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
        ))):
        <p>없엉...</p>
        }
      
    </div>
  )
}
