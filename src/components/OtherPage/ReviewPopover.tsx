import React from 'react';
import Image from 'next/image';
import { BsStarFill, BsStar } from 'react-icons/bs';

type reviewType = {
    img: string,
    title: string,
    unit: string,
    nickname: string,
    content: string,
    date: string,
    rate: number
};

function getStar(num:number){
    const arr = [];
    for(let i=0; i<num;i++){
        arr.push(<BsStarFill/>);
    }
    for(let i=0; i<5-num;i++){
        arr.push(<BsStar/>);
    }
    return arr;
}

type Props = {
    id: number;
}

export default function ReviewPopover({id}:Props) {


    const review: reviewType=
        {
            img: "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title: "생생야채모듬",
            unit: "10kg",
            nickname: "송수현짱짱123",
            content: "진짜 이건 아니지 않나요...? 아무리 유기농이라고는 해도 야채랑 과일에 모두 상처에 벌레 파먹은 흔적에... 다시는 구매 안합니다 다른 분들도 참고하셔서 여기서 구매하지마세요",
            date:"2023.07.23",
            rate: 1
        }

    return (
        <div className='p-3 border-neutral-300 border rounded-lg w-[40rem]' >
            <div className="flex items-center mb-2">
                <p className='text-xl font-bold mr-2'>{review.nickname}</p>
                <div className='flex items-start text-xl text-yellow-300'>
                        { getStar(review.rate) }
                </div>
            </div>
            <p className='text-lg text-justify'>{review.content}</p>
        </div>
    );
}

