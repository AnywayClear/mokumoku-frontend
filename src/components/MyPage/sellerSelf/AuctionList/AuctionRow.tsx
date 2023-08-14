import React from 'react';
import Image from 'next/image';
import { FcCancel } from 'react-icons/fc';

type rowType = {
    id:number,
    img?:string,
    title:string,
    unit:string,
    price:number,
    date:string,
    deliv:string
};

type Props = {
    row: rowType,
}

export default function AuctionRow({row}:Props) {
  return (
    <>
        <tr className="border-y text-lg">
            <td>{row.img !== undefined ? <Image src={row.img} alt='상품이미지' width={300} height={300} className='h-32 w-80 object-cover' />:null}</td>
            <td><div className='flex items-center justify-center'>
                <a href="#" className='pl-4 py-10 max-w-[85%] underline hover:opacity-70 '><p className='truncate '>{row.title}</p></a>
                <a href="#" className='pr-4 py-10 hover:opacity-70 text-sm flex items-center'><p>삭제</p><FcCancel/></a>
                </div></td>
            <td><p>{row.unit}</p></td>
            <td><p>{row.price}</p></td>
            <td><p>{row.date}</p></td>
            <td><a href=''><u className='pl-4 py-10 hover:opacity-70'>{row.deliv}</u></a></td>
        </tr>
    </>
  )
}
