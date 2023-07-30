"use client";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField, MenuItem, Select, InputLabel, FormControl} from '@mui/material';import { type } from 'os';
import Image from 'next/image';

type colType = { name:string , flex:string};
const cols : colType[]  = [
    {
        name : "상품이미지",
        flex : "w-2/12",
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
        name : "입찰가격",
        flex : "w-1/12",
    },
    {
        name : "낙찰일자",
        flex : "w-2/12",
    },
    {
        name : "배송상태",
        flex : "w-1/12",
    },
    {
        name : "후기작성",
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
    deliv:string,
    review:boolean
};
export default function MyPageBox(){

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    const rows : rowType[] = [
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title: "맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다",
            unit : "1kg",
            price : 13000,
            date : "2023-07-28",
            deliv : "배송완료",
            review : true,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        }
    ]

    return(
       
        <div className="border-y-4 border-black py-20">
            <div className="flex space-x-2 mb-4">
                <button className="bg-white text-green-500 rounded-full border-green-500 border-[3px] font-semibold px-3.5 py-0.5">결제전</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">출고전</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">배송중</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">배송완료</button>
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
                            {cols.map((col, index)=>(<td key={index} className={`${col.flex}`+" py-8"}>{col.name}</td>))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row)=>
                        (<tr key={row.id} className="border-y text-lg">
                            <td>{row.img!==undefined?<Image src={row.img} alt='상품이미지' width={300} height={150}/>:null}</td>
                            <td><a href="#"><u>{row.title}</u></a></td>
                            <td><p>{row.unit}</p></td>
                            <td><p>{row.price}</p></td>
                            <td><p>{row.date}</p></td>
                            <td><a href=''><u>{row.deliv}</u></a></td>
                            <td>{row.review?<button className='rounded-md bg-black text-white py-1 px-2' >후기작성</button>:<></>}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}