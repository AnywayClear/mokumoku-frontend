import Image from "next/image";
import LogoImage from '../../../../public/images/mokumokuLogo.svg';
import styles from './Scrollbar.module.css';

export default function SellerBannerSelf(){
    return(
        <>
            <div className="bg-stone-200 h-700 w-full flex justify-center pt-20 pb-12 pr-10">
                <div className="text-center pr-20">
                    <h1 className="text-4xl font-bold pb-4">마이페이지</h1>
                    <Image alt="MokuMoku" src={LogoImage} className="w-72 h-72 bg-white rounded-full"/>
                </div>
                <div className="text-left pt-16 w-96">
                    <p className="text-5xl font-bold">하니네팜</p>
                    <p className="text-2xl mt-4 overflow-hidden h-24 w-96">환영합니다! 저희 스토어는 신선하고 다양한 채소를 판매합니다. 건강한 매일 신선함을 전해드립니다</p>
                    <p className="text-xl mt-4">사업자번호</p>
                    <p className="text-3xl font-bold">123-1234-1234</p>
                    <div className="flex pt-4">
                        <a href="#"><u className="text-xl text-stone-700 pr-4 hover:opacity-70">회원정보수정</u></a>
                        <a href="#"><u className="text-xl text-stone-700 hover:opacity-70">회원탈퇴</u></a>
                    </div>
                    
                </div>
            </div>
        </>
    );
}