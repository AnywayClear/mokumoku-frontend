'use client';
import React from 'react';
import Image from 'next/image';
import { Produce, ProduceList } from '@/model/produce';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { searchState } from '@/store/mypage';
import { searchType } from '@/model/mypage';
import { getProduceList2 } from '@/service/api/produce';
import Link from 'next/link';
import { dateToStringDot } from '@/myFunc';

type Props = {
  sellerId: string;
};
const auctionStateArr = ['경매전', '경매중', '경매완료'];

export default function SubscribeRow({ sellerId }: Props) {
  const [{ title }] = useRecoilState<searchType>(searchState);
  const { data: produceList }: UseQueryResult<ProduceList> = useQuery({
    queryKey: ['produceList', title, sellerId],
    queryFn: () => getProduceList2('0,1,2', title, sellerId, 0, 10),
  });

  return (
    <>
      {produceList?.data.length !== 0 && produceList ? (
        produceList?.data?.map((produce, index) =>
          produce.auctionResponseList.map((auction, index2) => (
            <tr key={index * 10 + index2} className="border-y text-lg">
              <td>
                {produce.image !== undefined ? (
                  <Image
                    src={
                      produce.image ||
                      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
                    }
                    alt="상품이미지"
                    width={300}
                    height={300}
                    className="h-32 w-80 object-cover"
                  />
                ) : null}
              </td>
              <td>
                <Link href={`/product/${produce.id}`}>
                  <p className="px-6 py-6 underline truncate hover:opacity-70">
                    {produce.name}
                  </p>
                </Link>
              </td>
              <td>
                <p>{produce.ea}</p>
              </td>
              <td>
                <p>{dateToStringDot(auction.updatedAt)}</p>
              </td>
              <td>
                <p>{auctionStateArr[produce.status]}</p>
              </td>
              <td>
                <p>{auction.price}</p>
              </td>
            </tr>
          )),
        )
      ) : (
        <tr className="h-32">
          <td className="text-xl font-semibold" colSpan={6}>
            검색된 게시물이 없습니다.
          </td>
        </tr>
      )}
    </>
  );
}
