'use client';
import Image from 'next/image';
import { useState, MouseEvent } from 'react';
import styles from './Scrollbar.module.css';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent
} from '@mui/material';

type subscribeUserType = {
  img: string;
  name: string;
  selected: boolean;
};

type colType = { name: string; flex: string };

const cols: colType[] = [
  {
    name: '상품이미지',
    flex: 'w-3/12',
  },
  {
    name: '제목',
    flex: 'w-6/12',
  },
  {
    name: '단위',
    flex: 'w-1/12',
  },
  {
    name: '경매예정일',
    flex: 'w-2/12',
  },
  {
    name: '경매상태',
    flex: 'w-2/12',
  },
  {
    name: '시작금액',
    flex: 'w-1/12',
  },
];

type rowType = {
  id: number;
  img?: string;
  title: string;
  unit: string;
  price: number;
  date: string;
  state: string;
};

export default function SubscribeList() {
  const rows: rowType[] = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      title: '맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다',
      unit: '1kg',
      price: 13000,
      date: '2023-07-28',
      state: '경매완료',
    },
  ];

  const subscribeUsers: subscribeUserType[] = [
    {
      img: 'https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80',
      name: '모쿠모쿠',
      selected: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
    {
      img: 'https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
      name: '모쿠모쿠공식판매스토어eeee',
      selected: false,
    },
  ];

  const [orderState, setOrderState] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos(e.clientX);
    setScrollLeft(e.currentTarget.scrollLeft);
  };
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = e.clientX - startPos;
    e.currentTarget.scrollLeft = scrollLeft - delta;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setOrderState(event.target.value);
  };

  const orderStateArr : string[] = ["시간순","이름순","가격순"];


  return (
    <div>
      <div
        className={`${styles.scroll} flex items-center my-8 overflow-x-scroll place-items-center`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {subscribeUsers.map((subscribeUser, index) => (
          <div
            className={`${
              subscribeUser.selected ? '' : 'hover:opacity-80 opacity-30'
            } px-4 select-none`}
            key={index}
          >
            <Image
              src={subscribeUser.img}
              width={200}
              height={200}
              alt={'UserImg' + `${subscribeUser.name}`}
              className="h-48 w-48 object-cover rounded-full pointer-events-none"
            ></Image>
            <p className="truncate text-2xl w-48 font-bold text-cente my-4 text-center select-none">
              {subscribeUser.name}
            </p>
          </div>
        ))}
      </div>
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
      <table className="table-fixed border-collapse border-y-2 w-full text-center mt-6 my-20 border-neutral-300">
        <thead className="font-bold  text-xl">
          <tr className="border-y">
            {cols.map((col, index) => (
              <td key={index} className={`${col.flex}` + ' py-8'}>
                {col.name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index2) => (
            <tr key={index2} className="border-y text-lg">
              <td>
                {row.img !== undefined ? (
                  <Image
                    src={row.img}
                    alt="상품이미지"
                    width={300}
                    height={300}
                    className="h-32 w-80 object-cover"
                  />
                ) : null}
              </td>
              <td>
                <a href="#">
                  <p className="px-6 py-6 underline truncate hover:opacity-70">
                    {row.title}
                  </p>
                </a>
              </td>
              <td>
                <p>{row.unit}</p>
              </td>
              <td>
                <p>{row.date}</p>
              </td>
              <td>
                <p>{row.state}</p>
              </td>
              <td>
                <p>{row.price}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
