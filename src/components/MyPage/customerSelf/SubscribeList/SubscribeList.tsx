'use client';
import { useState } from 'react';
import SubscribeScroll from './SubsribeScroll';
import SearchTab from '../../searchTab/searchTab';
import SubscribeRow from './SubscribeRow';


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
    name: '갱신일자',
    flex: 'w-2/12',
  },
  {
    name: '경매상태',
    flex: 'w-2/12',
  },
  {
    name: '현재금액',
    flex: 'w-1/12',
  },
];

export default function SubscribeList() {

  const [selectedId, setSelectedId] = useState<string>('');
  
  return (
    <div className="mb-20">
      <SubscribeScroll
        selected={selectedId}
        selectNickname={setSelectedId}
      />
      <SearchTab tabType={0} hasAuctionState={true} hasDateState={true} hasNameState={true} hasOrderState={false} auctionType={1} />
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
          {selectedId ? <SubscribeRow sellerId={selectedId} /> :
            <tr className="h-32">
              <td className="text-xl font-semibold" colSpan={6}>
                검색된 게시물이 없습니다.
              </td>
            </tr>}
        </tbody>
      </table>
    </div>
  );
}
