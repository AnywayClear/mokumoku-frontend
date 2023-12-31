'use client';
import * as React from 'react';
import SearchTab from '../../searchTab/searchTab';
import AuctionRow from './AuctionRow';
import { getProduceList2 } from '@/service/api/produce';
import { useRecoilState } from 'recoil';
import { searchType } from '@/model/mypage';
import { searchState } from '@/store/mypage';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ProduceList } from '@/model/produce';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { Pagination } from '@mui/material';

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

export default function AuctionList() {

  const { user } = useContext(AuthContext);
  const [{ auctionState, title }] = useRecoilState<searchType>(searchState);
  const [currentPage, setCurrentPage] = React.useState(1);

  const size = 2;
  const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
  };

  const { data: produceList }: UseQueryResult<ProduceList> = useQuery({
    queryKey: ['produceList',auctionState, title,currentPage],
    queryFn: () => getProduceList2(auctionState.toString(), title, user?.userId, currentPage-1, size),
  });

  

  return (
    <div className="mb-20">
      <SearchTab
          tabType={0}
          hasAuctionState={true}
          hasDateState={false}
          hasNameState={true}
          hasOrderState={false}
          auctionType={1}
        />
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
            {produceList?.data.length!==0 && produceList!==undefined?(produceList?.data?.map((produce, index) => (
              produce.auctionResponseList.map((auction, index2) => (
                <AuctionRow key={index2} produce={produce} auction={auction} />
              ))
            ))):
            <tr className='h-32'><td className="text-xl font-semibold" colSpan={cols.length}>검색된 게시물이 없습니다.</td></tr>
          }
          </tbody>
        </table>
      </div>
      <Pagination
        count={produceList?.pageInfo.totalPages||0}
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
