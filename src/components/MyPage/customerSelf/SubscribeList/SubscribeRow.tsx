import React from 'react';
import Image from 'next/image';
type rowType = {
    id: number;
    img?: string;
    title: string;
    unit: string;
    price: number;
    date: string;
    state: string;
};
  
type Props = {
    row: rowType;
}

export default function SubscribeRow({row}:Props) {
    return (
        <tr className="border-y text-lg">
            <td>
            {row.img !== undefined ? (
                <Image
                src={row.img}
                alt="상품이미지"
                width={300}
                height={300}
                className="h-32 w-80 object-cover"
                />
            ) : null}
            </td>
            <td>
            <a href="#">
                <p className="px-6 py-6 underline truncate hover:opacity-70">{row.title}</p>
            </a>
            </td>
            <td><p>{row.unit}</p></td>
            <td><p>{row.date}</p></td>
            <td><p>{row.state}</p></td>
            <td><p>{row.price}</p></td>
        </tr>
    );
}

