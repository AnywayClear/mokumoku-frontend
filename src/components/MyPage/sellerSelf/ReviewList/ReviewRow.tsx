import React from 'react';
import Image from 'next/image';
import { BsStar, BsStarFill } from 'react-icons/bs';

type reviewType={
    img: string,
    title: string,
    unit: string,
    nickname: string,
    content: string,
    date: string,
    rate: number
}

type Props = {
    review : reviewType,
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

export default function ReviewRow({review}:Props) {
  return (
    <>
        <tr className='border-y-2 border-neutral-300 border-collapse'>
            <div className='flex justify-between h-fit items-top my-6' >
                <Image className='h-40 w-60 object-cover' src={review.img} alt="이미지입니다." width={250} height={120}/>
                <div className='ml-7'>
                    <div className='flex justify-between'>
                        <div className='w-full'>
                            <div className='flex items-end'>
                                <a href="#"><p className='font-bold text-2xl mr-2 underline underline-offset-4 hover:opacity-70'>{review.title}</p></a>
                                <p className='text-lg text-gray-600 mr-2'>{review.unit}</p>
                            </div>
                        </div>
                        <div className='w-1/5 text-right text-lg text-gray-600'>
                                <p className='my-auto'>{review.date}</p>
                            </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center mb-2">
                            <p className='text-xl font-bold mr-2'>{review.nickname}</p>
                            <div className='flex items-start text-xl text-yellow-300'>
                                    { getStar(review.rate) }
                            </div>
                        </div>
                        <p className='text-lg text-justify'>{review.content}</p>
                    </div>
                </div>
            </div>
            
        </tr>
    </>
  )
}
