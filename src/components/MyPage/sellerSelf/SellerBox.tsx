import AuctionList from "./AuctionList";
import AuctionChart from "./AuctionChart";
import ReviewList from "./ReviewList";
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

export default function SellerBox({boxItemNum}:Props){

    return (
        <div className="border-y-4 border-neutral-500 my-4">
            {boxItems.map((boxItem,index)=>(
                boxItemNum===boxItem.number?boxItem.tag:null
            ))}
        </div>
    );
}