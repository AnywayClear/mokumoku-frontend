"use client"

import Image from "next/image";
import LogoImage from '../../../public/images/mokumokuLogo.svg';
import { BsBookmarkPlus } from "react-icons/bs";
import { getUserInfo } from "@/service/api/user";
import { userData } from "@/model/user";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const titleClass = "font-bold text-xl mt-2";
const contentClass = "text-xl";

export default function SellerBannerOther(){


    const { data: userData }: UseQueryResult<userData> = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserInfo("553901c5-7121-497b-a44c-3f4fa898d6cc" ?? ""),
    });

    console.log(userData);

    return(
        <div className="">
            <div className="bg-stone-200 h-full w-full flex justify-center items-center pt-24 pb-12 pr-10 ">
                <div className="pr-16 pt-8">
                    <Image alt="MokuMoku" src={LogoImage} className="w-72 h-72 bg-white rounded-full"/>
                    <button className="bg-green-600 hover:bg-green-500  rounded-md flex items-center px-[0.4rem] py-1 mx-auto mt-3 text-white text-lg">
                            <BsBookmarkPlus/>
                            <p className="ml-1">구독하기</p>
                    </button>
                </div>
                <div className="text-left w-[29rem]">
                    <div className="flex items-end">
                        <p className="text-4xl font-bold">{userData?.nickname||"익명의 모쿠모쿠 판매자"}</p>
                        <p className="text-2xl mx-1">님의 페이지</p>
                    </div>
                    <p className="text-xl mt-4 h-auto max-h-[5rem] overflow-hidden text-ellipsis whitespace-pre-wrap">{userData?.description||"판매자 설명을 추가해주세요를레이히우리판매자"}</p>
                    <p className={titleClass}>전화번호</p>
                    <p className={contentClass}>{userData?.phoneNumber||"전화번호를 추가해주세요"}</p>
                    <p className={titleClass}>사업자번호</p>
                    <p className={contentClass}>{userData?.companyRegistrationNumber||"사업자 번호를 추가해주세요"}</p>
                    <p className={titleClass}>오프라인 매장 주소</p>
                    <p className={contentClass}>{userData?.companyAddress||"주소를 추가해주세요"}</p>
                    <div className="flex pt-4">
                        <a href="#"><u className="text-xl text-stone-700 pr-4 hover:opacity-70">회원정보수정</u></a>
                        <a href="#"><u className="text-xl text-stone-700 hover:opacity-70">회원탈퇴</u></a>
                    </div>
                </div>
            </div>
        </div>
    );
}