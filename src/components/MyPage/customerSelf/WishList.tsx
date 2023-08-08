"use client"
import {useState} from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import {ImHeartBroken} from "react-icons/im"
import Image from "next/image";

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


const orderStateArr : string[] = ["시간순","이름순","가격순"];


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


    const handleChange = (event: SelectChangeEvent) => {
        setOrderState(event.target.value);
    };

  
  return (
    <div className='mb-16'>
           
           <div className="flex items-center justify-end">
                    <TextField
                        label="물품이름 검색"
                        size="small"
                        className="w-52"
                    />
                    <button 
                    className="hover:opacity-70 bg-white text-neutral-800 text-lg font-semibold rounded-md px-4 p-[0.28rem] border-2 border-neutral-300"
                    >검색</button>

                    
                
                <div className='font-bold'>
                    <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-select-small-label">정렬기준</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={orderState}
                            label="정렬기준"
                            onChange={handleChange}
                            inputProps={{MenuProps: {disableScrollLock: true}}}
                        >
                            {orderStateArr.map((orderStateArrItem,index)=><MenuItem value={index} key={index}>{orderStateArrItem}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
            </div>
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
                            <td><a href="#"><p className='px-6 underline truncate hover:opacity-70'>{row.title}</p></a></td>
                            <td><a href="#" className='w-full h-full'><u className="hover:opacity-70">{row.seller}</u></a></td>
                            <td><p>{row.unit}</p></td>
                            <td><p>{row.date}</p></td>
                            <td><p>{row.price}</p></td>
                            <td><a className="hover:opacity-30 p-6" href="#"><ImHeartBroken className="mx-auto"/></a></td>
                        </tr>))}
                    </tbody>
                </table>

        </div>
        </div>

  );
}
