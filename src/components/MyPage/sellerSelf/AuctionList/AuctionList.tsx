'use client';
import * as React from 'react';
import Image from 'next/image';
import { FcCancel } from 'react-icons/fc';
import SearchTab from '../../searchTab/searchTab';
import AuctionRow from './AuctionRow';

type colType = { name: string; flex: string };
const cols: colType[] = [
  {
    name: '상품이미지',
    flex: 'w-3/12',
  },
  {
    name: '제목',
    flex: 'w-5/12',
  },
  {
    name: '단위',
    flex: 'w-1/12',
  },
  {
    name: '입찰가격',
    flex: 'w-1/12',
  },
  {
    name: '경매일자',
    flex: 'w-2/12',
  },
  {
    name: '배송상태',
    flex: 'w-1/12',
  },
];

type rowType = {
  id: number;
  img?: string;
  title: string;
  unit: string;
  price: number;
  date: string;
  deliv: string;
};

export default function AuctionList() {
  const rows: rowType[] = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title:
        '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다eeeeeeeeeeeeeeeeeeeeeeeeeeee',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      deliv: '배송완료',
    },
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      title: '싱싱 야채 세트 많아요',
      unit: '3kg',
      price: 15000,
      date: '2023-07-28',
      deliv: '결제하기',
    },
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      title: '싱싱 야채 세트 많아요',
      unit: '',
      price: 15000,
      date: '2023-07-28',
      deliv: '결제하기',
    },
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      title: '싱싱 야채 세트 많아요',
      unit: '',
      price: 15000,
      date: '2023-07-28',
      deliv: '결제하기',
    },
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      title: '싱싱 야채 세트 많아요',
      unit: '',
      price: 15000,
      date: '2023-07-28',
      deliv: '결제하기',
    },
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      title: '싱싱 야채 세트 많아요',
      unit: '',
      price: 15000,
      date: '2023-07-28',
      deliv: '결제하기',
    },
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      title: '싱싱 야채 세트 많아요',
      unit: '',
      price: 15000,
      date: '2023-07-28',
      deliv: '결제하기',
    },
  ];

  return (
    <div className="mb-20">
      <SearchTab tabType={1} />
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
            {rows.map((row, index) => (
              <AuctionRow key={index} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
