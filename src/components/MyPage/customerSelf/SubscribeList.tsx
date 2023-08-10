'use client';
import Image from 'next/image';
import { useState } from 'react';
import SubscribeScroll from './SubsribeScroll';
import { subscribeUserType } from '@/model/mypage';
import SearchTab from '../searchTab';

type colType = { name: string; flex: string };

const cols: colType[] = [
  {
    name: '상품이미지',
    flex: 'w-3/12',
  },
  {
    name: '제목',
    flex: 'w-6/12',
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
    name: '경매상태',
    flex: 'w-2/12',
  },
  {
    name: '시작금액',
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
  state: string;
};

export default function SubscribeList() {
  const rows: rowType[] = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
  ];

  const subscribeUsers: subscribeUserType[] = [
    {
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      nickname: '모쿠모쿠',
      
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      nickname: '모쿠모쿠공식판매스토어eeee',
    },
    
  ];

  const [selectedNickname, setSelectedNickname] = useState('');


  return (
    <div className="mb-20">
      <SubscribeScroll subscribeUsers={subscribeUsers} selected={selectedNickname} selectNickname={setSelectedNickname}/>
      <SearchTab tabType={3} />
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
          {rows.map((row, index2) => (
            <tr key={index2} className="border-y text-lg">
              <td>
                {row.img !== undefined ? (
                  <Image
                    src={row.img}
                    alt="상품이미지"
                    width={300}
                    height={300}
                    className="h-32 w-80 object-cover"
                  />
                ) : null}
              </td>
              <td>
                <a href="#">
                  <p className="px-6 py-6 underline truncate hover:opacity-70">
                    {row.title}
                  </p>
                </a>
              </td>
              <td>
                <p>{row.unit}</p>
              </td>
              <td>
                <p>{row.date}</p>
              </td>
              <td>
                <p>{row.state}</p>
              </td>
              <td>
                <p>{row.price}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
