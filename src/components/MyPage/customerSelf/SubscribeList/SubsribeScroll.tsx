import { subscribeUserType } from '@/model/mypage';
import React, { useState, MouseEvent } from 'react'
import Image from 'next/image';
import styles from '../Scrollbar.module.css';

type Props = {
    subscribeUsers: subscribeUserType[];
    selected: string;
    selectNickname: Function;
};

export default function SubscribeScroll({
    subscribeUsers, selected, selectNickname
}: Props) {

    const [isDragging, setIsDragging] = useState(false);
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
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    const handleMouseLeave = () => {
      setIsDragging(false);
    };

  return (
    <div className={`${styles.scroll} flex items-center overflow-x-scroll place-items-center mt-12`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}>
        {subscribeUsers.map((subscribeUser:subscribeUserType, index) => (
                <div
                    className={`${selected===subscribeUser.nickname ? '' : 'hover:opacity-80 opacity-30'} px-4 select-none cursor-pointer`}
                    onClick={()=>selectNickname(subscribeUser.nickname)}
                    key={index}>
                      <Image
                      src={subscribeUser.img}
                      width={200}
                      height={200}
                      alt={'UserImg' + `${subscribeUser.nickname}`}
                      className="h-48 w-48 object-cover rounded-full pointer-events-none"
                      />
                      <p className="truncate text-2xl w-48 font-bold text-cente my-4 text-center select-none">
                        {subscribeUser.nickname}
                      </p>
                </div>
        ))}
      
    </div>
  )
}
