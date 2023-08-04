"use client";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Image from 'next/image';
import {FcCancel} from 'react-icons/fc';

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
    
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

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
            <div className="flex space-x-2 mb-4 my-16">
                <button className="bg-white text-green-500 rounded-full border-green-500 border-[3px] font-semibold px-3.5 py-0.5">경매중</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">진행중</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">경매완료</button>
            </div>
            <div className="flex justify-between">
                <div className="flex space-x-2 items-center">
                    <div className="flex space-x-2 mr-4">
                        <button className="bg-white text-green-500 rounded-full border-green-500 border-[3px] font-semibold px-3.5 py-0.5 h-fit">하루전</button>
                        <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5 h-fit">한달전</button>
                        <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5 h-fit">일년전</button>
                    </div>
                <div className="flex items-center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker  
                            label="시작일" 
                            slotProps={{ textField: { size: 'small' } }} 
                            defaultValue={dayjs('2022-04-17')}
                            className="w-44"
                            />
                            <p className="text-bold text-xl">~</p>
                            <DatePicker
                            label="종료일" 
                            slotProps={{ textField: { size: 'small' } }}
                            value={value}
                            onChange={(newValue) => setValue(newValue)} 
                            className="w-44 mr-4"
                            />
                    </LocalizationProvider>  
                    <TextField
                        label="물품이름 검색"
                        defaultValue="Small"
                        size="small"
                        className="w-52"
                    />
                    <button 
                    className="bg-white text-neutral-800 text-lg font-semibold rounded-md px-4 p-[0.28rem] border-2 border-neutral-300"
                    >검색</button>
                    </div>
                    
                </div>
                <div className='font-bold'>
                    <FormControl size="small">
                        <InputLabel id="demo-select-small-label">정렬기준</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={10}
                            label="정렬기준"
                        >
                            <MenuItem value={10}>시간순</MenuItem>
                            <MenuItem value={20}>이름순</MenuItem>
                            <MenuItem value={30}>가격순</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div>
                <table className='table-fixed border-collapse border-y-2 w-full text-center mt-6 border-neutral-700'>
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