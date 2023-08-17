'use client';
import * as React from 'react';
import { useContext, useState } from 'react';
import ReviewModal from '../ReviewModal';
import SearchTab from '../../searchTab/searchTab';
import BoughtRow from './BoughtRow';
import { AuthContext } from '@/context/AuthContext';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { Deal, DealList } from '@/model/deal';
import { useRecoilState } from 'recoil';
import { searchType } from '@/model/mypage';
import { searchState } from '@/store/mypage';
import { dayjsToStringDash } from '@/service/myFunc';
import { getDealList } from '@/service/api/deal';
import dayjs from 'dayjs';
import PayModal from '../PayModal';
import { Pagination } from '@mui/material';

type colType = { name: string; flex: string };
const cols: colType[] = [
  {
    name: '상품이미지',
    flex: 'w-2/12',
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
    name: '입찰가격',
    flex: 'w-1/12',
  },
  {
    name: '낙찰일자',
    flex: 'w-2/12',
  },
  {
    name: '결제/후기',
    flex: 'w-2/12',
  },
];

type modalType = {
  id: number;
  title: string;
  img: string;
  unit: number;
  price: number;
};

export default function BoughtList() {
  const [currentPage, setCurrentPage] = useState(1);
  const size = 5;
  const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewModalInfo, setReviewModalInfo] = useState<modalType>({
    id: 0,
    title: '',
    img: '',
    unit: 0,
    price: 0,
  });
  const [showPayModal, setShowPayModal] = useState(false);
  const [payModalInfo, setPayModalInfo] = useState<modalType>({
    id: 0,
    title: '',
    img: '',
    unit: 0,
    price: 0,
  });

  const [{ startDateStr, endDateStr }] =
    useRecoilState<searchType>(searchState);

  const { user } = useContext(AuthContext);
  const { data: dealList }: UseQueryResult<DealList> = useQuery({
    queryKey: ['dealList', startDateStr, endDateStr, currentPage],
    queryFn: () =>
      getDealList(
        user?.userId,
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
        currentPage - 1,
        size,
      ),
  });

  function closeReviewModal() {
    setShowReviewModal(false);
  }
  function closePayModal() {
    setShowPayModal(false);
  }

  function openReviewModal(getModalInfo: Deal) {
    let newModalInfo: modalType = {
      id: getModalInfo.dealId,
      title: getModalInfo.produce.name,
      img: getModalInfo.produce.image,
      unit: getModalInfo.produce.kg,
      price: getModalInfo.endPrice,
    };
    setReviewModalInfo(newModalInfo);
    setShowReviewModal(true);
  }

  function openPayModal(getModalInfo: Deal) {
    let newModalInfo: modalType = {
      id: getModalInfo.dealId,
      title: getModalInfo.produce.name,
      img: getModalInfo.produce.image,
      unit: getModalInfo.produce.kg,
      price: getModalInfo.endPrice,
    };
    setPayModalInfo(newModalInfo);
    setShowPayModal(true);
  }

  return (
    <div className="mb-20">
      {showReviewModal ? (
        <ReviewModal
          deadID={reviewModalInfo.id}
          img={reviewModalInfo.img}
          title={reviewModalInfo.title}
          unit={reviewModalInfo.unit}
          price={reviewModalInfo.price}
          closeModal={closeReviewModal}
        />
      ) : null}
      {showPayModal ? (
        <PayModal
          deadID={payModalInfo.id}
          img={payModalInfo.img}
          title={payModalInfo.title}
          unit={payModalInfo.unit}
          price={payModalInfo.price}
          closeModal={closePayModal}
        />
      ) : null}
      <SearchTab
        tabType={0}
        hasAuctionState={false}
        hasDateState={true}
        hasNameState={true}
        hasOrderState={false}
        auctionType={0}
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
            {dealList?.data.length != 0 ? (
              dealList?.data.map((row: Deal, index) => (
                <BoughtRow
                  row={row}
                  key={index}
                  openReviewModal={openReviewModal}
                  openPayModal={openPayModal}
                />
              ))
            ) : (
              <tr className="h-32">
                <td className="text-xl font-semibold" colSpan={cols.length}>
                  검색된 게시물이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        count={dealList?.pageInfo.totalPages || 0}
        page={currentPage}
        onChange={onPageChange}
        size="medium"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '15px 0',
        }}
      />
    </div>
  );
}
