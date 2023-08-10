"use client";
import * as React from 'react';
import SearchTab from '../MyPage/searchTab';
import { useResetRecoilState } from 'recoil';
import { searchState } from '@/store/mypage';
import SellerAuctionRow from './SellerAuctionRow';

type colType = { name:string , flex:string};
const cols : colType[]  = [
    {
        name : "상품이미지",
        flex : "w-3/12",
    },
    {
        name : "제목",
        flex : "w-6/12",
    },
    {
        name : "단위",
        flex : "w-1/12",
    },
    {
        name : "시작가격",
        flex : "w-1/12",
    },
    {
        name : "경매일자",
        flex : "w-2/12",
    },
    {
        name : "경매상태",
        flex : "w-1/12",
    },
    {
        name : "후기확인",
        flex : "w-2/12",
    }
];

type rowType = {
    id:number,
    img?:string,
    title:string,
    unit:string,
    price:number,
    date:string,
    state:number,
    review:boolean
};



export default function SellerAuctionList() {
    
    const rows : rowType[] = [
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            title: "맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다eeeeeeeeeeeeeeeeeeeeeeeeeeee",
            unit : "1kg",
            price : 13000,
            date : "2023-07-28",
            state : 2,
            review : true,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "10kg",
            price : 15000,
            date : "2023-07-28",
            state : 1,
            review : true,        
        }
    ]
    
    
    const resetSearchTap = useResetRecoilState(searchState);

    resetSearchTap();

   

    return (
        <div className='mb-20'>
            <SearchTab tabType={1} />
            <div>
                <table className='table-fixed border-collapse border-y-2 w-full text-center border-neutral-300'>
                    <thead className='font-bold  text-xl'>
                        <tr className="border-y">
                            {cols.map((col, index) => (
                                    <td key={index} className={`${col.flex}` + " py-8"}>{col.name}</td>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row,index)=>
                            <SellerAuctionRow key={index} row={row}/>
                        )}
                    </tbody>
                </table>
            </div>

        </div>

    );
 }