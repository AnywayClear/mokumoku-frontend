"use client";
import * as React from 'react';
import Image from 'next/image';
import {FcCancel} from 'react-icons/fc';
import SearchTab from '../searchTab';

type colType = { name:string , flex:string};
const cols : colType[]  = [
    {
        name : "상품이미지",
        flex : "w-3/12",
    },
    {
        name : "제목",
        flex : "w-5/12",
    },
    {
        name : "단위",
        flex : "w-1/12",
    },
    {
        name : "입찰가격",
        flex : "w-1/12",
    },
    {
        name : "경매일자",
        flex : "w-2/12",
    },
    {
        name : "배송상태",
        flex : "w-1/12",
    }
];

type rowType = {
    id:number,
    img?:string,
    title:string,
    unit:string,
    price:number,
    date:string,
    deliv:string
};



export default function AuctionList() {
    

    const rows : rowType[] = [
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            title: "맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다eeeeeeeeeeeeeeeeeeeeeeeeeeee",
            unit : "1kg",
            price : 13000,
            date : "2023-07-28",
            deliv : "배송완료"     
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "3kg",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기"      
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기"   
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기"       
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기"      
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기"     
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기"    
        }
    ]
    
    return (
        <div className='mb-16'>
            <SearchTab tabType={1}/>
            <div>
                <table className='table-fixed border-collapse border-y-2 w-full text-center mt-6 border-neutral-300'>
                    <thead className='font-bold  text-xl'>
                        <tr className="border-y">
                            {cols.map((col, index) => (
                                    <td key={index} className={`${col.flex}` + " py-8"}>{col.name}</td>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row,index2)=>
                        (<tr key={index2} className="border-y text-lg">
                            <td>{row.img !== undefined ? <Image src={row.img} alt='상품이미지' width={300} height={300} className='h-32 w-80 object-cover' />:null}</td>
                            <td><div className='flex items-center justify-center'>
                                <a href="#" className='pl-4 py-10 max-w-[85%] underline hover:opacity-70 '><p className='truncate '>{row.title}</p></a>
                                <a href="#" className='pr-4 py-10 hover:opacity-70 text-sm flex items-center'><p>삭제</p><FcCancel/></a>
                                </div></td>
                            <td><p>{row.unit}</p></td>
                            <td><p>{row.price}</p></td>
                            <td><p>{row.date}</p></td>
                            <td><a href=''><u className='pl-4 py-10 hover:opacity-70'>{row.deliv}</u></a></td>
                        </tr>))}
                    </tbody>
                </table>
            </div>

        </div>

    );
 }