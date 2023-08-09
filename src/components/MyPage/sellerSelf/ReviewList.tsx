"use client";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import Image from 'next/image';
import { BsStar, BsStarFill } from 'react-icons/bs';

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



export default function ReviewList(){
    
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const [dateState, setDateState] = React.useState<number>(-1); 
    const [orderState, setOrderState] = React.useState('');

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
    
    return(
        <div className='mb-16 pt-4 pb-20'>
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
                    className="hover:opacity-70 bg-white text-neutral-800 text-lg font-semibold rounded-md px-4 p-[0.28rem] border-2 border-neutral-300"
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
            <div className='py-4'>
                <div className='border-t-2 border-neutral-300 py-6'>
                    <div className='flex justify-between h-fit items-center'>
                        <Image className='' src="https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80" alt="이미지입니다." width={250} height={120} ></Image>
                        <div className='ml-7 w-full'>
                            <div className='flex h-1/2 items-end pb-4'>
                                <a href="#"><p className='font-bold text-3xl mr-4 underline underline-offset-4'>생생 야채모듬</p></a>
                                <p className='text-2xl text-gray-700'>10kg</p>
                            </div>
                            <div className='flex h-1/2 items-start text-4xl text-yellow-300'>
                                <BsStarFill/>
                                <BsStarFill/>
                                <BsStar/>
                                <BsStar/>
                                <BsStar/>
                            </div>
                        </div>
                        <div className='w-1/5 text-right text-xl text-gray-600'>
                            <p className='my-auto'>2023.07.23</p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className='text-2xl font-bold mb-2'>송수현짱짱123</p>
                        <p className='text-lg'>진짜 이건 아니지 않나요...? 아무리 유기농이라고는 해도 야채랑 과일에 모두 상처에 벌레 파먹은 흔적에... 다시는 구매 안합니다 다른 분들도 참고하셔서 여기서 구매하지마세요</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}