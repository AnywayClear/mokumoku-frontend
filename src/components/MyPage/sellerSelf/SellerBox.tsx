import AuctionList from "./AuctionList";
import AuctionChart from "./AuctionChart";
import ReviewList from "./ReviewList";
import { useRecoilState } from "recoil";
import { tapState } from "@/store/mypage";
const boxItems = [
    {
        tag : <AuctionList/>,
        number : 0
    },
    {
        tag : <AuctionChart/>,
        number : 1
    },
    {
        tag : <ReviewList/>,
        number : 2
    },

];

export default function SellerBox(){
    const [status] = useRecoilState<number>(tapState);
    return (
        <div className="my-4">
            {boxItems.map((boxItem)=>(
                status===boxItem.number?boxItem.tag:null
            ))}
        </div>
    );
}