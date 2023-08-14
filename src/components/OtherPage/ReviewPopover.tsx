import React from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { getReview } from '@/service/api/review';
import { Review } from '@/model/review';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type reviewType = {
    img: string,
    title: string,
    unit: string,
    nickname: string,
    content: string,
    date: string,
    rate: number
};

function getStar(num: number | undefined) {
    if (!num) { 
        num = 0;
    }
    const arr = [];
    for(let i=0; i<num;i++){
        arr.push(<BsStarFill key={i}/>);
    }
    for(let i=0; i<5-num;i++){
        arr.push(<BsStar key={num+i}/>);
    }
    return arr;
}

type Props = {
    id: number;
}

export default function ReviewPopover({id}:Props) {

    const { data: review }: UseQueryResult<Review> = useQuery({
        queryKey: ['review'],
        queryFn: () => getReview(id),
    });

    return (
        <div className='p-3 border-neutral-300 border rounded-lg w-[40rem]' >
            <div className="flex items-center mb-2">
                <p className='text-xl font-bold mr-2'>{review?review.nickname:"닉네임이 없습니다."}</p>
                <div className='flex items-start text-xl text-yellow-300'>
                        { getStar(review?review.rate:5) }
                </div>
            </div>
            <p className='text-lg text-justify'>{review?review.comment:"내용이 비어있습니다."}</p>
        </div>
    );
}

