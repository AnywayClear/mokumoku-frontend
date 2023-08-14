'use client';
import { useContext, useState } from 'react';
import { ImHeartBroken } from 'react-icons/im';
import Image from 'next/image';
import SearchTab from '../../searchTab/searchTab';
import WishRow from './WishRow';
import { ProduceList } from '@/model/produce';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getWishList } from '@/service/api/wish';
import { AuthContext } from "@/context/AuthContext";


type colType = { name: string; flex: string };
const cols: colType[] = [
  {
    name: '상품이미지',
    flex: 'w-2/12',
  },
  {
    name: '제목',
    flex: 'w-5/12',
  },
  {
    name: '판매자',
    flex: 'w-2/12',
  },
  {
    name: '단위',
    flex: 'w-1/12',
  },
  {
    name: '경매예정일',
    flex: 'w-2/12',
  },
  {
    name: '시작금액',
    flex: 'w-1/12',
  },
  {
    name: '찜 삭제',
    flex: 'w-1/12',
  },
];

export default function WishList() {

  const { user } = useContext(AuthContext);

  const { data: wishList }: UseQueryResult<ProduceList> = useQuery({
    queryKey: ['wishList'],
    queryFn: () => getWishList(user?.userId,0,5),
  });

  return (
    <div className="mb-20">
      <SearchTab tabType={3} />
      <div>
        <table className="table-fixed border-collapse border-y-2 w-full text-center border-neutral-300">
          <thead className="font-bold  text-xl">
            <tr className="border-y">
              {cols.map((col, index) => (
                <td key={index} className={`${col.flex}` + ' py-8'}>
                  {col.name}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {wishList?.data.map((wishItem, index) => (
              <WishRow key={index} id={wishItem.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
