import React from 'react';
import Image from 'next/image';
import { ImHeartBroken } from 'react-icons/im';

type rowType = {
    id:number,
    img?:string,
    title:string,
    seller:string,
    unit:string,
    price:number,
    date:string
};

type Props = {
    row:rowType;
}

export default function WishRow({row}:Props) {
  return (
    <>
        <tr className="border-y text-lg">
            <td>{row.img !== undefined ? <Image src={row.img} alt='상품이미지' width={300} height={300} className='h-32 w-80 object-cover' />:null}</td>
            <td>
                <a href="#">
                    <p className='px-6 underline truncate hover:opacity-70'>{row.title}</p>
                </a>
            </td>
            <td>
                <a href="#" className='w-full h-full'>
                    <u className="hover:opacity-70">{row.seller}</u>
                </a>
            </td>
            <td><p>{row.unit}</p></td>
            <td><p>{row.date}</p></td>
            <td><p>{row.price}</p></td>
            <td>
                <a className="hover:opacity-30 p-6" href="#">
                    <ImHeartBroken className="mx-auto"/>
                </a>
            </td>
        </tr>
    </>
  )
}
