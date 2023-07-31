import { Props } from "next/script";
import BoughtList from "./customerSelf/MyPageBoughtList";
import SubscribeList from "./customerSelf/MyPageSubscribeList";
import WishList from "./customerSelf/MyPageWishList";

const boxItems = [
    {
        tag : <BoughtList/>,
        number : 0
    },
    {
        tag : <WishList/>,
        number : 1
    },
    {
        tag : <SubscribeList/>,
        number : 2
    },
];

type Props = {
    boxItemNum: number;
}

export default function MyPageBox({boxItemNum}:Props){

    

    return (
        <div className="border-y-4 border-neutral-500 my-4">
            {boxItems.map((boxItem,index)=>(
                boxItemNum===boxItem.number?boxItem.tag:null
            ))}
        </div>
    );
}