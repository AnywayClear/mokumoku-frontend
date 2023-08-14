"use client"
import SellerBannerSelf from "@/components/MyPage/sellerSelf/SellerBannerSelf";
import SellerAuctionList from "@/components/OtherPage/SellerAuctionList";
import SellerBannerOther from "@/components/OtherPage/SellerBannerOther";
import { Produce } from "@/model/produce";
import { userData } from "@/model/user";
import { getUserInfo } from "@/service/api/user";
import { searchState } from "@/store/mypage";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useResetRecoilState } from "recoil";

type Props = {
    params: {
     slug: string;
    };
}

export default function OtherPage({params:{slug}}: Props) {

    const { data: sellerInfo }: UseQueryResult<userData> = useQuery({
        queryKey: ['sellerInfo', slug],
        queryFn: () => getUserInfo(slug),
    });
    
    return(
        <>
            <SellerBannerOther sellerInfo={sellerInfo} />
            <SellerAuctionList slug={slug} />
        </>
    );
        

}