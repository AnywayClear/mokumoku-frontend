import React from 'react';
import Image from 'next/image';
import { Produce, ProduceList } from '@/model/produce';
import { dateToString } from '@/myFunc';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { searchState } from '@/store/mypage';
import { searchType } from '@/model/mypage';
import { getProduceList2 } from '@/service/api/produce';

  
type Props = {
    sellerId: string;
}
const auctionStateArr = ["경매전", "경매중", "경매완료"];

export default function SubscribeRow({ sellerId }: Props) {
    
    const [{ title }] = useRecoilState<searchType>(searchState);
    const { data: produceList }: UseQueryResult<ProduceList> = useQuery({
        queryKey: ['produceList',title, sellerId],
        queryFn: () => getProduceList2("0,1,2", title, sellerId, 0, 10),
    });

    return (
    <>
        {   produceList?.data?.map((produce, index) => (
                produce.auctionResponseList.map((auction, index2) => (
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
                            <td>
                            <a href="#">
                                <p className="px-6 py-6 underline truncate hover:opacity-70">{produce.name}</p>
                            </a>
                            </td>
                            <td><p>{produce.ea}</p></td>
                            <td><p>{dateToString(auction.updatedAt)}</p></td>
                            <td><p>{auctionStateArr[produce.status]}</p></td>
                            <td><p>{auction.price}</p></td>
                        </tr>
                    
           ))))
        }
    </>
    );
}

