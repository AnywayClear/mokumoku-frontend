"use client"

import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { userData } from "@/model/user";
import { getUserInfo } from "@/service/api/user";


export default function SellerBannerSelf() {
    
    const {user} = useContext(AuthContext);
    const { data: userData }: UseQueryResult<userData> = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserInfo(user?.userId ?? ""),
        enabled: !!user?.userId
    });

    return(
        <>
            <div className="bg-stone-200 h-700 w-full flex justify-center pt-20 pb-12 pr-10">
                <div className="text-center pr-20">
                    <h1 className="text-4xl font-bold pb-4">마이페이지</h1>
                    <Image alt="MokuMoku" src={userData?.image || "https://images.unsplash.com/photo-1690149347325-13435f400dd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80" } width={1000} height={1000} className="w-72 h-72 bg-white rounded-full"/>
                </div>
                <div className="text-left pt-16 w-[27rem]">
                    <p className="text-5xl font-bold">{userData?.nickname}</p>
                    <p className="text-2xl mt-4 overflow-hidden">{userData?.description||`안녕하세요 모쿠모쿠의 판매자님, 판매자 소개글을 입력해주세요!`}</p>
                    <p className="text-xl mt-4">사업자번호</p>
                    <p className="text-3xl font-bold">{userData?.companyRegistrationNumber}</p>
                    <div className="flex pt-4">
                        <a href="#"><u className="text-xl text-stone-700 pr-4 hover:opacity-70">회원정보수정</u></a>
                        <a href="#"><u className="text-xl text-stone-700 hover:opacity-70">회원탈퇴</u></a>
                    </div>
                    
                </div>
            </div>
        </>
    );
}  