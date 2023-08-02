import Image from "next/image";
import LogoImage from '../../../public/images/mokumokuLogo.svg';
import { BsBookmarkPlus } from "react-icons/bs";

export default function SellerBannerOther(){
    return(
        <div className="">
            <div className="bg-stone-200 h-700 w-full flex justify-center pt-16 pb-12 pr-10">
                <div className="pr-16">
                    <Image alt="MokuMoku" src={LogoImage} className="w-72 h-72 bg-white rounded-full"/>
                    <button className="bg-green-600 hover:bg-green-500 text-white rounded-md text-lg flex items-center px-[0.24rem] py-0.5 mx-auto mt-3">
                            <BsBookmarkPlus/>구독하기
                    </button>
                </div>
                <div className="text-left w-[29rem] mt-8">
                    <div className="flex items-end">
                        <p className="text-4xl font-bold">하니네팜</p>
                        <p className="text-2xl mx-1">님의 페이지</p>
                    </div>
                    <p className="text-xl mt-4 overflow-hidden h-[5rem]">환영합니다! 저희 스토어는 신선하고 다양한 채소를 판매합니다. 건강한 매일 신선함을 전해드립니다</p>
                    <p className="font-bold text-xl">전화번호</p>
                    <p className="text-2xl">010-1234-1234</p>
                    <p className="font-bold text-xl">사업자번호</p>
                    <p className="text-2xl">123-1234-1234</p>
                    <div className="flex pt-4">
                        <a href="#"><u className="text-xl text-stone-700 pr-4 hover:opacity-70">회원정보수정</u></a>
                        <a href="#"><u className="text-xl text-stone-700 hover:opacity-70">회원탈퇴</u></a>
                    </div>
                </div>
            </div>
        </div>
    );
}