'use client';
import * as React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import ReviewModal from '../ReviewModal';
import SearchTab from '../../searchTab/searchTab';
import BoughtRow from './BoughtRow';

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
    name: '배송상태',
    flex: 'w-1/12',
  },
  {
    name: '후기작성',
    flex: 'w-2/12',
  },
];

type rowType = {
  id: number;
  img: string;
  title: string;
  unit: string;
  price: number;
  date: string;
  deliv: string;
  review: boolean;
};

type modalType = {
  id: number;
  title: string;
  img: string;
  unit: string;
  price: number;
};

export default function BoughtList() {
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<modalType>({
    id: 0,
    title: '',
    img: '',
    unit: '',
    price: 0,
  });

  function closeModal() {
    setShowModal(false);
  }

  function openModal(getModalInfo: rowType) {
    let newModalInfo: modalType = {
      id: getModalInfo.id,
      title: getModalInfo.title,
      img: getModalInfo.img,
      unit: getModalInfo.unit,
      price: getModalInfo.price,
    };
    setModalInfo(newModalInfo);
    setShowModal(true);
  }

  const rows: rowType[] = [
    
  ];

  return (
    <div className="mb-20">
      {showModal ? (
        <ReviewModal
          deadID={modalInfo.id}
          img={modalInfo.img}
          title={modalInfo.title}
          unit={modalInfo.unit}
          price={modalInfo.price}
          closeModal={closeModal}
        />
      ) : null}
      <SearchTab tabType={2} />
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
            {rows.length!=0?
                (rows.map((row: rowType, index) => (
                    <BoughtRow row={row} key={index} openModal={openModal} />
              ))):
              <tr className='h-32'><td className="text-xl font-semibold" colSpan={cols.length}>검색된 게시물이 없습니다.</td></tr>
              }
          </tbody>
        </table>
      </div>
    </div>
  );
}
