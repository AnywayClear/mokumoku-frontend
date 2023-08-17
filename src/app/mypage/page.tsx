"use client"

import CustomerBannerSelf from "@/components/MyPage/customerSelf/CustomerBannerSelf";
import CustomerContent from "@/components/MyPage/customerSelf/CustomerContent";
import SellerBannerSelf from "@/components/MyPage/sellerSelf/SellerBannerSelf";
import SellerContent from "@/components/MyPage/sellerSelf/SellerContent";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/service/api/user";
import {userData} from "@/model/user"
export default function MyPage(){

    const {user} = useContext(AuthContext);

    const pathname = usePathname();
    const router = useRouter();

    const { data: userData }: UseQueryResult<userData> = useQuery({
        queryKey: ['subscribeUsers'],
        queryFn: () => getUserInfo(user?.userId || ""),
    });



    if(userData?.role==="ROLE_CUSTOMER"){
        return(
            <>
                <CustomerBannerSelf></CustomerBannerSelf>
                <CustomerContent></CustomerContent>
            </>
        );
    }else if(userData?.role==="ROLE_SELLER"){
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