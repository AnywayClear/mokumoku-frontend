import BannerSelfConsumer from "@/components/MyPage/customerSelf/CustomerBannerSelf";
import MyPageContent from "@/components/MyPage/MyPageContent";

export default function MyPage(){
    return(
        <>
            <BannerSelfConsumer></BannerSelfConsumer>
            <MyPageContent></MyPageContent>
        </>
    );
}