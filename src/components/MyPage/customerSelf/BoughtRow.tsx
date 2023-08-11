
import React from 'react';
import Image from 'next/image';

type rowType = {
    id:number,
    img:string,
    title:string,
    unit:string,
    price:number,
    date:string,
    deliv:string,
    review:boolean
};

type Props = {
    row: rowType;
    openModal: Function;
}

export default function BoughtRow({row, openModal }:Props) {
    return (
        (<tr className="border-y text-lg">
                <td>{row.img !== undefined ? <Image src={row.img} alt='상품이미지' width={300} height={300} className='h-32 w-80 object-cover' />:null}</td>
                <td><a href="#"><p className='p-6 underline truncate hover:opacity-70'>{row.title}</p></a></td>
                <td><p>{row.unit}</p></td>
                <td><p>{row.price}</p></td>
                <td><p>{row.date}</p></td>
                <td><a href=''><u className='hover:opacity-70'>{row.deliv}</u></a></td>
                <td>{row.review?<button className='rounded-md bg-black text-white py-1 px-2 hover:opacity-70' onClick={()=>{openModal(row)}}>후기작성</button>:<></>}</td>
        </tr>)
    );
}

