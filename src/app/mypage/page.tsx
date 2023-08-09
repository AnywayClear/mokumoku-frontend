"use client"

import CustomerBannerSelf from "@/components/MyPage/customerSelf/CustomerBannerSelf";
import CustomerContent from "@/components/MyPage/customerSelf/CustomerContent";
import SellerBannerSelf from "@/components/MyPage/sellerSelf/SellerBannerSelf";
import SellerContent from "@/components/MyPage/sellerSelf/SellerContent";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function MyPage(){

    const {user} = useContext(AuthContext);

    return(
        <>
            {user?.role===0?
                (<><CustomerBannerSelf></CustomerBannerSelf>
                <CustomerContent></CustomerContent></>)
                :(
                <><SellerBannerSelf></SellerBannerSelf>
                <SellerContent></SellerContent></>
                )
            }
        </>
    );
}