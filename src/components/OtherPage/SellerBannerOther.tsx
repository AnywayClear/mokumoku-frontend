"use client"

import Image from "next/image";
import { BsBookmarkPlus } from "react-icons/bs";
import { userData } from "@/model/user";
import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { cancelSubscribe, doSubscribe, hasSubscribed } from "@/service/api/subscribe";

const titleClass = "font-bold text-xl mt-2";
const contentClass = "text-xl";

type Props={
    sellerInfo: userData | undefined;
    slug: string;
}
type isSUbscribed={
    sub:boolean
}

export default function SellerBannerOther({ sellerInfo, slug }: Props) {

    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    
    const { data: isSubscribed }: UseQueryResult<isSUbscribed> = useQuery({
        queryKey: ['isSubscribed'],
        queryFn: () => hasSubscribed(slug),
    });

    const subscribe = useMutation(() => doSubscribe(slug||""), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['isSubscribed'] });
        },
    });

    const cancelsubscribe = useMutation(() => cancelSubscribe(slug||""), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['isSubscribed'] });
        },
    });

    return(
        <div className="">
            <div className="bg-stone-200 h-full w-full flex justify-center items-center pt-24 pb-12 pr-10 ">
                <div className="pr-16 pt-8">
                    <Image alt="MokuMoku" src={sellerInfo?.image ? sellerInfo?.image : "https://images.unsplash.com/photo-1690149347325-13435f400dd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"} className="w-72 h-72 bg-white rounded-full" width={1000} height={1000}/>
                    
                    {user?.role == 0 ?
                        (!isSubscribed?.sub ?
                            <button className="bg-green-600 hover:bg-green-800  rounded-md flex items-center px-[0.4rem] py-1 mx-auto mt-3 text-white text-lg " onClick={() => subscribe.mutate()}>
                                <BsBookmarkPlus />
                                <p className="ml-1" >구독하기</p>
                            </button> :
                            <button className="bg-black hover:bg-neutral-800  rounded-md flex items-center px-[0.4rem] py-1 mx-auto mt-3 text-white text-lg " onClick={() => cancelsubscribe.mutate()}>
                                <BsBookmarkPlus />
                                <p className="ml-1" >구독취소</p>
                            </button>)
                        :<div className="h-10"></div>}
                        
                </div>
                <div className="text-left w-[29rem]">
                    <div className="flex items-end">
                        <p className="text-4xl font-bold">{sellerInfo?.nickname||"익명의 모쿠모쿠 판매자"}</p>
                        <p className="text-2xl mx-1">님의 페이지</p>
                    </div>
                    <p className="text-xl mt-4 h-auto max-h-[5rem] overflow-hidden text-ellipsis whitespace-pre-wrap">{sellerInfo?.description||""}</p>
                    <p className={titleClass}>전화번호</p>
                    <p className={contentClass}>{sellerInfo?.phoneNumber||"전화번호를 추가해주세요"}</p>
                    <p className={titleClass}>사업자번호</p>
                    <p className={contentClass}>{sellerInfo?.companyRegistrationNumber||"사업자 번호를 추가해주세요"}</p>
                    <p className={titleClass}>오프라인 매장 주소</p>
                    <p className={contentClass}>{sellerInfo?.companyAddress||"주소를 추가해주세요"}</p>
                    <div className="flex pt-4">
                        <a href="#"><u className="text-xl text-stone-700 pr-4 hover:opacity-70">회원정보수정</u></a>
                        <a href="#"><u className="text-xl text-stone-700 hover:opacity-70">회원탈퇴</u></a>
                    </div>
                </div>
            </div>
        </div>
    );
}