import { searchType } from '@/model/mypage';
import { searchState } from '@/store/mypage';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useRecoilCallback, useRecoilState, useResetRecoilState } from 'recoil';

type chipStyleType = {
  on: string;
  off: string;
  common: string;
  hover: string;
};

const chipStyle: chipStyleType = {
  on: 'text-green-500 border-green-500 border-[3px] px-[9px] py-[2px] ',
  off: 'text-neutral-400 border-neutral-300 border-2 px-[10px] py-[3px] ',
  common: 'bg-white rounded-full font-semibold h-fit ',
  hover:
    'hover:text-green-500 hover:border-green-500 hover:border-[3px] hover:px-[9px] hover:py-[2px] ',
};

type Props = {
  auctionType: number;
};

export default function AuctionStateSetter({ auctionType }: Props) {
  
  const [{ auctionState,startDateStr,endDateStr,title,orderBy, dateState }, setStatus] = useRecoilState<searchType>(searchState);
  

  let auctionStateArr: string[] = [];

  if (auctionType == 0) {
    auctionStateArr = ['배송전', '배송중', '배송완료'];
  } else if (auctionType == 1) {
    auctionStateArr = ['경매전', '경매중', '경매후'];
  } else if (auctionType == 2) {
    auctionStateArr = ['경매전', '경매중', '경매후', '결제완료'];
  }

  function changeAutionState(num: number) {
    if (num === 3) {
      if (auctionState[0] === 3) {
        setStatus((current) => ({
          ...current,
          auctionState: [0, 1, 2],
        }));
      } else {
        setStatus((current) => ({
          ...current,
          auctionState: [3],
        }));
      }
      
    } else {
      if (auctionState?.includes(num)) {
        setStatus((current) => ({
          ...current,
          auctionState: auctionState.filter((item) => item !== num && item !== 3),
        }));
      } else {
        setStatus((current) => ({
          ...current,
          auctionState: [...auctionState.filter((item) => item !== 3), num].sort(),
        }));
      }
          }
    
  }
 
  

  return (
    <>
      <div className="flex space-x-2">
        {auctionStateArr.map((autcionStateArrItem, index) => (
          <button
            key={index}
            className={
              (auctionState.includes(index) ? chipStyle.on : chipStyle.off) +
              chipStyle.common +
              chipStyle.hover
            }
            onClick={() => changeAutionState(index)}
          >
            {autcionStateArrItem}
          </button>
        ))}
      </div>
    </>
  );
}
