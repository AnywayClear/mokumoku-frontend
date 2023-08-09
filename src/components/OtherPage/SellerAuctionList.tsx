"use client";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, MenuItem, Select, InputLabel, FormControl , SelectChangeEvent   } from '@mui/material';
import Image from 'next/image';

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

const auctionStateArr : string[] = ["경매전","경매중","경매완료"];
const dateStateArr : string[] = ["하루전","한달전","일년전"];
const orderStateArr : string[] = ["시간순","이름순","가격순"];

type chipStyleType ={
    on:string,
    off:string,
    common:string,
    hover:string
};

const chipStyle:chipStyleType = {
    on:"text-green-500 border-green-500 border-[3px] px-[9px] py-[2px] ",
    off:"text-neutral-400 border-neutral-300 border-2 px-[10px] py-[3px] ",
    common:"bg-white rounded-full font-semibold h-fit ",
    hover:"hover:text-green-500 hover:border-green-500 hover:border-[3px] hover:px-[9px] hover:py-[2px] "
};



export default function SellerAuctionList() {
    
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const [auctionState, setAuctionState] = React.useState<number>(-1); 
    const [dateState, setDateState] = React.useState<number>(-1); 
    const [orderState, setOrderState] = React.useState('');

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
            review : false,        
        }
    ]

    function changeAutionState(num:number){
        if(num===auctionState){
            setAuctionState(-1);
        }else{
            setAuctionState(num);
        }
    }

    function changeDateState(num:number){
        if(num==dateState){
            setDateState(-1);
            setStartDate(null);
            setEndDate(null);
        }else{

            setDateState(num);
            setEndDate(dayjs());

            if(num===0){
                setStartDate(dayjs().subtract(1,"day"));
            }else if(num===1){
                setStartDate(dayjs().subtract(30,"day"));
            }else if(num===2){
                setStartDate(dayjs().subtract(365,"day"));
            }
        }
    }

    //새로운 시작일이 종료일보다 빠르면 종료일을 시작일로 설정
    //종료일이 현재일이고 1일, 30일, 1년 차이면 setDateState
    //그외엔 setDateState(-1)
    function changeStartDate(newDate:Dayjs|null){

        if(newDate!==null){
            if(newDate.isAfter(dayjs())) newDate = dayjs();
            setStartDate(newDate);
        }

        if(endDate !== null){
            if(endDate.isBefore(newDate)){
                setEndDate(newDate);
            }

            setDateState(-1);

            if(endDate.diff(dayjs(),"day")==0){
                if(endDate.diff(newDate,'day')===1){
                    setDateState(0);
                }else if(endDate.diff(newDate,'day')===30){
                    setDateState(1);
                }else if(endDate.diff(newDate,'day')===365){
                    setDateState(2);
                }
            }
        }
        
    }

    //새로운 종료일이 오늘보다 늦으면 그냥 오늘로 설정
    //새로운 종료일이 시작일보다 빠르면 시작일을 종료일로 설정
    //종료일이 현재일이고 1일, 30일, 1년 차이면 setDateState
    //그외엔 setDateState(-1)
    function changeEndDate(newDate:Dayjs|null){

        if(newDate!==null){
            if(newDate.isAfter(dayjs())) newDate = dayjs();
            setEndDate(newDate);
        }

        if(startDate !== null){
            if(startDate.isAfter(newDate)){
                setStartDate(newDate);
            }

            setDateState(-1);

            if(newDate !== null && newDate.diff(dayjs(),"day")==0){
                if(newDate.diff(startDate,'day')===1){
                    setDateState(0);
                }else if(newDate.diff(startDate,'day')===30){
                    setDateState(1);
                }else if(newDate.diff(startDate,'day')===365){
                    setDateState(2);
                }
            }
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setOrderState(event.target.value);
    };
    

    return (
        <div className='mb-16'>
            <div className="flex space-x-2 mt-16">
                {auctionStateArr.map((autcionStateArrItem, index)=>
                <button key={index} className={(index===auctionState?chipStyle.on:chipStyle.off)+chipStyle.common +chipStyle.hover } onClick={()=>changeAutionState(index)}>{autcionStateArrItem}</button>
                )}
            </div>
            <div className="flex justify-between">
                <div className="flex space-x-2 items-center">
                    <div className="flex space-x-2 mr-4">
                        {dateStateArr.map((dateStateArrItem, index)=>
                        <button key={index} className={`${(index===dateState?chipStyle.on:chipStyle.off)+chipStyle.common + chipStyle.hover} `} onClick={()=>changeDateState(index)}>{dateStateArrItem}</button>
                        )}
                    </div>
                <div className="flex items-center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker  
                            label="시작일" 
                            slotProps={{ textField: { size: 'small' } }} 
                            value={startDate}
                            onChange={(newValue) => changeStartDate(newValue)} 
                            className="w-44"
                            />
                            <p className="text-bold text-xl mx-1">~</p>
                            <DatePicker
                            label="종료일" 
                            slotProps={{ textField: { size: 'small' } }}
                            value={endDate}
                            onChange={(newValue) => changeEndDate(newValue)} 
                            className="w-44 mr-4"
                            />
                    </LocalizationProvider>  
                    <TextField
                        label="물품이름 검색"
                        size="small"
                        className="w-52"
                    />
                    <button 
                    className="bg-white text-neutral-800 text-lg font-semibold rounded-md px-4 p-[0.28rem] border-2 border-neutral-300 hover:opacity-70"
                    >검색</button>
                    </div>
                    
                </div>
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
                <table className='table-fixed border-collapse border-y-2 w-full text-center mt-5 mb-20  border-neutral-300'>
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
                            <td><a href="#"><p className='p-6 underline truncate hover:opacity-70'>{row.title}</p></a></td>
                            <td><p>{row.unit}</p></td>
                            <td><p>{row.price}</p></td>
                            <td><p>{row.date}</p></td>
                            <td><p>{auctionStateArr[row.state]}</p></td>
                            <td>{row.review?<button className='rounded-md bg-black text-white py-1 px-2 hover:opacity-70' >후기확인</button>:<></>}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>

        </div>

    );
 }