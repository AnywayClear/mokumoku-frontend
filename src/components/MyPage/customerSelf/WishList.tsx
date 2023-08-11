"use client"
import {useState} from 'react';
import {ImHeartBroken} from "react-icons/im"
import Image from "next/image";
import SearchTab from '../searchTab';
import WishRow from './WishRow';

type colType = { name:string , flex:string};
const cols : colType[]  = [
    {
        name : "상품이미지",
        flex : "w-2/12",

    },
    {
        name : "제목",
        flex : "w-5/12",
    },
    {
        name : "판매자",
        flex : "w-2/12",
    },
    {
        name : "단위",
        flex : "w-1/12"
    },
    {
        name : "경매예정일",
        flex : "w-2/12",
    },
    {
        name : "시작금액",
        flex : "w-1/12",
    },
    {
        name : "찜 삭제",
        flex : "w-1/12",
    }
];

type rowType = {
    id:number,
    img?:string,
    title:string,
    seller:string,
    unit:string,
    price:number,
    date:string
};



export default function WishList() {

    const [orderState, setOrderState] = useState('');
    
  const rows : rowType[] = [
    {
        id : 0,
        img : "https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        title: "맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다eeeeeeeeeeeeeeeeeeeeeeeeeeee",
        unit : "1kg",
        price : 13000,
        date : "2023-07-28",
        seller : "하니네팜"     
    },{
      id : 1,
      img : "https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      title: "맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다eeeeeeeeeeeeeeeeeeeeeeeeeeee",
      unit : "1kg",
      price : 13000,
      date : "2023-07-28",
      seller : "하니네팜"      
  }
  ];
  
  return (
    <div className='mb-20'>
          <SearchTab tabType={3} />
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
                        {rows.map((row,index)=><WishRow key={index} row={row}/>)}
                    </tbody>
                </table>

        </div>
        </div>

  );
}
