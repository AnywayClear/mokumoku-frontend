"use client";
import * as React from 'react';
import Image from 'next/image';
import { BsStar, BsStarFill } from 'react-icons/bs';
import SearchTab from '../searchTab';


export default function ReviewList(){
    

    return(
        <div className='mb-16 pb-20'>
            <SearchTab tabType={2} />
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