import Image from "next/image";
import LogoImage from '../../../public/images/mokumokuLogo.svg';

export default function BannerSelfConsumer(){
    return(
        <>
            <div className="bg-stone-200 h-700 w-full flex justify-center pt-20 pb-12 pr-10">
                <div className="text-center pr-20">
                    <h1 className="text-4xl font-bold pb-4">마이페이지</h1>
                    <Image alt="MokuMoku" src={LogoImage} className="w-72 h-72 bg-white rounded-full"/>
                </div>
                <div className="text-left pt-28 w-96">
                    <p className="text-5xl font-bold">송수현짱짱짱짱짱</p>
                    <p className="pt-8 text-lg">포인트</p>
                    <div className="flex items-end">
                        <p className="text-5xl font-bold pr-6">1000</p>
                        <a href="#"><u className="text-xl text-stone-700">충전하기</u></a>
                    </div>
                    <div className="flex pt-4">
                        <a href="#"><u className="text-xl text-stone-700 pr-4">회원정보수정</u></a>
                        <a href="#"><u className="text-xl text-stone-700">회원탈퇴</u></a>
                    </div>
                    
                </div>
            </div>
        </>
    );
}