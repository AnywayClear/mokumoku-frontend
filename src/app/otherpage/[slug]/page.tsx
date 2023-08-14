"use client"
import SellerAuctionList from "@/components/OtherPage/SellerAuctionList";
import SellerBannerOther from "@/components/OtherPage/SellerBannerOther";
import { userData } from "@/model/user";
import { getUserInfo } from "@/service/api/user";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

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