'use client';
import * as React from 'react';
import SearchTab from '../MyPage/searchTab/searchTab';
import { useRecoilState } from 'recoil';
import { searchState } from '@/store/mypage';
import SellerAuctionRow from './SellerAuctionRow';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ProduceList } from '@/model/produce';
import { getProduceList2 } from '@/service/api/produce';
import { searchType } from '@/model/mypage';
import { getDealList, getDealList2 } from '@/service/api/deal';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { DealList } from '@/model/deal';

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
    name: '현재금액',
    flex: 'w-1/12',
  },
  {
    name: '갱신일자',
    flex: 'w-2/12',
  },
  {
    name: '경매상태',
    flex: 'w-1/12',
  },
  {
    name: '후기확인',
    flex: 'w-2/12',
  },
];

type Props = {
  slug: string;
};
export default function SellerAuctionList({ slug }: Props) {
  const { user } = useContext(AuthContext);
  const [{ auctionState, title }] = useRecoilState<searchType>(searchState);

  const { data: produceList }: UseQueryResult<ProduceList> = useQuery({
    queryKey: ['produceList', auctionState, title],
    queryFn: () => getProduceList2(auctionState.toString(), title, slug, 0, 10),
  });
  // consumerId: string | undefined,
  // startDate: String,
  // endDate: string,
  // page: number,
  // size: number,
  const { data: dealList }: UseQueryResult<DealList> = useQuery({
    queryKey: ['dealList', auctionState],
    queryFn: () => getDealList2(user?.userId, 0, 10),
  });

  return (
    <div className="mb-20">
      {
        auctionState[0]===0?<SearchTab tabType={1} />:<SearchTab tabType={4} />
      }
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
            {auctionState[0] !== 3 ? (
              produceList?.data.length !== 0 && produceList !== undefined ? (
                produceList?.data?.map((produce, index) =>
                  produce.auctionResponseList.map((auction, index2) => (
                    <SellerAuctionRow
                      key={index2}
                      produce={produce}
                      auction={auction}
                    />
                  )),
                )
              ) : (
                <tr className="h-32">
                  <td className="text-xl font-semibold" colSpan={cols.length}>
                    검색된 게시물이 없습니다.
                  </td>
                </tr>
              )
            ) : (
              produceList?.data.length !== 0 && produceList !== undefined ? (
                produceList?.data?.map((produce, index) =>
                  produce.auctionResponseList.map((auction, index2) => (
                    <SellerAuctionRow
                      key={index2}
                      produce={produce}
                      auction={auction}
                    />
                  )),
                )
              ) : (
                <tr className="h-32">
                  <td className="text-xl font-semibold" colSpan={cols.length}>
                    검색된 게시물이 없습니다.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
