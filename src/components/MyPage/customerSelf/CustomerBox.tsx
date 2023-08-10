import { useRecoilState } from "recoil";
import BoughtList from "./BoughtList";
import SubscribeList from "./SubscribeList";
import WishList from "./WishList";
import { tapState } from "@/store/mypage";

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

export default function CustomerBox(){

    const [status, setStatus] = useRecoilState<number>(tapState);

    return (
        <div className="border-neutral-500 mb-32">
            {boxItems.map((boxItem,index)=>(
                status===boxItem.number?boxItem.tag:null
            ))}
        </div>
    );
}