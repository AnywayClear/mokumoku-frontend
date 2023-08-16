import React from 'react';
import Image from 'next/image';
import { Deal } from '@/model/deal';
import { dateToStringDot } from '@/myFunc';
import Link from 'next/link';

type Props = {
  row: Deal;
  openReviewModal: Function;
  openPayModal: Function;
};

export default function BoughtRow({
  row,
  openReviewModal,
  openPayModal,
}: Props) {
  return (
    <tr className="border-y text-lg">
      <td>
        {row.produce.image !== undefined ? (
          <Image
            src={row.produce.image}
            alt="상품이미지"
            width={300}
            height={300}
            className="h-32 w-80 object-cover"
          />
        ) : null}
      </td>
      <td>
        <Link href={`/product/${row.produce.id}`}>
          <p className="p-6 underline truncate hover:opacity-70">
            {row.produce.name}
          </p>
        </Link>
      </td>
      <td>
        <p>{row.produce.kg}kg</p>
      </td>
      <td>
        <p>{row.endPrice}</p>
      </td>
      <td>
        <p>{dateToStringDot(row.produce.endDate)}</p>
      </td>
      <td>
        {!row.paid ? (
          <button
            className="rounded-md bg-black text-white py-1 px-2 hover:opacity-70"
            onClick={() => {
              openPayModal(row);
            }}
          >
            결제하기
          </button>
        ) : !row.reviewed ? (
          <button
            className="rounded-md bg-black text-white py-1 px-2 hover:opacity-70"
            onClick={() => {
              openReviewModal(row);
            }}
          >
            후기작성
          </button>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
}
