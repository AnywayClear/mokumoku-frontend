import React from 'react';
import Image from 'next/image';
import { FcCancel } from 'react-icons/fc';
import { Auction, Produce } from '@/model/produce';
import { dateToStringDot } from '@/service/myFunc';
import Link from 'next/link';

type Props = {
  produce: Produce;
  auction: Auction;
};
const auctionStateArr = ['경매전', '경매중', '경매완료'];
export default function AuctionRow({ produce, auction }: Props) {
  return (
    <>
      <tr className="border-y text-lg">
        <td>
          {produce.image !== undefined ? (
            <Image
              src={produce.image}
              alt="상품이미지"
              width={300}
              height={300}
              className="h-32 w-80 object-cover"
            />
          ) : null}
        </td>
        <td className="flex items-center justify-center">
          <Link
            href={`/product/${produce.id}`}
            className="pl-4 py-10 max-w-[85%] underline hover:opacity-70 "
          >
            <p className="truncate ">{produce.name}</p>
          </Link>
        </td>
        <td>
          <p>{produce.kg}kg</p>
        </td>
        <td>
          <p>{auction.price}</p>
        </td>
        <td>
          <p>{dateToStringDot(auction.updatedAt)}</p>
        </td>
        <td>
          <p className="py-10 hover:opacity-70">
            {auctionStateArr[produce.status]}
          </p>
        </td>
      </tr>
    </>
  );
}
