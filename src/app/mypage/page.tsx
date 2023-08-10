"use client"

import CustomerBannerSelf from "@/components/MyPage/customerSelf/CustomerBannerSelf";
import CustomerContent from "@/components/MyPage/customerSelf/CustomerContent";
import SellerBannerSelf from "@/components/MyPage/sellerSelf/SellerBannerSelf";
import SellerContent from "@/components/MyPage/sellerSelf/SellerContent";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { usePathname, useRouter } from 'next/navigation';

export default function MyPage(){

    const {user} = useContext(AuthContext);

    const pathname = usePathname();
    const router = useRouter();

    if(user?.role===0){
        return(
            <>
                <CustomerBannerSelf></CustomerBannerSelf>
                <CustomerContent></CustomerContent>
            </>
        );
    }else if(user?.role===1){
        return(
            <>
                <SellerBannerSelf></SellerBannerSelf>
                <SellerContent></SellerContent>
            </>
        );
    }else{
        router.push(`/login`);
    }
            
} 