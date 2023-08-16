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
import SellerDealRow from './SellerDealRow';
import { dayjsToStringDash } from '@/myFunc';
import dayjs from 'dayjs';

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
  const [{ auctionState, title,startDateStr,endDateStr }] = useRecoilState<searchType>(searchState);

  const { data: produceList }: UseQueryResult<ProduceList> = useQuery({
    queryKey: ['produceList', auctionState, title],
    queryFn: () => getProduceList2(auctionState.toString(), title, slug, 0, 10),
  });
  
  const { data: dealList }: UseQueryResult<DealList> = useQuery({
    queryKey: ['dealList', startDateStr, endDateStr],
    queryFn: () =>
      getDealList(
        slug,
        dayjsToStringDash(
          dayjs(
            startDateStr && startDateStr?.length > 1
              ? startDateStr
              : '2023-01-01',
          ),
        ),
        dayjsToStringDash(
          (endDateStr && endDateStr.length > 1
            ? dayjs(endDateStr)
            : dayjs()
          ).add(1, 'day'),
        ),
        0,
        5,
      ),
  });

  return (
    <div className="mb-20">
      {
        auctionState[0] !== 3 ?
          <SearchTab tabType={0} hasAuctionState={true} hasDateState={true} hasNameState={true} hasOrderState={true} auctionType={2} />
          :
          <SearchTab tabType={0} hasAuctionState={true} hasDateState={true} hasNameState={false} hasOrderState={false} auctionType={2} />
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
                      key={index*10+index2}
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
              dealList?.data.length !== 0 && dealList !== undefined ? (
                dealList?.data?.map((deal, index) =>
                    <SellerDealRow
                    key={index}
                    deal={deal}
                    produce={deal.produce}
                    />
                  ,
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
