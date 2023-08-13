import React from 'react';
import Image from 'next/image';
import { ImHeartBroken } from 'react-icons/im';
import { Produce } from '@/model/produce';
import { getProduce } from '@/service/api/produce';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { dateToString } from '@/myFunc';

type Props = {
    id: number;
}

export default function WishRow({ id }: Props) {
    
    const { data: produce }: UseQueryResult<Produce> = useQuery({
        queryKey: ['produce'],
        queryFn: () => getProduce(id),
      });

  return (
    <>
        <tr className="border-y text-lg">
            <td>{produce?.image !== undefined ? <Image src={produce?.image} alt='상품이미지' width={300} height={300} className='h-32 w-80 object-cover' />:null}</td>
            <td>
                <a href="#">
                    <p className='px-6 underline truncate hover:opacity-70'>{produce?.name}</p>
                </a>
            </td>
            <td>
                <a href="#" className='w-full h-full'>
                    <u className="hover:opacity-70">{produce?.seller}</u>
                </a>
            </td>
            <td><p>{produce?.ea}</p></td>
            <td><p>{produce?dateToString(produce.startDate):null}</p></td>
            <td><p>{produce?.startPrice}</p></td>
            <td>
                <a className="hover:opacity-30 p-6" href="#">
                    <ImHeartBroken className="mx-auto"/>
                </a>
            </td>
        </tr>
    </>
  )
}
