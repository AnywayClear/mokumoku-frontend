"use client";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MyPageBox(){

    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    return(
        <div className="border-y-4 border-black py-20">
            <div className="flex space-x-2 mb-4">
                <button className="bg-white text-green-500 rounded-full border-green-500 border-[3px] font-semibold px-3.5 py-0.5">결제전</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">출고전</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">배송중</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">배송완료</button>
            </div>

            <div className="flex space-x-2">
                <button className="bg-white text-green-500 rounded-full border-green-500 border-[3px] font-semibold px-3.5 py-0.5">하루전</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">한달전</button>
                <button className="bg-white text-neutral-400 rounded-full border-neutral-300 font-semibold border-2 px-3.5 py-0.5">일년전</button>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker  label="Small picker" slotProps={{ textField: { size: 'small' } }} defaultValue={dayjs('2022-04-17')} className="h-1"/>
                        <DatePicker
                        label="Small picker" slotProps={{ textField: { size: 'small' } }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>        
            </div>
        </div>
    );
}