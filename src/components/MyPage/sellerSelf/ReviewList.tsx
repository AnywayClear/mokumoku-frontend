"use client";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Image from 'next/image';
import { BsStar, BsStarFill } from 'react-icons/bs';


export default function ReviewList(){
    
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    
    return(
        <div className='mb-16 pt-16 pb-20'>
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
                        label="구매자 검색"
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
            <div className='py-8'>
                <div className='border-t-2 border-stone-300 px-5 py-6'>
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