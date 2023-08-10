"use client";
import * as React from 'react';
import Image from 'next/image';
import { BsStar, BsStarFill } from 'react-icons/bs';
import SearchTab from '../searchTab';
import { jsx } from '@emotion/react';

type reviewType={
    img: string,
    title: string,
    unit: string,
    nickname: string,
    content: string,
    date: string,
    rate: number
}

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

export default function ReviewList(){
    
    const reviews: reviewType[]=[
        {
            img: "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title: "생생야채모듬",
            unit: "10kg",
            nickname: "송수현짱짱123",
            content: "진짜 이건 아니지 않나요...? 아무리 유기농이라고는 해도 야채랑 과일에 모두 상처에 벌레 파먹은 흔적에... 다시는 구매 안합니다 다른 분들도 참고하셔서 여기서 구매하지마세요",
            date:"2023.07.23",
            rate: 1
        },
        {
            img: "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title: "생생야채모듬",
            unit: "10kg",
            nickname: "송수현짱짱123",
            content: "잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다잘먹었습니다",
            date:"2023.07.23",
            rate: 5
        }
    ]

    return(
        <div className='mb-20'>
            <SearchTab tabType={2} />
            <table className=''>
                {
                    reviews.map((review, index)=>
                    <>
                        <tr className='border-y-2 border-neutral-300 border-collapse' key={index}>
                            <div className='flex justify-between h-fit items-center mt-6' >
                                <Image className='' src={review.img} alt="이미지입니다." width={250} height={120}/>
                                <div className='ml-7 w-full'>
                                    <div className='flex h-1/2 items-end pb-4'>
                                        <a href="#"><p className='font-bold text-3xl mr-4 underline underline-offset-4'>{review.title}</p></a>
                                        <p className='text-2xl text-gray-700'>{review.unit}</p>
                                    </div>
                                    <div className='flex h-1/2 items-start text-4xl text-yellow-300'>
                                        { getStar(review.rate) }
                                    </div>
                                </div>
                                <div className='w-1/5 text-right text-xl text-gray-600'>
                                    <p className='my-auto'>{review.date}</p>
                                </div>
                            </div>
                            <div className="mt-2 mb-6">
                                <p className='text-2xl font-bold mb-2'>{review.nickname}</p>
                                <p className='text-lg'>{review.content}</p>
                            </div>
                        </tr>
                    </>
                )
                }
            </table>
        </div>
    );
}