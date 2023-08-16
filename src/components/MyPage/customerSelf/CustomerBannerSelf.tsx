"use client"
import Image from "next/image";
import LogoImage from '../../../../public/images/mokumokuLogo.svg';
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { userData } from "@/model/user";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/service/api/user";
import { getPoint } from "@/service/api/point";
import { userPoint } from "@/model/point";



export default function CustomerBannerSelf(){
    
    const {user} = useContext(AuthContext);

    const { data: userData }: UseQueryResult<userData> = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserInfo(user?.userId ?? ""),
        enabled: !!user?.userId
    });

    const { data: userPoint }: UseQueryResult<userPoint> = useQuery({
        queryKey: ['userPoint'],
        queryFn: () => getPoint(user?.userId ?? ""),
        enabled: !!user?.userId
    });
    
    return(
        <>
            <div className="bg-stone-200 h-700 w-full flex justify-center pt-20 pb-12">
                <div className="text-center pr-20">
                    <h1 className="text-4xl font-bold pb-4">마이페이지</h1>
                    <Image alt="MokuMoku" src={userData?.image ?? LogoImage} width={1000} height={1000} className="w-72 h-72 bg-white rounded-full"/>
                </div>
                <div className="text-left pt-24 w-[25rem]">
                    <p className="text-5xl font-bold">{userData?.nickname ?? "닉네임이없어요"}</p>
                    <p className="pt-8 text-lg">포인트</p>
                    <div className="flex items-end">
                        <p className="text-5xl font-bold pr-6">{userPoint?.balance}</p>
                        <a href="#"><u className="text-xl text-stone-700 hover:opacity-70">충전하기</u></a>
                    </div>
                    <div className="flex pt-4">
                        <a href="#"><u className="text-xl text-stone-700 pr-4 hover:opacity-70">회원정보수정</u></a>
                        <a href="#"><u className="text-xl text-stone-700 hover:opacity-70">회원탈퇴</u></a>
                    </div>
                    
                </div>
            </div>
        </>
    );
}