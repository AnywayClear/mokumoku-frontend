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

type Props = {
    boxItemNum: number;
}

export default function SellerBox(){
    const [status, setStatus] = useRecoilState<number>(tapState);
    return (
        <div className="my-4">
            {boxItems.map((boxItem,index)=>(
                status===boxItem.number?boxItem.tag:null
            ))}
        </div>
    );
}