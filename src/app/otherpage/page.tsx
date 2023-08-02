import SellerBannerSelf from "@/components/MyPage/sellerSelf/SellerBannerSelf";
import SellerAuctionList from "@/components/OtherPage/SellerAuctionList";
import SellerBannerOther from "@/components/OtherPage/SellerBannerOther";

export default function OtherPage(){
    return(
        <>
            <SellerBannerOther/>
            <SellerAuctionList/>
        </>
    );
        

}