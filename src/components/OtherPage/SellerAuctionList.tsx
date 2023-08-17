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
import { getDealList } from '@/service/api/deal';
import { DealList } from '@/model/deal';
import SellerDealRow from './SellerDealRow';
import { dayjsToStringDash } from '@/myFunc';
import dayjs from 'dayjs';
import { Pagination } from '@mui/material';
import { useEffect } from 'react';

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

  const [{ auctionState, title,startDateStr,endDateStr }] = useRecoilState<searchType>(searchState);

  const [currentPage, setCurrentPage] = React.useState(1);
  const psize = 2;
  const dsize = 5;

  useEffect(() => { 
    setCurrentPage(1);
  },[auctionState])

  const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
  };

  const { data: produceList }: UseQueryResult<ProduceList> = useQuery({
    queryKey: ['produceList', auctionState, title, currentPage],
    queryFn: () => getProduceList2(auctionState.toString(), title, slug, currentPage-1, psize),
  });

  const { data: dealList }: UseQueryResult<DealList> = useQuery({
    queryKey: ['dealList', startDateStr, endDateStr, currentPage],
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
        currentPage-1,
        dsize,
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
      <Pagination
        count={auctionState[0] === 3 ?
          dealList?.pageInfo.totalPages
          :
          produceList?.pageInfo.totalPages}
        page={currentPage}
        onChange={onPageChange}
        size="medium"
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "15px 0",
        }}
      />
    </div>
  );
}
