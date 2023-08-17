import React from 'react';
import Image from 'next/image';
import { Auction, Produce } from '@/model/produce';
import { dateToStringDot } from '@/service/myFunc';
import Link from 'next/link';
type Props = {
  produce: Produce;
  auction: Auction;
};

const auctionStateArr = ['경매전', '경매중', '경매완료'];

export default function SellerAuctionRow({ produce, auction }: Props) {
  return (
    <tr className="border-y text-lg">
      <td>
        <Image
          src={
            produce.image
              ? produce.image
              : 'https://images.unsplash.com/photo-1690149347325-13435f400dd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80'
          }
          alt="상품이미지"
          width={300}
          height={300}
          className="h-32 w-80 object-cover"
        />
      </td>
      <td>
        <Link href={`/product/${produce.id}`}>
          <p className="p-6 underline truncate hover:opacity-70">
            {produce.name}
          </p>
        </Link>
      </td>
      <td>
        <p>{produce.kg}</p>
      </td>
      <td>
        <p>{auction.price}</p>
      </td>
      <td>
        <p>{dateToStringDot(auction.updatedAt)}</p>
      </td>
      <td>
        <p>{auctionStateArr[produce.status]}</p>
      </td>
      <td></td>
    </tr>
  );
}
